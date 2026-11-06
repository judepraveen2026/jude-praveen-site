import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllNotes, getNote } from "@/lib/notes";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: note.title,
    description: note.preview || undefined,
    openGraph: { title: note.title, description: note.preview || undefined, type: "article" },
  };
}

// The selected note is rendered by the Notes browser in app/writing/layout.tsx,
// which reads the slug from the URL. This page only validates it and sets metadata.
export default async function NotePage({ params }: Params) {
  const { slug } = await params;
  if (!getNote(slug)) notFound();
  return null;
}
