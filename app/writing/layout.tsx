import { getAllNotes } from "@/lib/notes";
import { toNoteData } from "@/lib/toNoteData";
import { NotesBrowser } from "@/components/notes/NotesBrowser";

/**
 * The Notes browser lives in this layout so it stays mounted while you move
 * between /writing and /writing/<slug>. That keeps the search text and list
 * scroll position intact, and lets back/forward switch notes instantly.
 */
export default function WritingLayout({ children }: { children: React.ReactNode }) {
  const notes = getAllNotes().map(toNoteData);

  return (
    <div className="writing-page">
      <div className="writing-page__head">
        <h1 className="page-title">Writing</h1>
        <p className="muted">Notes, essays and things I&rsquo;m working out.</p>
      </div>
      <NotesBrowser
        notes={notes}
        mode="route"
        size="full"
        headingLevel="h2"
        backLink={{ label: "Home", href: "/" }}
      />
      {children}
    </div>
  );
}
