import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  Code,
  Desktop,
  DeviceMobile,
  Globe,
  Lightning,
  LockKey,
  MapPin,
  ShieldCheck,
  Sparkle,
  Terminal
} from '@phosphor-icons/react'

const stack = ['React', 'Next.js', 'React Native', 'Electron', 'TypeScript', 'Node.js', 'Rust', 'Python']

const expertise = [
  {
    icon: Globe,
    title: 'Web Development',
    desc: 'Fast, accessible, and delightful web applications built with modern tooling and pixel-perfect detail.',
    tags: ['React', 'Next.js', 'Tailwind'],
    accent: 'from-violet-500/40 to-fuchsia-500/10'
  },
  {
    icon: DeviceMobile,
    title: 'Mobile Apps',
    desc: 'Cross-platform iOS and Android apps that feel native, ship fast, and scale with your product.',
    tags: ['React Native', 'Expo', 'Swift'],
    accent: 'from-cyan-500/40 to-sky-500/10'
  },
  {
    icon: Desktop,
    title: 'Desktop Apps',
    desc: 'Powerful cross-platform desktop software with native performance and thoughtful UI.',
    tags: ['Electron', 'Tauri', 'Rust'],
    accent: 'from-amber-400/40 to-orange-500/10'
  },
  {
    icon: ShieldCheck,
    title: 'Security Research',
    desc: 'Offensive security, threat modeling, and secure architecture at BeduSec — by default, not bolt-on.',
    tags: ['AppSec', 'Pentesting', 'Crypto'],
    accent: 'from-emerald-400/40 to-teal-500/10'
  }
]

const projects = [
  {
    name: 'BeduSec Console',
    category: 'Web Platform',
    desc: 'Real-time security operations dashboard for triaging threats and coordinating red-team engagements.',
    tags: ['React', 'TypeScript', 'Go'],
    accent: 'from-violet-500/40 via-indigo-500/20 to-cyan-500/30'
  },
  {
    name: 'Vault',
    category: 'Mobile App',
    desc: 'End-to-end encrypted messaging for teams that treat privacy as a product feature, not a checkbox.',
    tags: ['React Native', 'Signal Protocol'],
    accent: 'from-cyan-500/40 via-sky-500/20 to-blue-500/30'
  },
  {
    name: 'Forge',
    category: 'Desktop Suite',
    desc: 'A cross-platform developer toolkit for secure local builds, code review, and environment isolation.',
    tags: ['Tauri', 'Rust', 'SQLite'],
    accent: 'from-amber-400/40 via-orange-500/20 to-rose-500/30'
  }
]

const stats = [
  { k: '40+', v: 'Projects shipped' },
  { k: '5+', v: 'Years of craft' },
  { k: '3', v: 'Platforms mastered' },
  { k: '24/7', v: 'Curiosity' }
]

