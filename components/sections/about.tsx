import { Reveal } from "../ui/reveal";

export function About() {
  return (
    <section id="about" className="section-edge">
      <div className="container-page py-20 sm:py-28">
        <Reveal className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="eyebrow">About</p>
            <h2 className="text-cream mt-4 text-3xl font-semibold tracking-[-0.015em] sm:text-4xl">
              About Seestack.
            </h2>
            <p className="text-accent mt-2 font-mono text-xs uppercase tracking-wider">
              Engineering Lab · Developer Tooling Studio
            </p>
          </div>

          <div className="text-cream-dim max-w-2xl space-y-5 leading-relaxed lg:pt-1">
            <p>
              Seestack is an independent engineering lab and developer tooling
              studio focused on autonomous coding agents, persistent memory
              architectures, and verifiable terminal workflows.
            </p>
            <p>
              The systems come out of real production engineering work and the
              AI tooling used to ship code day to day, running live on actual
              projects with the rough edges left visible.
            </p>
            <p>
              The editorial rule is strict: if a workflow or tool has not been
              built, run, and battle-tested in a live terminal, it does not get
              published here. Zero wrappers, plain markdown, verifiable runs.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
