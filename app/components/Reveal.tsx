"use client"
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  /** Delay in ms before revealing */
  delay?: number
  as?: 'div' | 'section' | 'li' | 'span' | 'article'
}

/**
 * Scroll-reveal wrapper. One IntersectionObserver per instance, disconnected
 * after firing. Content is visible without JS, and reduced-motion skips the
 * transform entirely.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay) window.setTimeout(() => setVisible(true), delay)
            else setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [delay])

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}
