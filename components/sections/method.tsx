const steps = [
  {
    index: "01",
    title: "Problem",
    description:
      "Start from friction that costs real time in real work: a step repeated too often, a handoff that keeps breaking, a task that never quite finishes. The problem is stated concretely before anything gets built.",
  },
  {
    index: "02",
    title: "Working System",
    description:
      "Build it on screen until it runs. Config, code, and wiring in full, with the dead ends and the errors left in, because the recovery is usually the part worth watching.",
  },
  {
    index: "03",
    title: "Reusable Components",
    description:
      "Separate the parts that transfer from the parts that were specific to the example: the script, the config, the prompt, the structure. Then they can be lifted into a different setup.",
  },
];

import { Reveal } from "../ui/reveal";

export function Method() {
  return (
    <section id="method" className="section-edge">
      <div className="container-page py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow">Method</p>
          <h2 className="text-cream mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.015em] sm:text-4xl">
            Demonstration over commentary.
          </h2>
          <p className="text-cream-dim mt-4 max-w-2xl leading-relaxed">
            Predictions about AI are cheap. A system either runs or it does not,
            so every breakdown follows the same three steps and ends with
            something that works.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ol className="panel divide-hair mt-12 grid divide-y overflow-hidden md:grid-cols-3 md:divide-x md:divide-y-0">
          {steps.map((step) => (
            <li key={step.index} className="p-6 sm:p-8">
              <div className="flex items-baseline gap-3">
                <span className="text-accent font-mono text-sm">{step.index}</span>
                <h3 className="text-cream text-xl font-semibold tracking-[-0.01em]">
                  {step.title}
                </h3>
              </div>
              <p className="text-cream-dim mt-4 text-[0.9375rem] leading-relaxed">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
        </Reveal>
      </div>
    </section>
  );
}
