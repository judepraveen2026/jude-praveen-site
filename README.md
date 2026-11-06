# jude praveen*

My personal site: writing, projects and whatever else I'm figuring out.
Built with Next.js (App Router) and TypeScript. Plain CSS, local Markdown, no database.

## Run it locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Other commands:

```bash
npm run build      # production build (also catches content errors)
npm run start      # serve the production build
npm run typecheck  # TypeScript only
```

## Where things live

```
content/
  site.ts              ← intro, "Currently", nav, email, location
  about.md             ← the About page (one continuous essay, in Markdown)
  projects.ts          ← project list + detail sections
  notes/*.md           ← writing (one Markdown file per note)
public/notes/          ← images used inside notes
app/                   ← routes (/, /about, /writing, /writing/[slug], /projects, /projects/[slug])
components/
  Header.tsx, Footer.tsx, ArrowLink.tsx, Annotation.tsx
  notes/NotesBrowser.tsx  ← the two-pane Notes interface
  notes/NoteList.tsx      ← sidebar: heading, search, note rows
  notes/NoteReader.tsx    ← reading pane
lib/notes.ts           ← reads + renders the Markdown
app/globals.css        ← all styles; colors and fonts are variables at the top
app/icon.svg           ← favicon (maroon asterisk)
```

## Add a post

Create a new file in `content/notes/`, e.g. `content/notes/my-first-post.md`:

```markdown
---
title: My first post
slug: my-first-post
date: 2026-11-10
preview: A short line shown in the note list
---

Your writing here. Markdown works: ## headings, **bold**, *italics*,
[links](https://example.com), lists, > quotes, and images:

![Alt text describing the image](/notes/my-photo.jpg "Optional caption")
```

- `slug` becomes the URL: `/writing/my-first-post`. It defaults to the file name if you leave it out.
- Notes are sorted newest first by `date`. The homepage shows the latest 5 (change `notesCount` in `content/site.ts`).
- Put images in `public/notes/` and reference them as `/notes/filename.jpg`.
- Add `draft: true` to hide a note without deleting it.
- Add `sample: true` to show a small "sample" tag (all current placeholder notes have this).

## Replace the placeholder content

1. **Intro and Currently:** edit `content/site.ts`. Everything marked "Placeholder" is meant to be replaced.
   **About page:** edit `content/about.md`. Write it like a post: blank lines between paragraphs, `[text](url)` for links, and an optional `> quote` at the top.
2. **Writing:** delete the sample files in `content/notes/` (or remove `sample: true` from any you keep), then add your own.
3. **Projects:** edit or replace the two entries in `content/projects.ts`. `status` can be `placeholder`, `idea`, `in progress`, `paused` or `done`.
4. **Email / social links:** the footer's "Say hello" link uses `email` in `content/site.ts` (set it to `""` to hide it). Social links can go in `components/Footer.tsx` or the "Elsewhere" section in `content/site.ts`.
5. **Domain:** once you have one, set `url` in `content/site.ts` so link previews use absolute URLs.

## Put it on GitHub

```bash
git init
git add .
git commit -m "Initial version of personal site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

`node_modules/` and `.next/` are already in `.gitignore`.
