# Seestack landing copy — working draft

Purpose: replacement copy for `app/page.tsx` and its sections, in the order the page should
read. Edit here first; implement after the copy is settled.

Numbering rule: every `[N]` is a real number you must measure and fill in. No invented
figures — the page's whole problem is that nothing is checkable.

---

## 1. Hero (`components/hero.tsx`)

**Eyebrow**

> AI workflows · Developer tools · Automation

Unchanged. It works.

**H1**

> Your Claude Code setup forgets your project every session.

Alternative if you want to keep the "system" framing:

> The Claude Code setup that remembers.

**Sub**

> Claude reads an Obsidian vault as its own memory — skills, commands, journal, all plain
> markdown. MIT licensed, one command to clone.

**Primary CTA**

> Get the vault — free

(→ `links.repo`. Currently the primary button goes to `/setup`, an email gate, while the
vault is ungated two sections down. Lead with the free artifact; gate the extras later.)

**Secondary CTA**

> Watch the 8-minute build

(→ featured video. Change the duration to the real one.)

**Proof strip** — one line of monospace under the buttons

> [N] files · [N] skills · [N] commands · stock Claude Code, no plugins

**Hero visual** — replace `SystemDiagram`'s abstract marquee with a real terminal pane:
a fresh session, `/context` called, memory already loaded. Fifteen seconds of video or a
static screenshot. This is the single most valuable asset on the page.

---

## 2. Vault (`components/featured-system.tsx`)

**Eyebrow**

> Featured system

**H2**

> What's inside the vault

**Body**

> An Obsidian vault that Claude Code reads as its own memory. Instructions, skills, commands
> and daily-journal notes live as markdown files, symlinked into the agent's config so they
> load before the first message. Nothing to install. Nothing to run on the model's side.

**Inside the vault** — a short list, each line countable

- `CLAUDE.md` — global rules and execution policy
- `skills/` — [N] skills, each a folder with a `SKILL.md`
- `commands/` — [N] slash commands
- `scripts/` — daily journal, session logging, vault checks
- `mods/` — context bar, read-aloud
- `Journal/` — daily notes wired into the memory path

**CTAs**

> Star & clone on GitHub (primary)
> Watch the build (secondary)

Keep the MIT and open-source badges. Drop the "Explore Channel" button; it competes for
attention with no payoff here.

---

## 3. Tracks (`components/systems-library.tsx`)

Retitle from your taxonomy to the visitor's jobs. One shipped artifact under each card;
no artifact means no card.

**H2**

> Three things every setup needs to do

**03 — Automate**

> Pipelines that run while you're not watching: capture, process, publish, monitor. The
> error handling that decides whether it's safe to leave alone.

Covers: `scheduling` · `failure handling` · `observability`

Shipped: daily journal automation, job-search mail pipeline.

---

## 4. Comparison (`new section`)

The block Better Stack builds its credibility on. No competitor named, just two ways of
working.

**H2**

> Every session, with and without memory

| | Fresh Claude Code | With the vault |
| --- | --- | --- |
| Session start | Re-explain the project | Loads from disk |
| Rules | Pasted again, drift | One `CLAUDE.md`, versioned |
| History | Gone on restart | Journaled daily |
| Setup | — | One clone |

Keep the table to four rows. Footnote the honest part: the vault costs disk and a
five-minute clone; it doesn't make the model smarter, it stops it starting from zero.

---

## 5. StackMCP (`new section`)

Your paid product is absent from the site. It should be the last commercial step, not the
free vault.

**H2**

> Same setup, one command

**Body**

> Everything on this page, packaged: `npm install -g stackmcp`, then run the workflow.
> Same files, same markdown, no manual wiring.

**CTA**

> [Price] — get StackMCP

(Only ship this section once there's a price and a working install. Until then, omit it
entirely rather than showing a placeholder.)

---

## 6. 1-on-1 (`components/about.tsx` session panel)

Add a price and three outcomes, or remove it from the header. A paid offer with no visible
price reads as "sales call" and cheapens everything above it.

**H3**

> AI agent & workflow architecture audit — 60 minutes, [price]

**What you leave with**

- Your vault laid out for your actual projects
- A memory path that survives a Claude Code update
- One automation wired and running before the call ends

**CTA**

> Book a session — [price]

---

## 7. Subscribe (`components/setup-funnel.tsx`)

The current panel promises that signing up "unlocks ... and Obsidian vault instantly,"
which contradicts the MIT claim two sections earlier. Gate the extras, not the vault.

**Eyebrow**

> Free extras

**H2**

> Get the setup script and the mods

**Body**

> The one-line installer, the context-bar mod, and the read-aloud mod. The vault itself is
> on GitHub and stays free — this is just the shortcut.

**Button**

> Send me the script

(Keep "unsubscribe anytime". Drop the padlock emoji; it's the least credible thing on the
page.)

---

## 8. FAQ (`new section`)

Four questions, answered plainly. This is where "demonstration over commentary" earns trust
because it's willing to name limits.

- Does it break when Claude Code updates?
- Does it work in Cursor or Codex, or only Claude Code?
- Is it really free?
- How long does setup take?

---

## 9. Method and About

**Method: cut the section.** Keep the line "Demonstration over commentary." as a single
full-width statement between the comparison table and the tracks.

**About: compress to a two-line band above the footer.**

> Independent engineering lab. Everything here is built, run, and tested in a live terminal
> before it's published.

---

## 10. Footer

- "Privacy [soon]" is intentional — leave it.
- Add a GitHub star count and a YouTube subscriber count next to the wordmark once both are
  worth showing.
- Keep the four-column layout.

---

## Numbers to measure before shipping

1. Files, skills, commands in the vault — count from the repo.
2. `/context` token load at session start, before and after.
3. Minutes to clone and get a first working session.
4. Weekly hours the daily-journal and mail automations replace.
5. Subscribers and stars, once non-trivial.

Pick the one that sounds most like "$56,774 versus $687" and put it above the fold. The rest
go in the proof strip and the table.

---

## Structural changes this implies

New sections: comparison table, StackMCP, FAQ.
Removed: Method.
Rewritten: Hero, Vault, Tracks, Subscribe.
Edited: session panel, footer.

Hero, Vault, Tracks and Subscribe are existing files and can be rewritten in place. The three
new sections are additive. Nothing else on the page needs to move.
