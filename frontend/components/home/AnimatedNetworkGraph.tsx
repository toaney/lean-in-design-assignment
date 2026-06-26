'use client'

import { motion } from 'framer-motion'
import HomeNetworkChart from './HomeNetworkChart'

interface Props {
  className?: string
}

export default function AnimatedNetworkGraph({ className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <HomeNetworkChart className="h-full w-full" />
    </motion.div>
  )
}
