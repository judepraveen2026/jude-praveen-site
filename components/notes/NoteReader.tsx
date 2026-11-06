"use client";

import Link from "next/link";
import { forwardRef, useEffect, useState } from "react";
import { formatLong } from "@/lib/dates";
import { CheckIcon, ChevronLeft, ExpandIcon, LinkIcon } from "@/components/icons";
import { noteHref, type NoteData } from "./types";

type Props = {
  note: NoteData | null;
  /** Shown only on small screens, where the list and reader are separate views. */
  onBack: () => void;
  backHref?: string;
  /** Show an "open full note" control (used on the homepage). */
  showOpenLink: boolean;
  headingLevel: "h2" | "h3";
};

export const NoteReader = forwardRef<HTMLDivElement, Props>(function NoteReader(
  { note, onBack, backHref, showOpenLink, headingLevel },
  ref,
) {
  const [copied, setCopied] = useState(false);

  useEffect(() => setCopied(false), [note?.slug]);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  async function copyLink() {
    if (!note) return;
    const url = `${window.location.origin}${noteHref(note.slug)}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for browsers without clipboard permission.
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
  }

  const Heading = headingLevel;

  return (
    <div className="notes-reader" ref={ref}>
      <div className="notes-reader__bar">
        {backHref ? (
          <Link href={backHref} scroll={false} className="notes-back notes-reader__back" onClick={onBack}>
            <ChevronLeft />
            <span>Notes</span>
          </Link>
        ) : (
          <button type="button" className="notes-back notes-reader__back" onClick={onBack}>
            <ChevronLeft />
            <span>Notes</span>
          </button>
        )}

        {note && (
          <div className="notes-reader__actions">
            <span className="visually-hidden" aria-live="polite">
              {copied ? "Link copied" : ""}
            </span>
            <button
              type="button"
              className="icon-button"
              onClick={copyLink}
              aria-label="Copy link to this note"
              title={copied ? "Link copied" : "Copy link"}
            >
              {copied ? <CheckIcon /> : <LinkIcon />}
            </button>
            {showOpenLink && (
              <Link
                href={noteHref(note.slug)}
                className="icon-button"
                aria-label={`Open “${note.title}” on its own page`}
                title="Open in Writing"
              >
                <ExpandIcon />
              </Link>
            )}
          </div>
        )}
      </div>

      {note ? (
        <article className="notes-article" aria-labelledby={`note-title-${note.slug}`}>
          <p className="notes-article__date">
            <time dateTime={note.date}>{formatLong(note.date)}</time>
            {note.sample && <span className="sample-tag">sample</span>}
          </p>
          <Heading className="notes-article__title" id={`note-title-${note.slug}`} tabIndex={-1}>
            {note.title}
          </Heading>
          <div className="prose" dangerouslySetInnerHTML={{ __html: note.html }} />
        </article>
      ) : (
        <div className="notes-article notes-article--empty">
          <p>Nothing here yet.</p>
        </div>
      )}
    </div>
  );
});
