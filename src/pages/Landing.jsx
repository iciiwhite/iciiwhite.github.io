import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../ThemeProvider'
import {
  ArrowRight,
  ArrowUpRight,
  ArrowUp,
  CalendarCheck,
  CaretRight,
  Code,
  Desktop,
  DeviceMobile,
  EnvelopeSimple,
  GithubLogo,
  Globe,
  LinkedinLogo,
  MapPin,
  Moon,
  Quote,
  ShieldCheck,
  Sparkle,
  Sun,
  XLogo
} from '@phosphor-icons/react'

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    desc: 'Interactive, accessible web products built with modern tooling and uncompromising detail.',
    href: '/expertise'
  },
  {
    icon: DeviceMobile,
    title: 'Mobile Apps',
    desc: 'Native-feeling iOS and Android applications shipped with speed and craft.',
    href: '/expertise'
  },
  {
    icon: Desktop,
    title: 'Desktop Apps',
    desc: 'Cross-platform software with the performance of native and the feel of the web.',
    href: '/expertise'
  },
  {
    icon: ShieldCheck,
    title: 'Security Research',
    desc: 'Offensive security, threat modeling, and hardened architecture — at BeduSec.',
    href: '/expertise'
  }
]

const stack = [
  'React',
  'Next.js',
  'React Native',
  'Electron',
  'Tauri',
  'TypeScript',
  'Node.js',
  'Rust',
  'Python',
  'Postgres',
  'Tailwind',
  'Figma'
]

const work = [
  {
    title: 'BeduSec Console',
    cat: 'Web · Security Ops',
    href: '/work',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop',
    span: 'lg:col-span-7'
  },
  {
    title: 'Vault',
    cat: 'Mobile · Encrypted Messaging',
    href: '/work',
    img: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=1400&q=80&auto=format&fit=crop',
    span: 'lg:col-span-5'
  }
]

