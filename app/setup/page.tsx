import { Metadata } from "next";
import { SetupFunnel } from "@/components/sections/setup-funnel";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Get Claude Code Setup Commands & Custom Mods | See Stack",
  description:
    "Enter your details to receive the one-line setup command, context-bar mod, and Obsidian memory vault instantly.",
};

export default function SetupPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 min-h-[75vh] flex items-center justify-center">
        <SetupFunnel id="setup-page" />
      </main>
      <SiteFooter />
    </>
  );
}
