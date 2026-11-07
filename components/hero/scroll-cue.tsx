import { ArrowDown } from "lucide-react";

type ScrollCueProps = {
  href: string;
  label: string;
};

/** Round arrow between two fading lines, pointing to the next section. */
export function ScrollCue({ href, label }: ScrollCueProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl items-center gap-4 px-6">
      <span
        aria-hidden
        className="h-px flex-1 bg-gradient-to-r from-transparent to-fuchsia-400/80"
      />
      <a
        href={href}
        aria-label={label}
        className="grid size-11 shrink-0 place-items-center rounded-full border border-fuchsia-400/60 bg-[#1d0b38]/60 text-white shadow-[0_0_24px_-4px_rgba(255,45,134,0.6)] transition-transform duration-300 hover:scale-110"
      >
        <ArrowDown
          aria-hidden
          className="size-5 animate-bounce [animation-duration:2.4s]"
        />
      </a>
      <span
        aria-hidden
        className="h-px flex-1 bg-gradient-to-l from-transparent to-violet-400/80"
      />
    </div>
  );
}