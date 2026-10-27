# Seestack website

The official website for **Seestack**: real AI workflows, developer tools, and
automation, demonstrated through working systems.

Live domain: <https://www.seestack.dev>

A static Next.js site: a landing page, three topic explainers, and a subscribe
funnel. No CMS, no database, no auth, no analytics.

---

## Stack

| Piece      | Choice                  | Why |
| ---------- | ----------------------- | --- |
| Framework  | Next.js 16 (App Router) | File conventions give `robots.txt`, `sitemap.xml`, favicon, and social images with no extra dependencies |
| Language   | TypeScript (strict)     | The build fails on a wrong prop or a missing field |
| Styling    | Tailwind CSS 4          | Design tokens live in `@theme` in one file |
| Fonts      | Geist Sans + Geist Mono | Self-hosted through `next/font`, so no request leaves the origin |
| Deployment | Vercel                  | No config file, no build step to maintain |

Runtime dependencies are `next`, `react`, and `react-dom`. Nothing else.

Requires **Node.js 20.9+** (developed on 22.x).

---

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

### All scripts

| Command             | Does |
| ------------------- | ---- |
| `npm run dev`       | Dev server with hot reload |
| `npm run build`     | Production build (also type-checks) |
| `npm run start`     | Serve the production build locally |
| `npm run lint`      | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

Before pushing, the full check is:

```bash
npm run lint && npm run typecheck && npm run build
```

There is no test suite. The site has no logic worth unit-testing; correctness is
covered by the type checker and the production build.

---

## Project structure

```
app/
  layout.tsx              Metadata, fonts, skip link, page shell
  page.tsx                Home: sections in order
  globals.css             Design tokens, base styles, component classes
  context/page.tsx        /context   AI context & memory explainer
  workflows/page.tsx      /workflows Claude Code workflows explainer
  obsidian/page.tsx       /obsidian  Obsidian second brain explainer
  docs/page.tsx           /docs      Documentation index
  docs/[slug]/page.tsx    /docs/*    One guide per entry in content/docs
  setup/page.tsx          Subscribe funnel
  mods/page.tsx           Subscribe funnel
  api/subscribe/route.ts  Email provider handoff
  icon.svg                Favicon
  opengraph-image.tsx     Social card (1200x630, generated at build time)
  twitter-image.tsx       Same image, served for twitter:image
  robots.ts               robots.txt
  sitemap.ts              sitemap.xml

components/
  ui/                     Primitives with no page knowledge
    action-link.tsx       Anchor that handles external target/rel
    icons.tsx             Play, arrow, external, GitHub
    wordmark.tsx          Mark + name
    reveal.tsx            Scroll fade-up wrapper (the one client primitive)
    subscribe-form.tsx    Compact email capture (used on the explore pages)
    lite-youtube.tsx      Click-to-play YouTube facade
  layout/                 Site chrome
    site-header.tsx
    mobile-nav.tsx        The < md disclosure menu
    site-footer.tsx
  sections/               Home page sections, one file each
    hero.tsx              Headline, CTAs, hero carousel
    hero-showcase.tsx     The carousel itself
    featured-system.tsx   Featured video + open-source vault
    video-rail.tsx        Playlist rails
    systems-library.tsx   The three system cards
    method.tsx            Problem, Working System, Reusable Components
    about.tsx
    setup-funnel.tsx      Subscribe form and script delivery
  topic/                  The explainer page system
    topic-page.tsx        Layout, shared by the three routes
    figures.tsx           The visuals a topic page can show
  docs/                   The documentation system
    doc-layout.tsx        Sidebar, article, prev/next, section list
    doc-content.tsx       Renders the blocks inside a guide

content/                  Editable copy and configuration, no JSX
  site.ts                 Brand metadata and primary nav
  links.ts                Social, contact, repo, legal
  featured.ts             Featured video + YouTube URL helpers
  email.ts                Email provider config
  playlists.ts            Channel playlists shown in the rails
  topics/
    types.ts              Shape of an explainer page
    context.ts
    workflows.ts
    obsidian.ts
  docs/
    types.ts              Shape of a guide
    index.ts              Reading order, plus lookup helpers
    vault.ts
    symlinks.ts
    memory.ts
    cli.ts
    permissions.ts

lib/
  subscribe.ts            The one caller of /api/subscribe
  og-image.tsx            Shared social-card renderer

archive/                  Unused components kept for reference, not built
```

### How the pieces connect

`app/` composes, `components/` renders, `content/` holds the words. A page file
should be metadata plus a component call; if copy starts growing in a route
file, it belongs in `content/`.

The three explainer routes are the same component: `/context`, `/workflows` and
`/obsidian` differ only by the `TopicContent` object they pass to `TopicPage`.
To add a fourth topic, add `content/topics/<name>.ts` and a route that renders
`<TopicPage content={...} />`.

Each topic also carries a `visuals` array. Every entry becomes its own section,
text on one side and the figure on the other, alternating down the page. The
figure is chosen by `kind` in `components/topic/figures.tsx`, so a content file
never imports a component. Screenshots live in `public/media` and are referenced
by path, which means replacing one is a file swap.

The hero of each topic also shows a staggered column of the page's first three
visuals plus its last one (`components/topic/visual-collage.tsx`). The tiles are
rendered figures, not thumbnails, so they keep their real layout, and each one
links to the section it previews (`#visual-<index>`).

The docs section is the same idea one level simpler. Each guide in
`content/docs/` is a `DocPage`: a title, a lead, and a list of sections made of
`paragraphs`, `list`, `steps`, `code` and `note` blocks. Inline code is written
with backticks and parsed by `doc-content.tsx`. The order in
`content/docs/index.ts` is the sidebar order, the prev/next chain and the order
of the sitemap entries, so adding a guide is one content file plus one line in
that array.

