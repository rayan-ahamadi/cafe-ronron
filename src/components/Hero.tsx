import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import SplitText from 'gsap/SplitText'
import { useAnimationStore } from '../AnimationStore';

import LogoLoading from '@assets/images/logoLoading.svg?react'
import Tasse from '@assets/images/tasse.svg?react'
import MiaouTeam from '@assets/images/miaouTeam.svg?react'
import HandWrittenText from '@assets/images/handWrittenText.svg?react'


function Hero() {
  gsap.registerPlugin(DrawSVGPlugin, MorphSVGPlugin, ScrollTrigger);
  const { setLoadingHasAnimated } = useAnimationStore();

  const tasseRef = useRef(null)
  const catGroupRef = useRef(null)
  const textRef = useRef(null)
  const sectionRef = useRef(null)
  const menuTextRef = useRef(null)

  const logoLoadingRef = useRef(null)
  const headerAddressTextRef = useRef(null)
  const headerTelTextRef = useRef(null)

  const originalSteamsID = ["steam1-1", "steam2-1", "steam3-1"]
  const duplicataSteamsID = ["steam1-2", "steam2-2", "steam3-2"]

  useGSAP(() => {

    const catGroupSelector = gsap.utils.selector(catGroupRef)
    const tasseSelector = gsap.utils.selector(tasseRef)
    const textSelector = gsap.utils.selector(textRef)

    function handWrittenAnimation() {
      const textTimeline = gsap.timeline({ defaults: { duration: 0.8, ease: "power1.out" } });
      textTimeline.fromTo(textRef.current, { autoAlpha: 0, opacity: 0 }, { autoAlpha: 1, opacity: 1 });
      const maskIds = [
        // Prenez
        "prenez-p-mask",
        "prenez-r-mask",
        "prenez-e-mask",
        "prenez-n-mask",
        "prenez-e-2-mask",
        "prenez-z-mask",
        // un
        "un-u-mask",
        "un-n-mask",
        // instant
        "instant-i-mask",
        "instant-n-mask",
        "instant-s-mask",
        "instant-t-mask1",
        "instant-a-mask",
        "instant-n-2-mask",
        "instant-t-mask",
        // ronron
        "ronron-r-mask",
        "ronron-o-mask",
        "ronron-n-mask",
        "ronron-r-2-mask",
        "ronron-o-2-mask",
        "ronron-n-2-mask"
      ];

      maskIds.forEach(id => {
        textTimeline.fromTo(
          textSelector(`#${id} path`),
          { drawSVG: "0%", stroke: "#A1A1A1" },
          { drawSVG: "100%", stroke: "#33231f", duration: 0.2 },

        );
      }
      );
      return textTimeline;
    };

    const catGroup = catGroupSelector('g')
    const coffeeShadow = tasseSelector('#coffee-shadow')
    const coffeePattern = tasseSelector('#pattern')
    // const patternPaths = coffeePattern.querySelectorAll('path')

    const loadingTimeline = gsap.timeline()
    const patternTimeline = gsap.timeline(
      {
        defaults: {
          ease: "power1.out"
        }
      }
    )

    originalSteamsID.forEach((id, index) => {
      gsap.to(`#${id}`, {
        morphSVG: `#${duplicataSteamsID[index]}`,
        repeat: -1,
        duration: 0.8,
        opacity: 0,
        yoyoEase: "linear.inOut",
        ease: "linear.inOut",
        yoyo: true
      })
    })


    const splitCafeGroup = gsap.utils.selector(logoLoadingRef)("#g41 path")
    const splitRonronGroup = gsap.utils.selector(logoLoadingRef)("#g42 path")


    loadingTimeline
      .fromTo(logoLoadingRef.current,
        {
          scale: 0,
          opacity: 0,
          top: '50%',
          left: '50%',
          xPercent: -50,
          yPercent: -50,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'back.inOut'
        },
      )
      .from(splitCafeGroup, {
        opacity: 0,
        ease: "power1.out",
        y: -20,
        stagger: 0.1
      })
      .from(splitRonronGroup, {
        opacity: 0,
        ease: "power1.out",
        y: -20,
        stagger: 0.1
      })
      .to(logoLoadingRef.current,
        {
          scale: 1,
          width: '5.5rem', // w-22
          xPercent: -50,  // translate-x-[-50%]
          yPercent: -50,  // translate-y-[-50%]
          left: '50%',    // left-1/2
          top: '3.5rem',  // top-14
          duration: 1.5,
          ease: 'power1.out'
        }
      )
      .from(sectionRef.current,
        { backgroundImage: 'none' },
        ">"
      )
      .from(headerAddressTextRef.current,
        { opacity: 0, ease: 'power1.out' },
        '<'
      )
      .from(headerTelTextRef.current,
        { opacity: 0, ease: 'power1.out' },
        '<'
      )
      .fromTo(tasseRef.current,
        {
          opacity: 0,
          y: 100,
          rotate: -100
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          rotate: 0,
          ease: "power2.out"
        },
      )
      .fromTo(coffeeShadow,
        { opacity: 0, x: 50 },
        { opacity: 0.24, x: 0, duration: 0.5, ease: "power1.out" },
        '-=0.5'
      )
      .fromTo(catGroup,
        { opacity: 0, y: "100%", x: 0 },
        { opacity: 1, y: "5%", x: 0, stagger: 0.3, duration: 0.4, ease: "power1.in", },
      )

    // Animation du motif de café
    patternTimeline
      .fromTo(coffeePattern,
        { rotate: 5, transformOrigin: "50% 50%", yoyo: true, repeat: -1, ease: "back.inOut(4)" },
        { rotate: -5, duration: 5, yoyo: true, repeat: -1, ease: "back.inOut(4)" }
      );

    const coffeeZoomTimeline = gsap.timeline();

    loadingTimeline.eventCallback("onComplete", () => {

      handWrittenAnimation();
      setLoadingHasAnimated(true);

      const menuTextSplit = new SplitText(menuTextRef.current, { type: "words,chars" });

      coffeeZoomTimeline
        .fromTo(
          [textRef.current, logoLoadingRef.current, headerAddressTextRef.current, headerTelTextRef.current],
          { y: 0, opacity: 1 },
          { y: -5, opacity: 0, ease: 'power1.in' },
          0
        )
        .fromTo(
          catGroup,
          { y: '5%', ease: 'power1.in' },
          { y: '120%', ease: 'power1.in' },
          0
        )
        .fromTo(coffeePattern,
          { transformOrigin: '50% 50%', rotate: 0, ease: 'power1.in' },
          { rotate: 360, ease: 'power1.in' },
        )
        .to(tasseSelector("#pattern path"),
          { fill: '#dbb27c' },
          "<"
        )
        .to(
          tasseRef.current,
          { scale: 50, xPercent: -50, transformOrigin: '50% 50%', ease: 'power1.in' },
          "<"
        )
        .to(menuTextRef.current,
          { opacity: 1, ease: 'power1.in' },
        )
        .fromTo(
          menuTextSplit.chars,
          { opacity: 0.3 },
          { opacity: 1, stagger: 0.05, ease: 'power1.out' },
          "<"
        )

      ScrollTrigger.create({
        animation: coffeeZoomTimeline,
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2000",
        pin: true,
        // markers: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: () => {
          const progress = coffeeZoomTimeline.progress();
          if (progress > 0.2) {
            patternTimeline.pause(1.5);
          } else {
            patternTimeline.seek(1.5);
            patternTimeline.play();
          }
        },
      });



    })

  }, [])


  return <section ref={sectionRef} className="pattern h-screen text-text-300 bg-bg-100 overflow-hidden">
    <header className='flex justify-between md:justify-around items-center px-8 pt-10 font-poppins font-semibold'>
      <div>
        <p className='text-lg' ref={headerAddressTextRef}>37 rue des miaou, Woippy</p>
      </div>

      <LogoLoading className='absolute' ref={logoLoadingRef} />

      <div>
        <a href="tel:0422334455" className='text-lg' ref={headerTelTextRef}>04 22 33 44 55</a>
      </div>
    </header>

    <div className="absolute translate-x-[-50%] left-1/2 translate-y-[-50%] top-1/2">
      <Tasse
        ref={tasseRef}
        className="w-48 h-full md:w-92 opacity-0 z-0"
      />
    </div>
    <div className='absolute translate-x-[-50%] left-1/2 translate-y-[-48%] top-1/2'>
      <HandWrittenText
        ref={textRef}
        className=" z-5 w-64 md:w-300 opacity-0"
      />
    </div>
    <div>
      <MiaouTeam
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full md:h-48"
        ref={catGroupRef}
      />
    </div>
    <h2 id="menu" className="absolute w-1/2 translate-x-[-50%] left-1/2 translate-y-[-48%] top-1/2 font-poppins font-semibold text-2xl md:text-5xl text-center opacity-0" ref={menuTextRef}>
      Profitez de notre menu délicieux et varié, conçu pour satisfaire toutes vos envies caféinées et gourmandes.
    </h2>


  </section>;
}

export default Hero;
