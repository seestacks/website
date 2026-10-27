import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/**
 * Shared social card, rendered at build time by Satori and reused by both
 * `app/opengraph-image.tsx` and `app/twitter-image.tsx`.
 *
 * Satori supports a subset of CSS: keep to flexbox, absolute positioning, and
 * solid colours. Every element with more than one child needs an explicit
 * `display: flex`.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = `${site.name}: ${site.tagline}`;

const INK = "#0a0c10";
const HAIR = "#1f2633";
const CREAM = "#f1ede5";
const CREAM_DIM = "#cbc6bd";
const ACCENT = "#34ddf5";

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          padding: 72,
          position: "relative",
        }}
      >
        {/* Fine grid, drawn as individual rules because Satori has no
            repeating background support. */}
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={`v${i}`}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: i * 150,
              width: 1,
              background: HAIR,
            }}
          />
        ))}
        {[1, 2, 3].map((i) => (
          <div
            key={`h${i}`}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: i * 157,
              height: 1,
              background: HAIR,
            }}
          />
        ))}

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 7,
            }}
          >
            <div style={{ width: 34, height: 9, borderRadius: 5, background: ACCENT }} />
            <div
              style={{ width: 40, height: 9, borderRadius: 5, background: CREAM, opacity: 0.72 }}
            />
            <div
              style={{ width: 46, height: 9, borderRadius: 5, background: CREAM, opacity: 0.38 }}
            />
          </div>
          <div style={{ color: CREAM, fontSize: 38, fontWeight: 600, letterSpacing: -0.5 }}>
            Seestack
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: CREAM,
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            See how the system actually works.
          </div>
          <div
            style={{
              color: CREAM_DIM,
              fontSize: 30,
              marginTop: 26,
              maxWidth: 860,
              lineHeight: 1.4,
            }}
          >
            Real AI workflows, developer tools, and automation, demonstrated
            through working systems.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${HAIR}`,
            paddingTop: 26,
          }}
        >
          <div style={{ color: ACCENT, fontSize: 24 }}>www.seestack.dev</div>
          <div style={{ color: CREAM_DIM, fontSize: 24 }}>{`Built by ${site.author}`}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
