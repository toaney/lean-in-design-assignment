'use client'

import { useEffect, useRef } from 'react'

const NAMES = [
  'Lean In Moms', 'Working Moms', 'Lean In Greece', 'Lean In Miami',
  'Lean In Latinas', 'Women in Law', 'Women in HR', 'Lean In Energy',
  'Next Chapter', 'Lean In Mumbai', 'Women in Media', 'Lean In Korea',
  'WIM Lean In', 'Concentrix', 'Women in Fashion', 'Lean In Global',
]

const PALETTE = ['#C44536', '#197278', '#772e25', '#283D3B']
const FONT = '600 8.5px Inter, system-ui, sans-serif'
const PADDING = 14  // px of breathing room from text edge to circle edge

interface Node {
  x: number; y: number
  vx: number; vy: number
  r: number
  label: string
  lines: string[]
  color: string
}

// Split a label into at most 2 lines, balanced by visual width
function splitLines(ctx: CanvasRenderingContext2D, label: string): string[] {
  const words = label.split(' ')
  if (words.length === 1) return [label]

  let best: [string, string] = [label, '']
  let bestDiff = Infinity

  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(' ')
    const b = words.slice(i).join(' ')
    const diff = Math.abs(ctx.measureText(a).width - ctx.measureText(b).width)
    if (diff < bestDiff) {
      bestDiff = diff
      best = [a, b]
    }
  }

  return best[1] ? [best[0], best[1]] : [best[0]]
}

export default function NetworkGraph({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let nodes: Node[] = []
    let edges: [number, number][] = []
    let raf: number
    let W = 0, H = 0

    function init(w: number, h: number) {
      const dpr = window.devicePixelRatio || 1
      W = w
      H = h
      canvas!.width = W * dpr
      canvas!.height = H * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.font = FONT

      nodes = NAMES.map((label, i) => {
        const lines = splitLines(ctx!, label)
        const maxLineW = Math.max(...lines.map(l => ctx!.measureText(l).width))
        const r = maxLineW / 2 + PADDING

        return {
          x: r + 10 + Math.random() * Math.max(0, W - 2 * r - 20),
          y: r + 10 + Math.random() * Math.max(0, H - 2 * r - 20),
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r,
          label,
          lines,
          color: PALETTE[i % PALETTE.length],
        }
      })

      // Shuffle indices and build a spanning chain so every node has at least one connection
      const order = nodes.map((_, i) => i).sort(() => Math.random() - 0.5)
      edges = order.map((n, i) => [n, order[(i + 1) % order.length]] as [number, number])

      // Add 1–2 extra random edges per node for a denser, less linear look
      nodes.forEach((_, i) => {
        const extra = 1 + Math.floor(Math.random() * 2)
        for (let k = 0; k < extra; k++) {
          const j = Math.floor(Math.random() * nodes.length)
          if (j !== i) edges.push([i, j])
        }
      })
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H)

      edges.forEach(([i, j]) => {
        const a = nodes[i], b = nodes[j]
        const dist = Math.hypot(b.x - a.x, b.y - a.y)
        const alpha = Math.max(0, (1 - dist / 420)) * 0.45
        if (alpha <= 0) return
        ctx!.beginPath()
        ctx!.moveTo(a.x, a.y)
        ctx!.lineTo(b.x, b.y)
        ctx!.strokeStyle = `rgba(196,69,54,${alpha.toFixed(2)})`
        ctx!.lineWidth = 1
        ctx!.stroke()
      })

      nodes.forEach(n => {
        const g = ctx!.createRadialGradient(n.x, n.y, n.r * 0.5, n.x, n.y, n.r * 2)
        g.addColorStop(0, n.color + '18')
        g.addColorStop(1, 'transparent')
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, n.r * 2, 0, Math.PI * 2)
        ctx!.fillStyle = g
        ctx!.fill()

        ctx!.beginPath()
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx!.strokeStyle = n.color
        ctx!.lineWidth = 1.5
        ctx!.stroke()

        ctx!.fillStyle = n.color
        ctx!.font = FONT
        ctx!.textAlign = 'center'
        ctx!.textBaseline = 'middle'
        const lineH = 10
        const offsetY = n.lines.length === 1 ? 0 : -lineH / 2
        n.lines.forEach((line, li) => {
          ctx!.fillText(line, n.x, n.y + offsetY + li * lineH)
        })

        n.x += n.vx
        n.y += n.vy
        if (n.x < n.r) { n.x = n.r; n.vx = Math.abs(n.vx) }
        if (n.x > W - n.r) { n.x = W - n.r; n.vx = -Math.abs(n.vx) }
        if (n.y < n.r) { n.y = n.r; n.vy = Math.abs(n.vy) }
        if (n.y > H - n.r) { n.y = H - n.r; n.vy = -Math.abs(n.vy) }
      })

      raf = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      if (width === 0 || height === 0) return
      cancelAnimationFrame(raf)
      init(width, height)
      draw()
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className={className} />
}
