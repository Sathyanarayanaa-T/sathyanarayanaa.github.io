import { Hero } from "@/components/Hero";
import { WorkGallery } from "@/components/WorkGallery";

import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CursorLogicTrail } from "@/components/CursorLogicTrail";
import { CodeBackground } from "@/components/CodeBackground";

export default function Home() {
  return (
    <SmoothScroll>
      <CodeBackground />
      <CursorLogicTrail />
      <main className="relative z-10 min-h-screen">
        <Hero />
        <WorkGallery />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
