import { site } from "@/content/site";
import { getAllNotes } from "@/lib/notes";
import { toNoteData } from "@/lib/toNoteData";
import { ArrowLink } from "@/components/ArrowLink";
import { Annotation } from "@/components/Annotation";
import { NotesBrowser } from "@/components/notes/NotesBrowser";

export default function HomePage() {
  const notes = getAllNotes().slice(0, site.home.notesCount).map(toNoteData);

  return (
    <>
      <section className="intro" aria-labelledby="intro-heading">
        <div className="intro__text">
          <h1 id="intro-heading" className="page-title">
            {site.home.heading}
          </h1>
          {site.home.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="link-row">
            {site.home.links.map((l) => (
              <ArrowLink key={l.href} href={l.href}>
                {l.label}
              </ArrowLink>
            ))}
          </p>
        </div>
        <Annotation>{site.home.annotation}</Annotation>
      </section>

      <section className="notes-section" aria-labelledby="notes-heading">
        <div className="section-head">
          <h2 id="notes-heading" className="eyebrow">
            {site.home.notesLabel}
          </h2>
          <ArrowLink href="/writing">all writing</ArrowLink>
        </div>
        <NotesBrowser
          notes={notes}
          mode="local"
          size="compact"
          headingLevel="h3"
          backLink={{ label: "All writing", href: "/writing" }}
        />
      </section>

      <section className="currently" aria-labelledby="currently-heading">
        <h2 id="currently-heading" className="currently__heading">
          {site.currently.heading}
        </h2>
        <p>{site.currently.text}</p>
      </section>
    </>
  );
}
