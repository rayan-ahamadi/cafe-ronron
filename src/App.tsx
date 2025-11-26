import Hero from '@components/Hero';
import Menu from '@components/Menu';
import Cats from '@components/Cats';
import ContactFooter from '@components/ContactFooter';
import { useEffect, useLayoutEffect } from 'react';
import { useAnimationStore } from './AnimationStore';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';


function App() {
  const { loadingHasAnimated } = useAnimationStore();
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.clearScrollMemory("manual");

  useEffect(() => {
    console.log("loadingHasAnimated in App:", loadingHasAnimated);
    if (!loadingHasAnimated) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      // Restaure le scroll vertical une fois l'animation de chargement terminée
      document.documentElement.style.overflowY = 'auto';
    }
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
