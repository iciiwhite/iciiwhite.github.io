import { Link } from 'react-router-dom'

export default function Contact() {
  return (
    <div className="shell flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--fg-3)]">Contact</div>
      <h1 className="text-display mt-4 text-[clamp(2rem,6vw,4rem)]">Coming next.</h1>
      <p className="mt-4 max-w-md text-sm text-[var(--fg-2)]">
        The real contact experience is designed after the landing is confirmed.
      </p>
      <a href="mailto:hello@mugenyi.dev" className="btn btn-primary mt-8">
        Email me directly
      </a>
      <Link to="/" className="mt-4 text-xs text-[var(--fg-3)] underline-draw hover:text-[var(--fg-1)]">
        Back to landing
      </Link>
    </div>
  )
}