---

## Content configuration

Nothing that changes day to day requires touching a component.

### Featured video, links, signup

| File              | Holds |
| ----------------- | ----- |
| `content/featured.ts` | `youtubeId`, title, description, and the YouTube URL helpers |
| `content/links.ts`    | Social profiles, repo, contact email, privacy |
| `content/email.ts`    | Email provider endpoint and field name |
| `content/site.ts`     | Site name, URL, description, primary nav |

All of it ships to the browser, so **never put API keys, tokens, or anything
private in this folder.**

### Publish the featured video

Set `youtubeId` to the `v=` parameter of the watch URL:

```ts
export const featuredVideo: FeaturedVideo = {
  youtubeId: "dQw4w9WgXcQ",     // from youtube.com/watch?v=dQw4w9WgXcQ
  title: "The first Seestack breakdown",
  description: "…",
};
```

While `youtubeId` is `null`, the section renders a styled placeholder and the
"Watch on YouTube" button is shown as unavailable. Set it, and the placeholder
is replaced by a real facade that loads `youtube-nocookie.com` only on click.

The player appears once, in the featured system section on the home page. The
three explainer pages link to the video ("Watch the build" in the hero, "Watch
the full setup" at the end) instead of embedding a second copy, so a reader who
has already seen it is not shown the same poster again.

### Social, contact, and legal links

Any entry left as `null` renders in the footer as a muted label with a `SOON`
tag rather than a link to nowhere. Fill one in and it becomes a real link.

### Playlists

`content/playlists.ts` holds the three rails. Each item is a video ID, a title,
a `kind` (`short` renders portrait, `video` renders landscape), and a date. A
playlist can also carry an `explore` link to an on-site explainer, which is what
puts the second pill in the rail header.

### Email signup

There are two captures, both going through `lib/subscribe.ts`:

- the explore pages (`/context`, `/workflows`, `/obsidian`), one field and a
  button in each hero (`components/ui/subscribe-form.tsx`)
- the setup funnel (`components/sections/setup-funnel.tsx`), name and email,
  which reveals the install commands after submitting

Each submission is tagged with the form that sent it (`explore`, `funnel`), so
the provider can tell the two apart. The form posts to the provider's hosted
endpoint through `app/api/subscribe/route.ts`. While `formAction` is `null` in
`content/email.ts` nothing is forwarded. The explore form reports a failed send
instead of pretending it worked; the funnel still shows the commands, because
the script is the reward for finishing the form.

---

## Design

Tokens are defined once, in the `@theme` block at the top of
`app/globals.css`. Change them there and the whole site follows.

| Token             | Value     | Role |
| ----------------- | --------- | ---- |
| `--color-ink`     | `#08090c` | Page background |
| `--color-panel`   | `#0f121a` | Cards and raised surfaces |
| `--color-hair`    | `#1d222c` | Hairlines inside panels |
| `--color-hair-hi` | `#2a3140` | Section edges and hover borders |
| `--color-cream`   | `#f4f6f9` | Primary type |
| `--color-cream-dim` | `#b3bac6` | Body copy |
| `--color-muted`   | `#838b98` | Labels and metadata |
| `--color-accent`  | `#6f5cf5` | Indigo, reserved for actions and one highlighted phrase |

Four conventions worth knowing before editing the CSS:

1. **Component classes live in `@layer components`.** Tailwind declares the
   `utilities` layer after `components`, so a utility at the call site
   (`hidden`, `text-accent`, `disabled:bg-transparent`) still wins. Unlayered
   rules would silently beat every utility.
2. **Section edges use `.section-edge` / `.section-edge-bottom`,** a background
   hairline that fades out at both ends, rather than a border. Flat full-bleed
   borders make a long page read as a stack of boxes.
3. **Horizontal rails fade at the edge instead of clipping.** Each rail carries
   a gradient overlay on both sides and shows one only while cards remain hidden
   in that direction, so the last card never ends in a hard cut.
4. **Inline icons carry `width` and `height` attributes** as well as classes, so
   they keep their size on the first paint instead of rendering at the SVG
   default before the stylesheet lands.

Motion is decorative throughout and is removed wholesale under
`prefers-reduced-motion: reduce`.

---

## Deployment

Vercel auto-detects Next.js; no `vercel.json` and no build configuration are
needed.

### First deploy

1. Import the repo at [vercel.com/new](https://vercel.com/new).
2. Accept the detected defaults (build `next build`, output `.next`).
3. Deploy.

Or from the command line:

```bash
npx vercel login
npx vercel --prod
```

### Domain

Add `www.seestack.dev` in **Project → Settings → Domains** and point the DNS
record at Vercel. Set `seestack.dev` to redirect to `www.seestack.dev`, since
`https://www.seestack.dev` is the canonical URL declared in the metadata.

If the canonical host ever changes, update `site.url` in `content/site.ts`. The
canonical tag, Open Graph URL, `robots.txt`, and `sitemap.xml` all read from it.

### Environment variables

None. The project requires no environment variables and commits no secrets.
`.env*` files are gitignored.

Every push to `main` deploys to production; other branches get preview URLs.

---

## Scope

Deliberately **not** in this repo: CMS, authentication, blog engine, dashboard,
payments, or analytics. Copy for future sections lives in `archive/landing-copy.md`
as a draft, and unused components sit in `archive/` rather than the build.

If Seestack ships tools later, they get their own repos and are linked from
here.
