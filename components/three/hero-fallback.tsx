/** Static, zero-JS background shown while (or instead of) the 3D scene. */
export function HeroFallback() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="bg-accent-gradient absolute top-1/3 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]" />
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(var(--accent-from)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000,transparent)]" />
    </div>
  );
}