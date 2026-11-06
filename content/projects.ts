/**
 * Projects.
 *
 * Both entries below are placeholders. Replace them with real projects
 * (or delete them) when you're ready. Each project gets its own page at
 * /projects/<slug>, with sections for the idea, progress and lessons.
 */

export type ProjectStatus = "placeholder" | "idea" | "in progress" | "paused" | "done";

export type Project = {
  slug: string;
  title: string;
  /** Short category label shown in the list. */
  kind: string;
  status: ProjectStatus;
  /** One-line summary shown in the list. */
  summary: string;
  idea: string[];
  progress: string[];
  lessons: string[];
};

export const projects: Project[] = [
  {
    slug: "business-project",
    title: "Untitled business project",
    kind: "Business",
    status: "placeholder",
    summary: "Placeholder for a business-related project. Details to come.",
    idea: [
      "Placeholder: what problem this project is about, who it's for and why it seemed worth trying.",
    ],
    progress: [
      "Placeholder: nothing has been built or tested yet. Updates will go here as they happen.",
    ],
    lessons: [
      "Placeholder: notes on what worked, what didn't and what I'd do differently.",
    ],
  },
  {
    slug: "passion-project",
    title: "Untitled passion project",
    kind: "Personal",
    status: "placeholder",
    summary: "Placeholder for something made purely out of interest. Details to come.",
    idea: [
      "Placeholder: what this is, and why I care about it.",
    ],
    progress: [
      "Placeholder: no progress to report yet. This section will grow over time.",
    ],
    lessons: [
      "Placeholder: what I learned along the way.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
