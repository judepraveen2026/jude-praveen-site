"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { formatShort } from "@/lib/dates";
import { ChevronLeft, CloseIcon, SearchIcon } from "@/components/icons";
import { noteHref, type NoteData } from "./types";

type Props = {
  /** Notes after search filtering. */
  notes: NoteData[];
  totalCount: number;
  selectedSlug: string | null;
  query: string;
  onQueryChange: (q: string) => void;
  /** "route": rows are links to /writing/<slug>. "local": rows are buttons. */
  mode: "route" | "local";
  onSelect: (slug: string) => void;
  backLink?: { label: string; href: string };
  searchId: string;
  headingLevel: "h2" | "h3";
};

export const NoteList = forwardRef<HTMLDivElement, Props>(function NoteList(
  { notes, totalCount, selectedSlug, query, onQueryChange, mode, onSelect, backLink, searchId, headingLevel },
  ref,
) {
  const countLabel =
    query.trim() === ""
      ? `${totalCount} ${totalCount === 1 ? "note" : "notes"}`
      : `${notes.length} of ${totalCount}`;

  const Heading = headingLevel;

  return (
    <div className="notes-sidebar" ref={ref}>
      <div className="notes-sidebar__top">
        {backLink && (
          <Link href={backLink.href} className="notes-back">
            <ChevronLeft />
            <span>{backLink.label}</span>
          </Link>
        )}
        <Heading className="notes-sidebar__heading">Notes</Heading>

        <div className="notes-search" role="search">
          <label htmlFor={searchId} className="visually-hidden">
            Search notes
          </label>
          <SearchIcon className="notes-search__icon" />
          <input
            id={searchId}
            type="search"
            placeholder="Search"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape" && query) {
                e.preventDefault();
                onQueryChange("");
              }
            }}
          />
          {query && (
            <button
              type="button"
              className="notes-search__clear"
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>

      <p className="visually-hidden" aria-live="polite">
        {query.trim() ? `${notes.length} ${notes.length === 1 ? "note" : "notes"} found` : ""}
      </p>

      {notes.length === 0 ? (
        <div className="notes-empty">
          <p className="notes-empty__title">No notes match “{query.trim()}”</p>
          <p className="notes-empty__hint">Try a different word, or browse everything.</p>
          <button type="button" className="text-button" onClick={() => onQueryChange("")}>
            Clear search
          </button>
        </div>
      ) : (
        <ul className="notes-list" aria-label="Notes">
          {notes.map((note) => {
            const selected = note.slug === selectedSlug;
            const inner = (
              <>
                <span className="note-row__title">{note.title}</span>
                <span className="note-row__meta">
                  <time dateTime={note.date}>{formatShort(note.date)}</time>
                  {note.preview && (
                    <>
                      <span aria-hidden="true"> · </span>
                      <span className="note-row__preview">{note.preview}</span>
                    </>
                  )}
                </span>
              </>
            );
            return (
              <li key={note.slug} className="notes-list__item">
                {mode === "route" ? (
                  <Link
                    href={noteHref(note.slug)}
                    scroll={false}
                    className="note-row"
                    aria-current={selected ? "page" : undefined}
                    data-selected={selected || undefined}
                    data-slug={note.slug}
                    onClick={() => onSelect(note.slug)}
                  >
                    {inner}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="note-row"
                    aria-current={selected ? "true" : undefined}
                    data-selected={selected || undefined}
                    data-slug={note.slug}
                    onClick={() => onSelect(note.slug)}
                  >
                    {inner}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <p className="notes-sidebar__count">{countLabel}</p>
    </div>
  );
});
