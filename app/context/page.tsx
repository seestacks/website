import type { Metadata } from "next";
import { TopicPage } from "@/components/topic/topic-page";
import { contextTopic } from "@/content/topics/context";

export const metadata: Metadata = {
  title: "AI Context & Memory: What It Is and How It's Structured",
  description:
    "A memory system for a coding agent is a file layout: rules that always load, an index that stays short, material read on demand, and notes that outlive the session.",
  alternates: { canonical: "/context" },
};

export default function ContextPage() {
  return <TopicPage content={contextTopic} />;
}
