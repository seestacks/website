const systems = [
  {
    /** The "Tools" nav link points here. */
    id: undefined,
    index: "01",
    title: "AI Workflows",
    description:
      "How an agent setup is arranged so it holds context across a real project: where instructions live, what the model is allowed to see, and how the whole thing is recovered after a restart.",
    covers: ["context layout", "instruction files", "review loops"],
  },
  {
    id: "tools",
    index: "02",
    title: "Developer Tooling",
    description:
      "The small tools that remove friction: command-line utilities, editor integrations, MCP servers, and scripts. Built on screen, with the reasoning behind each design decision left in.",
    covers: ["cli design", "mcp servers", "editor integration"],
  },
  {
    id: undefined,
    index: "03",
    title: "Automation Systems",
    description:
      "Pipelines meant to run unattended: capture, processing, publishing, monitoring. Wired end to end, including the error handling that decides whether they are safe to leave alone.",
    covers: ["scheduling", "failure handling", "observability"],
  },
];

import { Reveal } from "../ui/reveal";

export function SystemsLibrary() {
  return (
    <section id="systems" className="section-edge">
      <div className="container-page py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow">Systems library</p>
          <h2 className="text-cream mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.015em] sm:text-4xl">
            Three tracks, one standard: it has to run.
          </h2>
          <p className="text-cream-dim mt-4 max-w-2xl leading-relaxed">
            Each track covers a different layer of the same stack. Here is what
            each one will walk through.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {systems.map((system) => (
            <li
              key={system.title}
              id={system.id}
              className="panel hover:border-hair-hi flex scroll-mt-28 flex-col p-6 transition-colors sm:p-7"
            >
              <span className="eyebrow text-accent">{system.index}</span>
              <h3 className="text-cream mt-4 text-xl font-semibold tracking-[-0.01em]">
                {system.title}
              </h3>
              <p className="text-cream-dim mt-3 flex-1 text-[0.9375rem] leading-relaxed">
                {system.description}
              </p>
              <ul className="border-hair mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t pt-5">
                {system.covers.map((item) => (
                  <li key={item} className="text-muted font-mono text-xs">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        </Reveal>
      </div>
    </section>
  );
}
