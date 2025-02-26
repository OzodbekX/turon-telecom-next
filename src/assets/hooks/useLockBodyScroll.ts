'use client'
import { useEffect } from 'react'

// =================================================================

type UseLockBodyScrollConfig = {
  isLocked?: boolean
}

// =================================================================

export const useLockBodyScroll = (config: UseLockBodyScrollConfig = {}) => {
  const { isLocked = false } = config

  useEffect(() => {
    if (isLocked) {
      const { overflow: initialOverflow, paddingRight: initialPaddingRight } =
        window.getComputedStyle(document.body)

      const header = document.querySelector('header') as HTMLHeadElement

      const scrollbarWidth = window.innerWidth - document.body.clientWidth

      document.body.style.overflow = 'hidden'

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = scrollbarWidth + 'px'
        header.style.paddingRight = scrollbarWidth + 'px'
      }

      return () => {
        document.body.style.overflow = initialOverflow
        if (scrollbarWidth > 0) {
          document.body.style.paddingRight = initialPaddingRight
          header.style.paddingRight = '0px'
        }
      }
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isLocked])
}
