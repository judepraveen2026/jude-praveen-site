import Link from "next/link";
import { site } from "@/content/site";
import { ArrowUpRight } from "./icons";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__left">
        {site.email && (
          <a href={`mailto:${site.email}`} className="arrow-link">
            <span>Say hello</span>
            <ArrowUpRight className="arrow-link__icon" />
          </a>
        )}
        <nav aria-label="Footer">
          <ul className="footer-nav">
            <li>
              <Link href="/">home</Link>
            </li>
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="footer-location">{site.location}</p>
    </footer>
  );
}
