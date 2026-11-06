import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Loads writing from content/notes/*.md (or .mdx — parsed as Markdown).
 *
 * Front matter:
 *   title:   string   (required)
 *   slug:    string   (optional — defaults to the file name)
 *   date:    YYYY-MM-DD (required)
 *   preview: string   (optional — short line shown in the note list)
 *   sample:  boolean  (optional — marks placeholder content)
 *   draft:   boolean  (optional — hides the note from the site)
 */

export type NoteMeta = {
  slug: string;
  title: string;
  /** ISO date string, YYYY-MM-DD */
  date: string;
  preview: string;
  sample: boolean;
};

export type Note = NoteMeta & {
  /** Rendered HTML of the body. */
  html: string;
  /** Plain-text body, used for search. */
  text: string;
};

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value.slice(0, 10);
  throw new Error(`Invalid or missing date in note front matter: ${String(value)}`);
}

function toPlainText(markdown: string): string {
  return markdown
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const escapeAttr = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// External links open in a new tab; images are lazy-loaded and get a caption from their title.
const renderer = new marked.Renderer();
renderer.link = function ({ href, title, tokens }) {
  const text = this.parser.parseInline(tokens);
  const external = /^https?:\/\//.test(href);
  href = escapeAttr(href);
  const titleAttr = title ? ` title="${escapeAttr(title)}"` : "";
  const extra = external ? ` target="_blank" rel="noopener noreferrer"` : "";
  return `<a href="${href}"${titleAttr}${extra}>${text}${
    external ? '<span class="visually-hidden"> (opens in a new tab)</span>' : ""
  }</a>`;
};
renderer.image = function ({ href, title, text }) {
  const img = `<img src="${escapeAttr(href)}" alt="${escapeAttr(text)}" loading="lazy" decoding="async" />`;
  return title ? `<figure>${img}<figcaption>${escapeAttr(title)}</figcaption></figure>` : img;
};

/** Renders a Markdown string to HTML using the same rules as notes. */
export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown, { renderer, async: false }) as string;
}

let cache: Note[] | null = null;

export function getAllNotes(): Note[] {
  if (cache && process.env.NODE_ENV === "production") return cache;

  const files = fs.existsSync(NOTES_DIR)
    ? fs.readdirSync(NOTES_DIR).filter((f) => /\.mdx?$/.test(f))
    : [];

  const notes = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(NOTES_DIR, file), "utf8");
      const { data, content } = matter(raw);
      if (data.draft) return null;
      if (!data.title) throw new Error(`Note ${file} is missing a title`);
      const note: Note = {
        slug: String(data.slug ?? file.replace(/\.mdx?$/, "")),
        title: String(data.title),
        date: toIsoDate(data.date),
        preview: String(data.preview ?? ""),
        sample: Boolean(data.sample),
        html: renderMarkdown(content),
        text: toPlainText(content),
      };
      return note;
    })
    .filter((n): n is Note => n !== null)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));

  const seen = new Set<string>();
  for (const n of notes) {
    if (seen.has(n.slug)) throw new Error(`Duplicate note slug: ${n.slug}`);
    seen.add(n.slug);
  }

  cache = notes;
  return notes;
}

export function getNote(slug: string): Note | undefined {
  return getAllNotes().find((n) => n.slug === slug);
}
