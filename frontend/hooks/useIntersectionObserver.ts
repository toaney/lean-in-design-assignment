import { useEffect, type RefObject } from 'react'

interface Options {
  threshold?: number
  rootMargin?: string
  root?: Element | null
}

export function useIntersectionObserver(
  ref: RefObject<Element | null>,
  onIntersect: () => void,
  { threshold = 0.1, rootMargin = '0px', root = null }: Options = {}
) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onIntersect()
      },
      { threshold, rootMargin, root }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, onIntersect, threshold, rootMargin, root])
}
