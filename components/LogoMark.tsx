type Props = {
  className?: string;
  title?: string;
};

// Geometry: three right-pointing forms with identical edge slope (12:15) and
// identical 9.6-unit gaps, mirrored on the horizontal axis y = 32.
export const LOGO_PATHS = {
  large: "M32 17H41L53 32L41 47H32L44 32Z",
  small: "M19 24H28L34.4 32L28 40H19L25.4 32Z",
  spark: "M11 26L15.8 32L11 38Z",
} as const;

export function LogoMark({ className, title }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <circle cx="32" cy="32" r="32" className="fill-accent" />
      <circle cx="32" cy="32" r="32" className="logo-fill fill-accent-deep" />
      <g className="fill-paper">
        <path d={LOGO_PATHS.large} />
        <path d={LOGO_PATHS.small} />
        <path d={LOGO_PATHS.spark} />
      </g>
    </svg>
  );
}
