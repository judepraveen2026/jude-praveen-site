/** Handwritten margin note with a small hand-drawn underline. */
export function Annotation({ children }: { children: string }) {
  return (
    <p className="annotation">
      <span className="annotation__text">{children}</span>
      <svg className="annotation__line" viewBox="0 0 120 24" aria-hidden="true" focusable="false">
        <path
          d="M4 19 C 30 12, 70 7, 116 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </p>
  );
}
