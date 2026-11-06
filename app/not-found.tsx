import { ArrowLink } from "@/components/ArrowLink";

export default function NotFound() {
  return (
    <div className="text-page">
      <h1 className="page-title">Nothing here.</h1>
      <p className="text-page__lede">This page doesn&rsquo;t exist, or it moved.</p>
      <p className="link-row">
        <ArrowLink href="/" direction="back">
          back home
        </ArrowLink>
        <ArrowLink href="/writing">all writing</ArrowLink>
      </p>
    </div>
  );
}
