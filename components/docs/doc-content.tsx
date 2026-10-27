import type { DocBlock, DocSection } from "@/content/docs/types";

/**
 * Renders `text` with inline code marked by backticks. Docs are mostly prose
 * with a command in every other sentence, and a small parser here keeps the
 * content files readable instead of splitting every line into spans.
 */
function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, index) =>
        index % 2 === 1 ? (
          <code
            key={index}
            className="bg-panel text-cream rounded px-1.5 py-0.5 font-mono text-[0.8125em]"
          >
            {part}
          </code>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

function CodeBlock({ label, content }: { label?: string; content: string }) {
  return (
    <figure className="border-hair bg-ink-raised overflow-hidden rounded-lg border">
      {label && (
        <figcaption className="border-hair text-muted border-b px-4 py-2 font-mono text-[0.6875rem] tracking-[0.08em]">
          {label}
        </figcaption>
      )}
      <pre className="text-cream-dim overflow-x-auto px-4 py-4 font-mono text-[0.8125rem] leading-relaxed">
        <code>{content}</code>
      </pre>
    </figure>
  );
}

function Block({ block }: { block: DocBlock }) {
  switch (block.kind) {
    case "paragraphs":
      return (
        <>
          {block.items.map((item) => (
            <p key={item} className="text-cream-dim leading-relaxed">
              <Inline text={item} />
            </p>
          ))}
        </>
      );

    case "list":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="text-cream-dim flex gap-3 leading-relaxed">
              <span
                aria-hidden="true"
                className="bg-accent mt-2.5 h-1 w-1 shrink-0 rounded-full"
              />
              <span>
                <Inline text={item} />
              </span>
            </li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <ol className="space-y-6">
          {block.items.map((item, index) => (
            <li key={item.title} className="flex gap-4">
              <span className="text-accent mt-0.5 shrink-0 font-mono text-xs">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-cream text-[0.9375rem] font-medium">
                  <Inline text={item.title} />
                </p>
                {item.body && (
                  <p className="text-cream-dim mt-1 text-[0.9375rem] leading-relaxed">
                    <Inline text={item.body} />
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      );

    case "code":
      return <CodeBlock label={block.label} content={block.content} />;

    case "note":
      return (
        <div className="border-accent/60 bg-accent/5 border-l-2 px-4 py-3.5">
          <p className="text-cream text-sm font-medium">{block.title}</p>
          <p className="text-cream-dim mt-1.5 text-sm leading-relaxed">
            <Inline text={block.body} />
          </p>
        </div>
      );
  }
}

export function DocContent({ sections }: { sections: DocSection[] }) {
  return (
    <div className="mt-12 space-y-12">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-28">
          <h2 className="text-cream text-2xl font-semibold tracking-[-0.01em]">
            {section.heading}
          </h2>
          <div className="mt-4 space-y-4">
            {section.blocks.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
