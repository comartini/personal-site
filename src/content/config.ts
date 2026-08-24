import { defineCollection, z } from 'astro:content';

// -- Singleton "pages" (one entry each) ------------------------------------

const home = defineCollection({
  type: 'content',
  schema: z.object({
    kicker: z.string(),
    name: z.string(),
  }),
});

const about = defineCollection({
  type: 'content',
  schema: z.object({
    kicker: z.string(),
    photo: z.string(),
    photoAlt: z.string(),
  }),
});

const teaching = defineCollection({
  type: 'content',
  schema: z.object({
    kicker: z.string(),
    title: z.string(),
  }),
});

const site = defineCollection({
  type: 'content',
  schema: z.object({
    email: z.string(),
    phone: z.string().optional(),
    socialLabel: z.string().optional(),
    socialHref: z.string().optional(),
    copyrightName: z.string(),
  }),
});

// -- Repeatable list collections -------------------------------------------

// Home page's four pillar cards (Academic / Teaching / Editorial / Fiction)
const homePillars = defineCollection({
  type: 'content',
  schema: z.object({
    label: z.string(),
    href: z.string(),
    order: z.number(),
  }),
});

// A short italic note in the "Currently" section of the home page
const homeCurrently = defineCollection({
  type: 'content',
  schema: z.object({
    kicker: z.string(),
  }),
});

// Academic hub entries — each is a card on /academic. Internal ones point to
// a page on this site (e.g. /academic/dissertation); external ones link out.
const academicHub = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    href: z.string(),
    external: z.boolean().default(false),
    order: z.number(),
  }),
});

// Full article pages that live under /academic/ (currently just the
// dissertation/book project). Referenced from academicHub by matching href.
const academicPages = defineCollection({
  type: 'content',
  schema: z.object({
    kicker: z.string(),
    title: z.string(),
    dek: z.string(),
    pullQuote: z.string(),
    closing: z.string(),
  }),
});

// Entries on the Public Scholarship page (/academic/public-scholarship).
// Add a new file here any time — no code changes needed.
const publicScholarship = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    venue: z.string(),
    href: z.string(),
    order: z.number(),
    placeholder: z.boolean().default(false),
  }),
});

// Editorial hub entries (/editorial) — external links only, no subpages.
const editorial = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    href: z.string(),
    order: z.number(),
  }),
});

// Fiction entries — each file is BOTH a card on /fiction AND its own page
// at /fiction/<slug>. Add a new file here to add a new book, no code needed.
const fiction = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    cardDescription: z.string(), // one-liner shown on the /fiction hub card
    dek: z.string(),             // subtitle shown on the book's own page
    pullQuote: z.string(),
    status: z.string(),          // e.g. "Pale Red Dot is complete."
    placeholder: z.boolean().default(false),
    order: z.number(),
  }),
});

// Courses listed on /teaching. syllabusUrl is optional — leave it blank
// until the PDF is hosted somewhere, and the title just won't be a link.
const teachingCourses = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    syllabusUrl: z.string().optional().default(''),
    order: z.number(),
  }),
});

export const collections = {
  home,
  about,
  teaching,
  site,
  homePillars,
  homeCurrently,
  academicHub,
  academicPages,
  publicScholarship,
  editorial,
  fiction,
  teachingCourses,
};
