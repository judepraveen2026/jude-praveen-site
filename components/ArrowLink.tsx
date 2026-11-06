import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, ChevronLeft } from "./icons";

/** Underlined text link with a small arrow, as in the mockup ("more about me ↗"). */
export function ArrowLink({
  href,
  children,
  direction = "out",
  className = "",
}: {
  href: string;
  children: ReactNode;
  direction?: "out" | "back";
  className?: string;
}) {
  return (
    <Link href={href} className={`arrow-link ${direction === "back" ? "arrow-link--back" : ""} ${className}`}>
      {direction === "back" && <ChevronLeft size={16} className="arrow-link__icon" />}
      <span>{children}</span>
      {direction === "out" && <ArrowUpRight className="arrow-link__icon" />}
    </Link>
  );
}