const quotes = [
  {
    quote:
      'Mugenyi shipped our internal platform end-to-end — and then found two critical vulnerabilities before we even ran a pen test. Rare combination.',
    name: 'Adaeze Okonkwo',
    role: 'Head of Product, Northwind',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop'
  }
]

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window) || els.length === 0) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Nav() {
  const { theme, toggle } = useTheme()
  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 sm:top-5 sm:px-6">
      <nav className="liquid-flat mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-3 py-2 sm:px-4">
        <Link to="/" className="flex items-center gap-2.5 pl-1">
          <span className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 via-violet-600 to-cyan-400 p-[1.5px]">
            <span className="flex h-full w-full items-center justify-center rounded-[7px] bg-[var(--bg-1)]">
              <Code size={15} weight="duotone" className="text-[var(--fg-1)]" />
            </span>
          </span>
          <span className="text-sm font-semibold tracking-tight">Mugenyi Icii</span>
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          <Link to="/expertise" className="nav-link">Expertise</Link>
          <Link to="/work" className="nav-link">Work</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle theme"
            className="group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[var(--line-strong)] bg-[var(--bg-1)]/40 transition hover:border-[var(--accent)]"
          >
            <Sun
              size={16}
              weight="regular"
              className={`absolute transition-all duration-500 ${
                theme === 'light' ? 'translate-y-0 opacity-100 rotate-0' : '-translate-y-6 opacity-0 rotate-90'
              }`}
            />
            <Moon
              size={16}
              weight="regular"
              className={`absolute transition-all duration-500 ${
                theme === 'dark' ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-6 opacity-0 -rotate-90'
              }`}
            />
          </button>
          <Link to="/contact" className="btn btn-primary hidden !px-4 !py-2 text-xs sm:inline-flex sm:text-sm">
            Let's talk
            <ArrowUpRight size={14} weight="bold" />
          </Link>
        </div>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative pt-32 sm:pt-40 lg:pt-44">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <div className="fade-up d-100 inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--bg-1)]/60 px-3 py-1.5 text-[11px] text-[var(--fg-2)] backdrop-blur sm:text-xs">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Available · taking new work for Q1
            </div>

            <h1 className="fade-up d-200 text-display mt-6 text-[clamp(2.4rem,7vw,5.75rem)]">
              Developer of
              <br />
              <span className="text-gradient">web, mobile,</span>
              <br />
              desktop &amp; <span className="text-gradient">secure</span> systems.
            </h1>

            <p className="fade-up d-300 mt-6 max-w-xl text-[clamp(0.95rem,1.4vw,1.1rem)] leading-relaxed text-[var(--fg-2)]">
              I'm <span className="text-[var(--fg-1)] font-medium">Mugenyi Icii</span> — I ship
              premium digital products across three platforms, then make them resilient as a
              Security Researcher at <span className="text-[var(--fg-1)] font-medium">BeduSec</span>.
            </p>

            <div className="fade-up d-400 mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/work" className="btn btn-primary">
                View selected work
                <ArrowRight size={16} weight="bold" />
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                Start a project
                <ArrowUpRight size={16} weight="bold" />
              </Link>
            </div>

            <div className="fade-up d-500 mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-[var(--fg-3)] sm:text-xs">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={13} weight="regular" /> Remote · Worldwide
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={13} weight="duotone" className="text-[var(--accent)]" /> BeduSec
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkle size={13} weight="duotone" className="text-[var(--accent-2)]" /> 40+ shipped
              </span>
            </div>
          </div>

          <div className="relative fade-up d-300">
            <div className="pointer-events-none absolute -inset-6 rounded-[2.25rem] bg-gradient-to-br from-violet-500/25 via-transparent to-cyan-500/25 blur-2xl" />
            <div className="liquid relative rounded-[1.75rem] p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--fg-3)]">
                    Currently building
                  </div>
                  <div className="mt-1 text-base font-semibold sm:text-lg">BeduSec Console</div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line-strong)] bg-[var(--bg-1)]/40">
                  <ShieldCheck size={18} weight="duotone" className="text-[var(--accent)]" />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                {[
                  { k: '40+', v: 'shipped' },
                  { k: '5 yrs', v: 'craft' },
                  { k: '3', v: 'platforms' }
                ].map((s) => (
                  <div key={s.v} className="rounded-xl border border-[var(--line)] bg-[var(--bg-1)]/30 py-3">
                    <div className="text-base font-semibold sm:text-lg">{s.k}</div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--fg-3)]">{s.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--bg-1)]/30 px-3.5 py-2.5 text-xs">
                  <span className="text-[var(--fg-3)]">Focus</span>
                  <span className="font-medium">Security · Web · Native</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-[var(--bg-1)]/30 px-3.5 py-2.5 text-xs">
                  <span className="text-[var(--fg-3)]">Status</span>
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Available
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {['React', 'TS', 'Rust', 'Node'].map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustBar() {
  return (
    <section className="mt-16 border-y border-[var(--line)] bg-[var(--bg-1)]/40 py-6 backdrop-blur sm:mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-3 text-center text-[10px] uppercase tracking-[0.28em] text-[var(--fg-3)] sm:text-xs">
          Tools I ship with
        </div>
        <div className="overflow-hidden">
          <div className="marquee gap-10 pr-10">
            {[...stack, ...stack].map((s, i) => (
              <span key={s + i} className="whitespace-nowrap text-sm font-medium text-[var(--fg-3)] sm:text-base">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl" data-reveal>
          <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--fg-3)] sm:text-xs">
            What I do
          </div>
          <h2 className="text-display mt-3 text-[clamp(1.6rem,4vw,2.75rem)]">
            One developer, three platforms, one security-first mindset.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, desc, href }, i) => (
            <Link
              key={title}
              to={href}
              data-reveal
              data-delay={i + 1}
              className="liquid group flex flex-col rounded-2xl p-5 sm:p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--line-strong)] bg-[var(--bg-1)]/40">
                <Icon size={20} weight="duotone" className="text-[var(--accent)]" />
              </div>
              <h3 className="mt-5 text-sm font-semibold sm:text-base">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--fg-2)] sm:text-sm">{desc}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-[var(--accent)] transition group-hover:gap-2">
                Explore
                <CaretRight size={12} weight="bold" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedWork() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end" data-reveal>
          <div className="max-w-2xl">
            <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--fg-3)] sm:text-xs">
              Selected work
            </div>
            <h2 className="text-display mt-3 text-[clamp(1.6rem,4vw,2.75rem)]">
              Products that ship and stay shipped.
            </h2>
          </div>
          <Link to="/work" className="btn btn-ghost !px-4 !py-2 text-xs sm:text-sm">
            All work
            <ArrowUpRight size={14} weight="bold" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {work.map((p, i) => (
            <Link
              key={p.title}
              to={p.href}
              data-reveal
              data-delay={i + 1}
              className={`liquid group relative overflow-hidden rounded-2xl ${p.span}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="zoom-img h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/70">
                      {p.cat}
                    </div>
                    <div className="mt-1 text-lg font-semibold sm:text-xl">{p.title}</div>
                  </div>
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-md transition group-hover:bg-white group-hover:text-black">
                    <ArrowUpRight size={16} weight="bold" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonial() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div data-reveal className="liquid relative rounded-[1.75rem] p-7 sm:p-10">
          <Quote
            size={42}
            weight="duotone"
            className="absolute -top-2 left-6 text-[var(--accent)]/40 sm:left-8"
          />
          <p className="relative text-[clamp(1.05rem,2vw,1.4rem)] font-medium leading-relaxed text-[var(--fg-1)]">
            "{quotes[0].quote}"
          </p>
          <div className="mt-6 flex items-center gap-3">
            <img
              src={quotes[0].avatar}
              alt={quotes[0].name}
              loading="lazy"
              className="h-11 w-11 rounded-full object-cover ring-2 ring-[var(--glass-border)]"
            />
            <div>
              <div className="text-sm font-semibold">{quotes[0].name}</div>
              <div className="text-xs text-[var(--fg-3)]">{quotes[0].role}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal className="liquid relative overflow-hidden rounded-[1.75rem] p-8 text-center sm:p-14">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="relative">
            <h2 className="text-display mx-auto max-w-2xl text-[clamp(1.6rem,4.5vw,3rem)] text-gradient">
              Let's build something exceptional.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--fg-2)] sm:text-base">
              A short conversation is often enough to know whether we'll make something great
              together. I reply within a day.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/contact" className="btn btn-primary">
                Start a project
                <ArrowUpRight size={16} weight="bold" />
              </Link>
              <a href="mailto:hello@mugenyi.dev" className="btn btn-ghost">
                hello@mugenyi.dev
                <EnvelopeSimple size={16} weight="regular" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-12 border-t border-[var(--line)] pt-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-display text-xl sm:text-2xl">
              Designed &amp; built with intent.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--fg-2)]">
              I'm Mugenyi — a developer and security researcher. I build web, mobile, and desktop
              products, then make them hard to break. Based remotely, working with teams worldwide.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--bg-1)]/60 px-3 py-1.5 text-[11px] text-[var(--fg-2)] backdrop-blur">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Available for select projects
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--fg-3)]">Navigate</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/" className="underline-draw text-[var(--fg-2)] hover:text-[var(--fg-1)]">Home</Link></li>
              <li><Link to="/expertise" className="underline-draw text-[var(--fg-2)] hover:text-[var(--fg-1)]">Expertise</Link></li>
              <li><Link to="/work" className="underline-draw text-[var(--fg-2)] hover:text-[var(--fg-1)]">Work</Link></li>
              <li><Link to="/about" className="underline-draw text-[var(--fg-2)] hover:text-[var(--fg-1)]">About</Link></li>
              <li><Link to="/contact" className="underline-draw text-[var(--fg-2)] hover:text-[var(--fg-1)]">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--fg-3)]">Reach</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="mailto:hello@mugenyi.dev" className="group inline-flex items-center gap-2 text-[var(--fg-2)] hover:text-[var(--fg-1)]">
                  <EnvelopeSimple size={15} weight="regular" className="text-[var(--fg-3)] group-hover:text-[var(--accent)]" />
                  hello@mugenyi.dev
                </a>
              </li>
              <li>
                <a href="https://cal.com/mugenyi" target="_blank" rel="noreferrer noopener" className="group inline-flex items-center gap-2 text-[var(--fg-2)] hover:text-[var(--fg-1)]">
                  <CalendarCheck size={15} weight="duotone" className="text-[var(--fg-3)] group-hover:text-[var(--accent)]" />
                  Book a 30-min call
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-[var(--fg-3)]">
                <MapPin size={15} weight="regular" />
                Remote · EAT (UTC+3)
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[var(--fg-3)]">Elsewhere</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="https://github.com/mugenyiicii" target="_blank" rel="noreferrer noopener" className="group inline-flex items-center gap-2 text-[var(--fg-2)] hover:text-[var(--fg-1)]">
                  <GithubLogo size={16} weight="fill" className="text-[var(--fg-3)] group-hover:text-[var(--fg-1)]" />
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/mugenyiicii" target="_blank" rel="noreferrer noopener" className="group inline-flex items-center gap-2 text-[var(--fg-2)] hover:text-[var(--fg-1)]">
                  <LinkedinLogo size={16} weight="duotone" className="text-[var(--fg-3)] group-hover:text-[var(--fg-1)]" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://x.com/mugenyiicii" target="_blank" rel="noreferrer noopener" className="group inline-flex items-center gap-2 text-[var(--fg-2)] hover:text-[var(--fg-1)]">
                  <XLogo size={16} weight="regular" className="text-[var(--fg-3)] group-hover:text-[var(--fg-1)]" />
                  X / Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider" />

        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <div className="text-xs text-[var(--fg-3)]">
            © {year} Mugenyi Icii. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs text-[var(--fg-3)]">
            <a href="#top" className="inline-flex items-center gap-1 underline-draw hover:text-[var(--fg-1)]">
              Back to top
              <ArrowUp size={12} weight="bold" />
            </a>
            <span className="hidden sm:inline">·</span>
            <a href="mailto:hello@mugenyi.dev?subject=Privacy" className="underline-draw hover:text-[var(--fg-1)]">Privacy</a>
            <a href="mailto:hello@mugenyi.dev?subject=Terms" className="underline-draw hover:text-[var(--fg-1)]">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Landing() {
  useReveal()
  const topRef = useRef(null)
  return (
    <div id="top" ref={topRef} className="shell min-h-screen">
      <Nav />
      <Hero />
      <TrustBar />
      <Services />
      <FeaturedWork />
      <Testimonial />
      <CTA />
      <Footer />
    </div>
  )
}