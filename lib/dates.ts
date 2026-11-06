const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
}

/** "November 5, 2026" — timezone-safe (no Date parsing). */
export function formatLong(iso: string): string {
  const { y, m, d } = parts(iso);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/** "Nov 5" — the short form used in the note list. */
export function formatShort(iso: string): string {
  const { m, d } = parts(iso);
  return `${MONTHS[m - 1].slice(0, 3)} ${d}`;
}
