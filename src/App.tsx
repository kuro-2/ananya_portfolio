import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";
import { BackToTop } from "./components/BackToTop";
import { LightboxProvider } from "./components/ImageLightbox";
import { Loader } from "./components/Loader";
import { Navigation } from "./components/Navigation";
import { ScrollProgress } from "./components/ScrollProgress";
import { getLenis, setLenis } from "./lib/scroll";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";
import { Hero } from "./sections/Hero";
import { Logofolio } from "./sections/Logofolio";
import { Packaging } from "./sections/Packaging";
import { Posters } from "./sections/Posters";
import { PrintMedia } from "./sections/PrintMedia";
import { SocialMedia } from "./sections/SocialMedia";
import { TableOfContents } from "./sections/TableOfContents";
import { Typography } from "./sections/Typography";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    setLenis(lenis);
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // honour deep links such as /#posters once the intro has finished
  useEffect(() => {
    if (!ready || !location.hash) return;
    const el = document.getElementById(location.hash.slice(1));
    if (el) setTimeout(() => el.scrollIntoView(), 50);
  }, [ready]);

  const onLightbox = useCallback((open: boolean) => {
    const l = getLenis();
    if (!l) return;
    if (open) l.stop();
    else l.start();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <LightboxProvider onToggle={onLightbox}>
        <Loader onDone={() => setReady(true)} />
        <ScrollProgress />
        <a className="skip" href="#about">Skip to content</a>
        <Navigation />
        <main className="pages">
          <Hero ready={ready} />
          <About />
          <TableOfContents />
          <Typography />
          <Logofolio />
          <SocialMedia />
          <Posters />
          <PrintMedia />
          <Packaging />
          <Contact />
        </main>
        <BackToTop />
      </LightboxProvider>
    </MotionConfig>
  );
}
