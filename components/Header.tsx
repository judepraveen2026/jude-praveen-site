"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { Asterisk } from "./icons";

export function Header() {
  const pathname = usePathname() ?? "/";

  return (
    <header className="site-header">
      <Link href="/" className="site-name" aria-label={`${site.fullName}, home`}>
        <span>{site.name}</span>
        <Asterisk className="site-name__asterisk" />
      </Link>
      <nav aria-label="Main">
        <ul className="site-nav">
          {site.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link href={item.href} aria-current={active ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
