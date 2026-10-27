import type { Metadata } from "next";
import { TopicPage } from "@/components/topic/topic-page";
import { workflowsTopic } from "@/content/topics/workflows";

export const metadata: Metadata = {
  title: "Claude Code Workflows: How a Session Is Structured",
  description:
    "A Claude Code workflow is the order a session takes: read the rules, plan on disk, build in a loop, and write the result down before the tab closes.",
  alternates: { canonical: "/workflows" },
};

export default function WorkflowsPage() {
  return <TopicPage content={workflowsTopic} />;
}
