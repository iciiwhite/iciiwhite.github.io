export default function Background() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink" />
      <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-violet-600/25 blur-[120px] animate-aurora" />
      <div
        className="absolute -top-24 right-0 h-[30rem] w-[30rem] rounded-full bg-cyan-500/20 blur-[120px] animate-aurora"
        style={{ animationDelay: '-7s' }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[34rem] w-[34rem] rounded-full bg-indigo-600/20 blur-[140px] animate-aurora"
        style={{ animationDelay: '-14s' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,6,10,0)_0%,rgba(5,6,10,0.55)_65%,rgba(5,6,10,1)_100%)]" />
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
    </div>
  )
}