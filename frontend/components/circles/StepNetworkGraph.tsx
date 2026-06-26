'use client'

import { useEffect, useRef } from 'react'

// Fixed node positions as [x, y] fractions of canvas [W, H]
const NODE_POS: [number, number][] = [
  [0.38, 0.35],   // step 1
  [0.72, 0.22],   // step 2
  [0.20, 0.58],   // step 3
  [0.68, 0.60],   // step 4
  [0.44, 0.76],   // step 5
  [0.16, 0.24],   // step 6
]

// Edges between node indices — only visible when both endpoints are present
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 4], [0, 5], [5, 2], [1, 5],
]

const PALETTE = ['#C44536', '#197278', '#772e25', '#283D3B', '#C44536', '#197278']
const NODE_R = 26

interface Props {
  nodeCount: number  // 0–6
  className?: string
}

export default function StepNetworkGraph({ nodeCount, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const countRef = useRef(nodeCount)

  useEffect(() => { countRef.current = nodeCount }, [nodeCount])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let W = 0, H = 0
    let t = 0

    // Per-node animated scale (0 → 1) and float phase
    const scales = new Array(6).fill(0)
    const phases = NODE_POS.map(() => Math.random() * Math.PI * 2)

    function init() {
      const dpr = window.devicePixelRatio || 1
      W = canvas!.offsetWidth
      H = canvas!.offsetHeight
      canvas!.width = W * dpr
      canvas!.height = H * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw() {
      t += 0.007
      ctx!.clearRect(0, 0, W, H)

      const count = countRef.current

      // Ease each node scale toward its target
      for (let i = 0; i < 6; i++) {
        const target = i < count ? 1 : 0
        scales[i] += (target - scales[i]) * 0.055
      }

      // Floating node positions
      const pos = NODE_POS.map(([px, py], i) => ({
        x: px * W + Math.sin(t + phases[i]) * 11,
        y: py * H + Math.cos(t * 0.65 + phases[i]) * 8,
        s: scales[i],
        color: PALETTE[i],
      }))

      // Draw edges — alpha proportional to how visible both endpoints are
      EDGES.forEach(([a, b]) => {
        const pa = pos[a], pb = pos[b]
        const alpha = Math.min(pa.s, pb.s) * 0.28
        if (alpha < 0.01) return
        ctx!.beginPath()
        ctx!.moveTo(pa.x, pa.y)
        ctx!.lineTo(pb.x, pb.y)
        ctx!.strokeStyle = `rgba(196,69,54,${alpha.toFixed(2)})`
        ctx!.lineWidth = 1.2
        ctx!.stroke()
      })

      // Draw nodes
      pos.forEach((p, i) => {
        if (p.s < 0.01) return
        const r = NODE_R * p.s

        // Soft glow halo
        const g = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.5)
        g.addColorStop(0, p.color + '22')
        g.addColorStop(1, 'transparent')
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2)
        ctx!.fillStyle = g
        ctx!.fill()

        // Outlined circle
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx!.strokeStyle = p.color
        ctx!.lineWidth = 1.5
        ctx!.stroke()

        // Step number — fades in after node is mostly visible
        const labelAlpha = Math.max(0, (p.s - 0.45) / 0.55)
        if (labelAlpha > 0.01) {
          ctx!.globalAlpha = labelAlpha
          ctx!.fillStyle = p.color
          ctx!.font = `700 ${Math.round(11 * p.s)}px Inter, system-ui, sans-serif`
          ctx!.textAlign = 'center'
          ctx!.textBaseline = 'middle'
          ctx!.fillText(String(i + 1), p.x, p.y)
          ctx!.globalAlpha = 1
        }
      })

      raf = requestAnimationFrame(draw)
    }

    init()
    draw()

    const onResize = () => { cancelAnimationFrame(raf); init(); draw() }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return <canvas ref={canvasRef} className={className} />
}
