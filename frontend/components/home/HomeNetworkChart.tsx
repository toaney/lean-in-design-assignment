'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

type NodeDatum = d3.SimulationNodeDatum & {
  id: string
  group: string
  size: number
  label: string
}

type LinkDatum = {
  source: string
  target: string
}

const NODE_DATA: Omit<NodeDatum, 'index'>[] = [
  { id: 'Core',      group: 'core',           size: 52, label: 'Lean In' },

  // Americas
  { id: 'Americas',  group: 'red-cluster',    size: 34, label: 'Americas' },
  { id: 'Miami',     group: 'leaf',           size: 20, label: 'Miami' },
  { id: 'Latinas',   group: 'leaf',           size: 20, label: 'Latinas' },
  { id: 'Bolivia',   group: 'leaf',           size: 20, label: 'Bolivia' },
  { id: 'Moms',      group: 'leaf',           size: 20, label: 'Moms' },

  // Europe
  { id: 'Europe',    group: 'purple-cluster', size: 38, label: 'Europe' },
  { id: 'Greece',    group: 'leaf-large',     size: 26, label: 'Greece' },
  { id: 'Swiss',     group: 'leaf',           size: 20, label: 'Swiss' },
  { id: 'Chapter',   group: 'leaf',           size: 20, label: 'Chapter' },

  // Asia / Africa
  { id: 'AsiaPac',   group: 'orange-cluster', size: 34, label: 'Asia Pac' },
  { id: 'Mumbai',    group: 'leaf',           size: 20, label: 'Mumbai' },
  { id: 'Africa',    group: 'leaf',           size: 20, label: 'Africa' },

  // Corporate
  { id: 'Corporate', group: 'blue-cluster',   size: 34, label: 'Corporate' },
  { id: 'Concentrix',group: 'leaf-large',     size: 24, label: 'Concentrix' },
  { id: 'Energy',    group: 'leaf',           size: 20, label: 'Energy' },

  // Community
  { id: 'Community', group: 'green-cluster',  size: 30, label: 'Community' },
  { id: 'Whale',     group: 'leaf',           size: 20, label: 'Whale' },
  { id: 'Global',    group: 'leaf',           size: 20, label: 'Global' },
]

const LINKS: LinkDatum[] = [
  { source: 'Core', target: 'Americas' },
  { source: 'Core', target: 'Europe' },
  { source: 'Core', target: 'AsiaPac' },
  { source: 'Core', target: 'Corporate' },
  { source: 'Core', target: 'Community' },

  { source: 'Americas', target: 'Miami' },
  { source: 'Americas', target: 'Latinas' },
  { source: 'Americas', target: 'Bolivia' },
  { source: 'Americas', target: 'Moms' },

  { source: 'Europe', target: 'Greece' },
  { source: 'Europe', target: 'Swiss' },
  { source: 'Europe', target: 'Chapter' },

  { source: 'AsiaPac', target: 'Mumbai' },
  { source: 'AsiaPac', target: 'Africa' },

  { source: 'Corporate', target: 'Concentrix' },
  { source: 'Corporate', target: 'Energy' },

  { source: 'Community', target: 'Whale' },
  { source: 'Community', target: 'Global' },
]

const getColor = (group: string) => {
  switch (group) {
    case 'core':           return '#C44536'
    case 'red-cluster':    return '#C44536'
    case 'purple-cluster': return '#772e25'
    case 'orange-cluster': return '#197278'
    case 'blue-cluster':   return '#283D3B'
    case 'green-cluster':  return '#197278'
    case 'leaf-large':     return '#C44536'
    default:               return '#197278'
  }
}

interface Props {
  className?: string
}

export default function HomeNetworkChart({ className }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const width = 900
    const height = 880

    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('preserveAspectRatio', 'xMidYMid slice')

    const nodes = NODE_DATA.map(d => ({ ...d })) as NodeDatum[]
    const links = LINKS.map(d => ({ ...d })) as any[]

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3.forceLink(links)
          .id((d: any) => d.id)
          .distance((d: any) =>
            d.source.id === 'Core' ? 170 : 72,
          ),
      )
      .force('charge', d3.forceManyBody().strength(-280))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('y', d3.forceY(height / 2).strength(0.03))
      .force('collide', d3.forceCollide().radius((d: any) => d.size + 16))

    const link = svg
      .append('g')
      .attr('stroke', '#C4453630')
      .attr('stroke-width', 1.5)
      .selectAll('line')
      .data(links)
      .join('line')

    const node = svg
      .append('g')
      .selectAll<SVGGElement, NodeDatum>('.node')
      .data(nodes)
      .join('g')
      .attr('class', 'node')
      .call(
        d3
          .drag<SVGGElement, NodeDatum>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart()
            d.fx = d.x
            d.fy = d.y
          })
          .on('drag', (event, d) => {
            d.fx = event.x
            d.fy = event.y
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0)
            d.fx = null
            d.fy = null
          }),
      )

    // Outer accent ring for hub nodes
    node
      .filter(d => d.group !== 'leaf' && d.group !== 'leaf-large')
      .append('circle')
      .attr('r', d => d.size + 6)
      .attr('fill', 'none')
      .attr('stroke', d => getColor(d.group))
      .attr('stroke-width', 1.5)
      .attr('opacity', 0.35)

    // Primary filled circle
    node
      .append('circle')
      .attr('r', d => d.size)
      .attr('fill', d => getColor(d.group))
      .attr('fill-opacity', 0.88)

    // Text labels
    node
      .append('text')
      .text(d => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .style('fill', '#ffffff')
      .style('font-family', 'Inter, system-ui, sans-serif')
      .style('font-size', d => (d.size > 30 ? '10px' : '7.5px'))
      .style('font-weight', '600')
      .style('pointer-events', 'none')

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)
      node.attr('transform', d => `translate(${d.x},${d.y})`)
    })

    return () => { simulation.stop() }
  }, [])

  return <svg ref={svgRef} className={className} />
}
