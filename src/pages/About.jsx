import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="shell flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--fg-3)]">About</div>
      <h1 className="text-display mt-4 text-[clamp(2rem,6vw,4rem)]">Coming next.</h1>
      <p className="mt-4 max-w-md text-sm text-[var(--fg-2)]">
        Lock the landing in first — the About page will use the same liquid glass system, typography, and motion.
      </p>
      <Link to="/" className="btn btn-primary mt-8">
        Back to landing
      </Link>
    </div>
  )
}