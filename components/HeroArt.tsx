import { LOGO_PATHS } from "./LogoMark";

export function HeroArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 440" className={className} aria-hidden="true" focusable="false">
      <circle cx="352" cy="226" r="160" className="fill-tint" />

      <g className="fill-ink">
        <path d="M268 238L360 156L452 238Z" />
        <rect x="284" y="236" width="152" height="124" />
      </g>
      <rect x="342" y="288" width="36" height="72" className="fill-accent" />
      <g className="fill-paper">
        <rect x="302" y="260" width="26" height="26" />
        <rect x="392" y="260" width="26" height="26" />
      </g>

      <g className="fill-accent" transform="translate(78.4 217.6) scale(3.2)">
        <path d={LOGO_PATHS.large} />
        <path d={LOGO_PATHS.small} />
        <path d={LOGO_PATHS.spark} />
      </g>

      <rect x="24" y="358" width="472" height="4" className="fill-ink" />
    </svg>
  );
}
