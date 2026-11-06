import type { Note } from "./notes";
import type { NoteData } from "@/components/notes/types";

export function toNoteData(n: Note): NoteData {
  return {
    slug: n.slug,
    title: n.title,
    date: n.date,
    preview: n.preview,
    sample: n.sample,
    html: n.html,
    text: n.text,
  };
}
