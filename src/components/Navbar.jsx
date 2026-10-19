import { useEffect, useState } from 'react'
import { ArrowUpRight, List, X } from '@phosphor-icons/react'

const links = [
  { label: 'Expertise', href: '#expertise' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-6">
      <nav className="mx-auto max-w-6xl">
        <div
          className={`glass flex items-center justify-between rounded-2xl px-3 py-2.5 transition-all duration-300 sm:px-5 ${
            scrolled ? 'shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]' : ''
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5 pl-1">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-400 to-cyan-300 p-[1.5px]">
              <span className="flex h-full w-full items-center justify-center rounded-lg bg-ink text-[11px] font-bold tracking-tight">
                MI
              </span>
            </span>
            <span className="text-sm font-semibold tracking-tight">Mugenyi Icii</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm text-white/65 transition hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a href="#contact" className="btn-primary hidden !px-4 !py-2 text-xs sm:inline-flex sm:text-sm">
              Let's talk
              <ArrowUpRight size={14} weight="bold" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 md:hidden"
            >
              {open ? <X size={18} /> : <List size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="glass mt-2 rounded-2xl p-2 md:hidden">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-white/80 transition hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-medium text-ink"
            >
              Let's talk
              <ArrowUpRight size={16} weight="bold" />
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}