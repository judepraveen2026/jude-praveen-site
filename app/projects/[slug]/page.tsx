import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { ArrowLink } from "@/components/ArrowLink";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const sections = [
    { heading: "The idea", body: project.idea },
    { heading: "Progress", body: project.progress },
    { heading: "Lessons learned", body: project.lessons },
  ];

  return (
    <article className="text-page">
      <ArrowLink href="/projects" direction="back" className="back-link">
        all projects
      </ArrowLink>
      <p className="project-detail__meta">
        <span>{project.kind}</span>
        <span className="status-tag" data-status={project.status}>
          {project.status}
        </span>
      </p>
      <h1 className="page-title">{project.title}</h1>
      <p className="text-page__lede">{project.summary}</p>

      {sections.map((s) => (
        <section key={s.heading} className="text-section">
          <h2 className="text-section__heading">{s.heading}</h2>
          {s.body.map((p) => (
            <p key={p} className="muted">
              {p}
            </p>
          ))}
        </section>
      ))}
    </article>
  );
}
