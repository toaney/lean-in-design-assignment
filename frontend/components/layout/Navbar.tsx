'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

const LIVE = 'https://leanin.org'

const NAV_LINKS = [
  { label: 'Circles', href: '/circles', internal: true },
  { label: 'Articles', href: '/articles', internal: true },
  { label: 'Research', href: `${LIVE}/report/`, internal: false },
  { label: 'About', href: `${LIVE}/about/`, internal: false },
  { label: 'For Companies', href: `${LIVE}/partner/`, internal: false },
  { label: 'For Girls', href: `${LIVE}/girls/`, internal: false },
]

export default function Navbar() {
  const { isLoggedIn, toggleAuth } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        menuBtnRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [menuOpen])

  return (
    <header
      role="banner"
      className={`sticky top-0 z-50 bg-secondary transition-shadow duration-200 ${
        scrolled ? 'shadow-lg' : ''
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8"
      >
        {/* Wordmark */}
        <Link
          href="/"
          aria-label="Lean In — Home"
          className="shrink-0 focus-visible:outline-white"
        >
          <svg
            viewBox="0 0 96 28"
            aria-hidden="true"
            className="h-7 w-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              y="22"
              fontFamily="var(--font-fraunces), Georgia, serif"
              fontSize="26"
              fontWeight="700"
              fill="white"
              letterSpacing="-0.5"
            >
              lean in
            </text>
          </svg>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-6 md:flex" role="list">
          {NAV_LINKS.map(({ label, href, internal }) => (
            <li key={label}>
              {internal ? (
                <Link
                  href={href}
                  className="relative text-sm font-light text-white/90 transition-colors duration-150 hover:text-white
                    after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary
                    after:transition-[width] after:duration-200 hover:after:w-full"
                >
                  {label}
                </Link>
              ) : (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-sm font-light text-white/90 transition-colors duration-150 hover:text-white
                    after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-primary
                    after:transition-[width] after:duration-200 hover:after:w-full"
                >
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Auth CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleAuth}
            aria-label={isLoggedIn ? 'Sign out of your account' : 'Join Lean In'}
            className="rounded px-4 py-1.5 text-sm font-semibold text-white transition-colors duration-150
              bg-primary hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-white"
          >
            {isLoggedIn ? 'Sign Out' : 'Join Us'}
          </button>

          {/* Hamburger — mobile only */}
          <button
            ref={menuBtnRef}
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen(o => !o)}
            className="flex md:hidden flex-col justify-center gap-[5px] p-1 text-white focus-visible:outline-white"
          >
            <span
              className={`block h-0.5 w-5 bg-white transition-transform duration-200 origin-center ${
                menuOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-white transition-opacity duration-200 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-white transition-transform duration-200 origin-center ${
                menuOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        ref={menuRef}
        aria-hidden={!menuOpen}
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <ul
          className="flex flex-col border-t border-white/10 px-4 pb-4 pt-2"
          role="list"
        >
          {NAV_LINKS.map(({ label, href, internal }) => (
            <li key={label}>
              {internal ? (
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-base text-white/90 hover:text-white border-b border-white/10"
                >
                  {label}
                </Link>
              ) : (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 text-base text-white/90 hover:text-white border-b border-white/10"
                >
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
