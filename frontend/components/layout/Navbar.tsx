'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
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

function LeanInLogo() {
  return (
    <svg
      fill="none"
      viewBox="0 -28 402 108"
      aria-hidden="true"
      className="h-auto w-[120px] text-white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.617 42.628H37.95v10.56H0V.377h11.617zm90.007-31.91H73.329v10.71h24.902v10.337H73.33v11.09h28.672v10.333H61.789V.377h39.835zm77.253 42.47h-12.144l-4.828-11.845h-22.331l-4.828 11.844h-11.845L145.532 0h10.709zm58.696-20.293V.377h11.473v52.81h-9.883L213.585 19.62v33.567h-11.469V.377h10.709zm88.953 20.292h-11.612V.377h11.612zm63.896-20.291V.377h11.468v52.81h-9.877L366.438 19.62v33.567h-11.467V.377h10.704zM143.72 31.088h14.034l-7.017-17.126z"
        fill="currentColor"
      />
      <path d="M401.89 76.422h-86.976V80h86.976z" fill="#b21f24" />
    </svg>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8.5" cy="8.5" r="5.5" />
      <line x1="13" y1="13" x2="18" y2="18" />
    </svg>
  )
}

export default function Navbar() {
  const { isLoggedIn, toggleAuth } = useAuth()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close mobile menu on Escape */
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

  /* Close search on Escape */
  useEffect(() => {
    if (!searchOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [searchOpen])

  /* Close mobile menu on outside click */
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

  const openSearch = useCallback(() => {
    setSearchOpen(true)
    setTimeout(() => searchInputRef.current?.focus(), 80)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = searchInputRef.current?.value.trim()
    if (q) {
      window.open(`${LIVE}/search/?q=${encodeURIComponent(q)}`, '_blank', 'noopener')
    }
    setSearchOpen(false)
  }

  const navLinkClass = (href: string, internal: boolean) => {
    const isActive = internal && (pathname === href || pathname.startsWith(href + '/'))
    return isActive
      ? 'text-sm font-semibold text-white underline decoration-1 decoration-primary underline-offset-[4px]'
      : 'text-sm font-normal text-white/80 transition-colors duration-150 hover:text-white'
  }

  return (
    <header
      role="banner"
      className={`relative sticky top-0 z-50 bg-secondary transition-shadow duration-200 ${
        scrolled ? 'shadow-lg' : ''
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8"
      >
        {/* ── Wordmark ── */}
        <Link
          href="/"
          aria-label="Lean In — Home"
          className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <LeanInLogo />
        </Link>

        {/* ── Desktop nav links ── */}
        <ul className="hidden items-end gap-5 md:flex" role="list">
          {NAV_LINKS.map(({ label, href, internal }) => (
            <li key={label}>
              {internal ? (
                <Link href={href} className={navLinkClass(href, internal)}>
                  {label}
                </Link>
              ) : (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={navLinkClass(href, internal)}
                >
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* ── Right cluster: search icon + auth + hamburger ── */}
        <div className="flex items-center gap-2">
          {/* Search icon — triggers full-width overlay */}
          <button
            onClick={openSearch}
            aria-label="Open search"
            aria-expanded={searchOpen}
            className="flex h-8 w-8 items-center justify-center text-white/80
              transition-colors hover:text-white
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <SearchIcon className="h-4 w-4" />
          </button>

          {/* Join Us / Sign Out */}
          <button
            onClick={toggleAuth}
            aria-label={isLoggedIn ? 'Sign out of your account' : 'Join Lean In'}
            className="hidden rounded-full border border-white/70 px-4 py-1.5 text-sm
              font-semibold text-white transition-colors duration-150
              hover:bg-white hover:text-secondary
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
              md:inline-flex items-center"
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
            className="flex flex-col justify-center gap-[5px] p-1 text-white
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
              md:hidden"
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

      {/* ── Full-width search overlay ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            key="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 z-20 flex items-center bg-secondary px-4 md:px-8"
          >
            <form
              onSubmit={handleSearchSubmit}
              role="search"
              aria-label="Site search"
              className="mx-auto flex w-full max-w-7xl items-center gap-3"
            >
              <SearchIcon className="h-4 w-4 shrink-0 text-white/50" />
              <input
                ref={searchInputRef}
                type="search"
                name="q"
                placeholder="Search Lean In…"
                aria-label="Search Lean In"
                className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="flex h-8 w-8 items-center justify-center text-lg leading-none
                  text-white/60 transition-colors hover:text-white
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                ✕
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ── */}
      <div
        id="mobile-menu"
        ref={menuRef}
        aria-hidden={!menuOpen}
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          menuOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <ul
          className="flex flex-col border-t border-white/10 px-4 pb-4 pt-2"
          role="list"
        >
          {NAV_LINKS.map(({ label, href, internal }) => {
            const isActive = internal && (pathname === href || pathname.startsWith(href + '/'))
            const mobileLinkClass = `block border-b border-white/10 py-3 text-base hover:text-white ${
              isActive ? 'font-bold text-white' : 'font-normal text-white/80'
            }`
            return (
              <li key={label}>
                {internal ? (
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={mobileLinkClass}
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className={mobileLinkClass}
                  >
                    {label}
                  </a>
                )}
              </li>
            )
          })}
          {/* Join Us in mobile */}
          <li className="pt-4">
            <button
              onClick={() => { toggleAuth(); setMenuOpen(false) }}
              className="w-full rounded-full border border-white/70 py-2 text-sm font-semibold
                text-white transition-colors hover:bg-white hover:text-secondary"
            >
              {isLoggedIn ? 'Sign Out' : 'Join Us'}
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}
