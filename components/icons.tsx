/** Small inline icons. All are decorative (aria-hidden); pair them with text or an aria-label. */

type IconProps = { className?: string; size?: number };

const base = (size = 18) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
});

export function ArrowUpRight({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ChevronLeft({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className} strokeWidth={2.2}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function SearchIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </svg>
  );
}

export function CloseIcon({ className, size = 14 }: IconProps) {
  return (
    <svg {...base(size)} className={className} strokeWidth={2.4}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function LinkIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" />
      <path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" />
    </svg>
  );
}

export function ExpandIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
      <path d="M10 14 16 8" />
      <path d="M11 8h5v5" />
    </svg>
  );
}

export function CheckIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...base(size)} className={className} strokeWidth={2.2}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function Asterisk({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
        <line x1="12" y1="3.5" x2="12" y2="20.5" />
        <line x1="4.6" y1="7.75" x2="19.4" y2="16.25" />
        <line x1="4.6" y1="16.25" x2="19.4" y2="7.75" />
      </g>
    </svg>
  );
}
