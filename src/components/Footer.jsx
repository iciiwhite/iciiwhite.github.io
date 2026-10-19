import { EnvelopeSimple, GithubLogo, LinkedinLogo, XLogo } from '@phosphor-icons/react'

const socials = [
  { label: 'GitHub', href: 'https://github.com/mugenyiicii', icon: GithubLogo },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/mugenyiicii', icon: LinkedinLogo },
  { label: 'X', href: 'https://x.com/mugenyiicii', icon: XLogo },
  { label: 'Email', href: 'mailto:hello@mugenyi.dev', icon: EnvelopeSimple }
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-400 to-cyan-300 p-[1.5px]">
              <span className="flex h-full w-full items-center justify-center rounded-lg bg-ink text-[11px] font-bold">
                MI
              </span>
            </span>
            <span className="text-xs text-white/45 sm:text-sm">
              © {new Date().getFullYear()} Mugenyi Icii. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noreferrer noopener'}
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
              >
                <Icon size={16} weight="regular" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}