import Link from 'next/link'

const LIVE = 'https://leanin.org'

const FOOTER_COLS = [
  {
    heading: 'For Individuals',
    links: [
      { label: 'Find a Network', href: `${LIVE}/networks/` },
      { label: 'Circles', href: '/circles', internal: true },
      { label: 'Events', href: `${LIVE}/events/` },
    ],
  },
  {
    heading: 'For Companies',
    links: [
      { label: 'Company Programs', href: `${LIVE}/partner/` },
      { label: 'Circles for Companies', href: `${LIVE}/partner/company-circles/` },
      { label: '50 Ways to Fight Bias', href: `${LIVE}/partner/50-ways-to-fight-bias/` },
    ],
  },
  {
    heading: 'Research',
    links: [
      { label: 'Women in the Workplace', href: `${LIVE}/report/women-in-the-workplace/` },
      { label: 'All Reports', href: `${LIVE}/report/` },
      { label: 'All Articles', href: '/articles', internal: true },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Women at Work', href: `${LIVE}/women-at-work/` },
      { label: 'Lean In Guides', href: `${LIVE}/guide/` },
      { label: 'Glossary', href: `${LIVE}/the-lean-in-lexicon/` },
      { label: 'Shop', href: 'https://shop.leanin.org/' },
    ],
  },
  {
    heading: 'About',
    links: [
      { label: 'About Us', href: `${LIVE}/about/` },
      { label: 'Lean In Team', href: `${LIVE}/about/team/` },
      { label: 'Careers', href: 'https://sgb.org/careers' },
      { label: 'Contact', href: `${LIVE}/about/contact/` },
      { label: 'FAQ', href: `${LIVE}/frequently-asked-questions/` },
    ],
  },
]

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/leaninorg/', icon: '📷' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/leanin-org/', icon: 'in' },
  { label: 'X / Twitter', href: 'https://twitter.com/leaninorg', icon: 'X' },
  { label: 'Facebook', href: 'https://www.facebook.com/leaninorg/', icon: 'f' },
]

interface FooterLinkItem {
  label: string
  href: string
  internal?: boolean
}

function FooterLink({ label, href, internal }: FooterLinkItem) {
  if (internal) {
    return (
      <Link
        href={href}
        className="text-sm text-white/70 transition-colors hover:text-white focus-visible:text-white"
      >
        {label}
      </Link>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-white/70 transition-colors hover:text-white focus-visible:text-white"
    >
      {label}
    </a>
  )
}

export default function Footer() {
  return (
    <footer role="contentinfo" className="bg-secondary text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        {/* Columns */}
        <nav aria-label="Footer navigation">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {FOOTER_COLS.map(col => (
              <div key={col.heading}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/50">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-2.5" role="list">
                  {col.links.map(link => (
                    <li key={link.label}>
                      <FooterLink {...link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* Divider */}
        <div className="my-10 h-px bg-white/10" role="separator" />

        {/* Bottom bar */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Lean In. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href={`${LIVE}/privacy-policy/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href={`${LIVE}/terms-of-use/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Terms of Use
            </a>
          </div>
          {/* Social icons — text labels kept for accessibility since we don't have SVG assets loaded */}
          <div className="flex gap-3" role="list" aria-label="Social media links">
            {SOCIAL_LINKS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                role="listitem"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20
                  text-xs font-bold text-white/60 transition-colors hover:border-white/60 hover:text-white"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