function MiniMock({ accent }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="absolute inset-4 flex flex-col gap-2 rounded-xl border border-white/15 bg-white/[0.06] p-3 backdrop-blur-md">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/50" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>
        <div className="mt-1 h-2 w-3/4 rounded-full bg-white/30" />
        <div className="h-2 w-1/2 rounded-full bg-white/20" />
        <div className="mt-auto grid grid-cols-3 gap-1.5">
          <div className="h-8 rounded-md bg-white/15" />
          <div className="h-8 rounded-md bg-white/10" />
          <div className="h-8 rounded-md bg-white/20" />
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <section id="top" className="relative pt-28 pb-12 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[11px] text-white/70 sm:text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available for new projects
              </div>

              <p className="mt-6 text-[10px] uppercase tracking-[0.28em] text-white/45 sm:text-xs">
                Hi, I'm
              </p>
              <h1 className="mt-2 text-[clamp(1.75rem,9vw,6.5rem)] font-semibold leading-[0.95] tracking-tight">
                Mugenyi <span className="text-gradient">Icii</span>
              </h1>

              <p className="mt-6 max-w-xl text-[clamp(0.9rem,1.4vw,1.1rem)] leading-relaxed text-white/60">
                A <span className="text-white">web, mobile & desktop app developer</span> and
                Security Researcher at <span className="text-white">BeduSec</span>. I build
                premium digital products — then make sure they can't be broken.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#work" className="btn-primary">
                  View my work
                  <ArrowRight size={16} weight="bold" />
                </a>
                <a href="#contact" className="btn-ghost">
                  Get in touch
                  <ArrowUpRight size={16} weight="bold" />
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-1.5">
                {stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-violet-500/25 via-transparent to-cyan-500/25 blur-2xl" />
              <div className="relative glass rounded-3xl p-5 sm:p-7">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-violet-400 to-cyan-300 p-[1.5px]">
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-ink text-lg font-semibold">
                      MI
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-base font-semibold">Mugenyi Icii</div>
                    <div className="truncate text-xs text-white/55 sm:text-sm">
                      Developer · Security Researcher
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                  {[
                    { k: '40+', v: 'Projects' },
                    { k: '5+', v: 'Years' },
                    { k: '3', v: 'Platforms' }
                  ].map((s) => (
                    <div key={s.v} className="rounded-xl border border-white/[0.06] bg-white/[0.04] py-3">
                      <div className="text-base font-semibold sm:text-lg">{s.k}</div>
                      <div className="text-[10px] uppercase tracking-wider text-white/45">{s.v}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5">
                    <span className="flex items-center gap-2 text-white/55">
                      <MapPin size={14} /> Based
                    </span>
                    <span className="text-white/85">Remote · Worldwide</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5">
                    <span className="flex items-center gap-2 text-white/55">
                      <ShieldCheck size={14} /> Security
                    </span>
                    <span className="text-white/85">BeduSec</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['React', 'Next.js', 'RN', 'Electron', 'TS', 'Node'].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/65 sm:text-[11px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="expertise" className="scroll-mt-28 py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/40 sm:text-xs">
              Expertise
            </span>
            <h2 className="mt-3 text-[clamp(1.5rem,4vw,2.75rem)] font-semibold tracking-tight text-gradient">
              Built end to end.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
              One developer, three platforms, one security-first mindset. Every layer crafted with intent.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {expertise.map(({ icon: Icon, title, desc, tags, accent }) => (
              <div key={title} className="glass glass-hover rounded-2xl p-5 sm:p-6">
                <div
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br ${accent}`}
                >
                  <Icon size={20} weight="duotone" className="text-white" />
                </div>
                <h3 className="mt-5 text-sm font-semibold sm:text-base">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/55 sm:text-sm">{desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/60 sm:text-[11px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="scroll-mt-28 py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/40 sm:text-xs">
                Selected Work
              </span>
              <h2 className="mt-3 text-[clamp(1.5rem,4vw,2.75rem)] font-semibold tracking-tight text-gradient">
                Products that ship and stay shipped.
              </h2>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
            >
              Start a project <ArrowUpRight size={14} weight="bold" />
            </a>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <a
                key={p.name}
                href="#contact"
                className="glass glass-hover group block overflow-hidden rounded-2xl"
              >
                <div className="relative">
                  <MiniMock accent={p.accent} />
                  <div className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition group-hover:bg-white group-hover:text-ink">
                    <ArrowUpRight size={14} weight="bold" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {p.category}
                  </div>
                  <h3 className="mt-1.5 text-base font-semibold">{p.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/55 sm:text-sm">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-28 py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/40 sm:text-xs">
                About
              </span>
              <h2 className="mt-3 text-[clamp(1.5rem,4vw,2.75rem)] font-semibold tracking-tight text-gradient">
                A developer who thinks like an attacker.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/60 sm:text-base">
                I've spent years shipping products across the web, mobile, and desktop — and just
                as long breaking them apart as a security researcher. That duality shapes
                everything I build: interfaces that feel effortless, and systems that hold up
                under pressure.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
                At <span className="text-white">BeduSec</span> I focus on offensive security,
                threat modeling, and secure architecture. Outside of that, I'm building fast,
                accessible products with modern tools.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Offensive Security', 'Secure Architecture', 'Product Design', 'Performance'].map(
                  (t) => (
                    <span
                      key={t}
                      className="glass rounded-full px-3 py-1.5 text-[11px] text-white/70 sm:text-xs"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {stats.map((s) => (
                <div key={s.v} className="glass glass-hover rounded-2xl p-5 sm:p-6">
                  <div className="text-2xl font-semibold tracking-tight sm:text-3xl">{s.k}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-white/45 sm:text-xs">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: LockKey,
                title: 'Security by default',
                desc: 'Threat models, audits, and hardened architecture baked in from day one.'
              },
              {
                icon: Lightning,
                title: 'Performance obsessed',
                desc: 'Sub-second loads, minimal payloads, and buttery-smooth interactions.'
              },
              {
                icon: Sparkle,
                title: 'Premium craft',
                desc: 'Design and engineering treated as one discipline, never an afterthought.'
              }
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass glass-hover rounded-2xl p-5 sm:p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Icon size={18} weight="duotone" className="text-white/85" />
                </div>
                <h3 className="mt-4 text-sm font-semibold">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/55 sm:text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="glass relative overflow-hidden rounded-[1.75rem] p-8 text-center sm:rounded-[2rem] sm:p-14">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-[11px] text-white/70 sm:text-xs">
                <CheckCircle size={14} weight="fill" className="text-emerald-400" />
                Currently accepting new projects
              </div>

              <h2 className="mx-auto mt-5 max-w-2xl text-[clamp(1.5rem,4.5vw,3rem)] font-semibold leading-tight tracking-tight text-gradient">
                Let's build something exceptional.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                Whether it's a web product, a mobile app, or hardening your stack — I bring the
                same obsession with detail to every line.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="mailto:hello@mugenyi.dev" className="btn-primary">
                  Email me
                  <ArrowUpRight size={16} weight="bold" />
                </a>
                <a href="https://cal.com/mugenyi" target="_blank" rel="noreferrer noopener" className="btn-ghost">
                  Book a call
                  <ArrowUpRight size={16} weight="bold" />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-white/40 sm:text-xs">
                <span className="inline-flex items-center gap-1.5">
                  <Code size={13} /> Web · Mobile · Desktop
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={13} /> Security Research
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Terminal size={13} /> BeduSec
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}