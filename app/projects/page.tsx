import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I'm building, trying and learning from.",
};

export default function ProjectsPage() {
  return (
    <div className="text-page">
      <h1 className="page-title">Projects</h1>
      <p className="text-page__lede">
        Things I&rsquo;m building, trying and learning from. Each one gets a page for the idea, the
        progress and what I learned.
      </p>

      <ul className="project-list">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={`/projects/${p.slug}`} className="project-row">
              <span className="project-row__main">
                <span className="project-row__title">
                  {p.title}
                  <ArrowUpRight className="project-row__arrow" />
                </span>
                <span className="project-row__summary">{p.summary}</span>
              </span>
              <span className="project-row__meta">
                <span>{p.kind}</span>
                <span className="status-tag" data-status={p.status}>
                  {p.status}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
