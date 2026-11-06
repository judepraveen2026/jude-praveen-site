/**
 * Site-wide placeholder copy.
 *
 * Everything you'll want to rewrite (intro, "Currently", footer details)
 * lives in this one file, so you never have to dig through components.
 * The About page is its own file: content/about.md.
 * Paragraph arrays render as separate <p> elements.
 */

export const site = {
  name: "jude praveen",
  fullName: "Jude Praveen",
  description:
    "A personal site for writing, projects and whatever else I'm figuring out.",
  location: "West Lafayette, IN & Dallas, TX",
  /** Used for the "Say hello" link in the footer. Leave empty ("") to hide it. */
  email: "judepraveen2026@gmail.com",

  /** Optional absolute URL for metadata (e.g. "https://judepraveen.com"). */
  url: "",

  nav: [
    { label: "about", href: "/about" },
    { label: "writing", href: "/writing" },
    { label: "projects", href: "/projects" },
  ],

  home: {
    heading: "A little bit of everything.",
    // Placeholder — rewrite in your own words.
    intro: [
      "I'm Jude Praveen. Born in Chicago, raised in North Texas and currently in Indiana studying Integrated Business and Engineering at Purdue.",
      "This is my home base for the ideas I'm exploring, things I'm creating and questions I'm still untangling. Here, I share the experiences that have shaped me, the passions I gravitate toward and the perspective I've developed along the way. Feel free to look around and get to know me a little better.",
    ],
    annotation: "half-formed thoughts",
    links: [
      { label: "more about me", href: "/about" },
      { label: "what I'm working on", href: "/projects" },
    ],
    notesLabel: "From my notes",
    /** How many notes appear in the homepage Notes panel. */
    notesCount: 5,
  },

  currently: {
    heading: "Currently",
    // Placeholder — replace with a one-line update whenever you like.
    text: "Exploring ideas. Writing more. Building what comes next.",
  },
};

export type Site = typeof site;
