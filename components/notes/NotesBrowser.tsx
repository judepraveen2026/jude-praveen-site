"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { NoteList } from "./NoteList";
import { NoteReader } from "./NoteReader";
import { filterNotes, type NoteData } from "./types";

const MOBILE_QUERY = "(max-width: 719px)";

type Props = {
  notes: NoteData[];
  /**
   * "route" (Writing page): each note has its own URL (/writing/<slug>), so
   *   selection follows the address bar and browser back/forward.
   * "local" (homepage): selection is kept on the page; the reader offers a
   *   link to the note's own URL.
   */
  mode: "route" | "local";
  size?: "compact" | "full";
  backLink?: { label: string; href: string };
  headingLevel?: "h2" | "h3";
};

function slugFromPath(pathname: string | null): string | null {
  const m = pathname?.match(/^\/writing\/([^/?#]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

export function NotesBrowser({ notes, mode, size = "compact", backLink, headingLevel = "h3" }: Props) {
  const pathname = usePathname();
  const searchId = useId();
  const [query, setQuery] = useState("");

  // Local-mode state (homepage).
  const [localSlug, setLocalSlug] = useState<string | null>(null);
  const [localView, setLocalView] = useState<"list" | "article">("list");

  const urlSlug = mode === "route" ? slugFromPath(pathname) : null;
  const chosenSlug = mode === "route" ? urlSlug : localSlug;
  const view: "list" | "article" = mode === "route" ? (urlSlug ? "article" : "list") : localView;

  const filtered = useMemo(() => filterNotes(notes, query), [notes, query]);

  // What the reader shows: the chosen note, otherwise the newest visible note (desktop only).
  const current =
    notes.find((n) => n.slug === chosenSlug) ?? filtered[0] ?? (query ? null : notes[0] ?? null);
  const selectedSlug = current?.slug ?? null;

  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const readerRef = useRef<HTMLDivElement>(null);
  const prevView = useRef(view);
  const prevSlug = useRef(selectedSlug);

  // Reset the reader's scroll position when the note changes.
  useEffect(() => {
    if (prevSlug.current !== selectedSlug && readerRef.current) {
      readerRef.current.scrollTop = 0;
    }
    prevSlug.current = selectedSlug;
  }, [selectedSlug]);

  // On phones, the list and the article are separate views: move focus and
  // scroll so keyboard and screen-reader users land in the right place.
  useEffect(() => {
    if (prevView.current === view) return;
    prevView.current = view;
    if (!window.matchMedia(MOBILE_QUERY).matches) return;

    const panel = panelRef.current;
    if (panel) {
      const top = panel.getBoundingClientRect().top;
      if (top < 0) window.scrollTo({ top: window.scrollY + top - 12 });
    }
    if (view === "article") {
      readerRef.current?.querySelector<HTMLElement>(".notes-article__title")?.focus({ preventScroll: true });
    } else {
      const row = listRef.current?.querySelector<HTMLElement>(`[data-slug="${CSS.escape(selectedSlug ?? "")}"]`);
      (row ?? listRef.current?.querySelector<HTMLElement>("input"))?.focus({ preventScroll: true });
    }
  }, [view, selectedSlug]);

  function handleSelect(slug: string) {
    if (mode === "local") {
      setLocalSlug(slug);
      setLocalView("article");
    }
  }

  function handleBack() {
    if (mode === "local") setLocalView("list");
  }

  return (
    <div className={`notes-panel notes-panel--${size}`} data-view={view} ref={panelRef}>
      <NoteList
        ref={listRef}
        notes={filtered}
        totalCount={notes.length}
        selectedSlug={selectedSlug}
        query={query}
        onQueryChange={setQuery}
        mode={mode}
        onSelect={handleSelect}
        backLink={backLink}
        searchId={searchId}
        headingLevel={headingLevel}
      />
      <NoteReader
        ref={readerRef}
        note={current}
        onBack={handleBack}
        backHref={mode === "route" ? "/writing" : undefined}
        showOpenLink={mode === "local"}
        headingLevel={headingLevel}
      />
    </div>
  );
}
