import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import matter from "gray-matter";
import { site } from "@/content/site";
import { renderMarkdown } from "@/lib/notes";

/**
 * The About page is one continuous essay, written in content/about.md.
 * Edit that file. This component just renders it.
 */
function getAbout() {
  const raw = fs.readFileSync(path.join(process.cwd(), "content", "about.md"), "utf8");
  const { data, content } = matter(raw);
  return {
    title: typeof data.title === "string" ? data.title : "About",
    html: renderMarkdown(content),
  };
}

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.fullName}.`,
};

export default function AboutPage() {
  const about = getAbout();

  return (
    <article className="text-page about-page">
      <h1 className="page-title">{about.title}</h1>
      <div className="prose about-prose" dangerouslySetInnerHTML={{ __html: about.html }} />
    </article>
  );
}
