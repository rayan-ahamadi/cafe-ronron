import Hero from '@components/Hero';
import Menu from '@components/Menu';
import Cats from '@components/Cats';
import ContactFooter from '@components/ContactFooter';
import { useEffect, useLayoutEffect } from 'react';
import { useAnimationStore } from './AnimationStore';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import Lenis from 'lenis';


function App() {
  const { loadingHasAnimated } = useAnimationStore();
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.clearScrollMemory("manual");

  useEffect(() => {
    if (!loadingHasAnimated) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      return;
    }

    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // ensure ScrollTrigger recalculates positions once Lenis is running
    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [loadingHasAnimated]);


  return (
    <main className="pattern">
      {/* <LoadingSection /> */}
      {/* <section className="hero-buffer h-[500px] pointer-events-none top-0 left-0 w-full -z-10"></section> */}
      <Hero />
      <Menu />
      <Cats />
      <ContactFooter />
    </main>
  )
}

export default App
