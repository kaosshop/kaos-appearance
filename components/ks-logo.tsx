type Props = {
  className?: string
  title?: string
}

/**
 * Kaos Shop monogram, redrawn as vector paths so it scales and inherits
 * the active accent colour through `currentColor`.
 */
export function KsLogo({ className, title = "Kaos Shop" }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label={title} fill="none">
      <g fill="currentColor">
        <path d="M33 26h22c-4.6 0-6.2 2-6.2 6v56c0 4 1.6 6 6.2 6H33c4.6 0 6.2-2 6.2-6V32c0-4-1.6-6-6.2-6Z" />
        <path d="M77.5 27.5c3.6-.4 7.2-.5 10.8-.3-15 9-27.6 21-37.4 35.9l-1.6 2.4-4.6-10.3C53 43 64.3 33.6 77.5 27.5Z" />
      </g>
      <path
        d="M80.5 55.5c0-11.5-24.5-13-25.8-1-1.2 11.5 27.3 8.8 27.3 23.5 0 14-25.5 14.6-28.5 2.2"
        stroke="currentColor"
        strokeWidth="8.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function KsWordmark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="font-semibold">Kaos Shop</span> <span className="opacity-60">Appearance</span>
    </span>
  )
}
