import type { Metadata } from "next";
import { TopicPage } from "@/components/topic/topic-page";
import { obsidianTopic } from "@/content/topics/obsidian";

export const metadata: Metadata = {
  title: "Obsidian Second Brain: What It Is and How It's Structured",
  description:
    "A second brain is a vault, not an app: one inbox, a daily note that processes it, links that keep notes reachable, and a short list of entry points back in.",
  alternates: { canonical: "/obsidian" },
};

export default function ObsidianPage() {
  return <TopicPage content={obsidianTopic} />;
}
