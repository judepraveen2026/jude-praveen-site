/** The shape of a note as passed to client components. */
export type NoteData = {
  slug: string;
  title: string;
  date: string;
  preview: string;
  sample: boolean;
  html: string;
  text: string;
};

export function noteHref(slug: string) {
  return `/writing/${slug}`;
}

/** Case-insensitive match on title, preview and body. Every word must appear. */
export function filterNotes(notes: NoteData[], query: string): NoteData[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return notes;
  return notes.filter((n) => {
    const haystack = `${n.title} ${n.preview} ${n.text}`.toLowerCase();
    return terms.every((t) => haystack.includes(t));
  });
}
