import { Metadata } from "next";
import { SetupFunnel } from "@/components/sections/setup-funnel";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Get Claude Code Mods & Tools | See Stack",
  description:
    "Unlock the one-line install command, context-bar mod, and Obsidian starter vault.",
};

export default function ModsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1 min-h-[75vh] flex items-center justify-center">
        <SetupFunnel id="mods-page" />
      </main>
      <SiteFooter />
    </>
  );
}
