import { About } from "@/components/sections/about";
import { SetupFunnel } from "@/components/sections/setup-funnel";
import { FeaturedSystem } from "@/components/sections/featured-system";
import { Hero } from "@/components/sections/hero";
import { Method } from "@/components/sections/method";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SystemsLibrary } from "@/components/sections/systems-library";
import { VideoRails } from "@/components/sections/video-rail";
import { playlists } from "@/content/playlists";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <FeaturedSystem />
        <VideoRails playlists={playlists} />
        <SystemsLibrary />
        <Method />
        <About />
        <SetupFunnel id="subscribe" />
      </main>
      <SiteFooter />
    </>
  );
}
