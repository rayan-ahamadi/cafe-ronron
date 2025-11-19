import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'
import LogoCafeRonron from '@assets/images/LogoCafeRonron.svg?react'
import Tasse from '@assets/images/tasse.svg?react'
import MiaouTeam from '@assets/images/miaouTeam.svg?react'
import HandWrittenText from '@assets/images/handWrittenText.svg?react'
import { useAnimationStore } from '../AnimationStore'



function Hero() {
  gsap.registerPlugin(DrawSVGPlugin)

  const tasseRef = useRef(null)
  const catGroupRef = useRef(null)
  const textRef = useRef(null)

  const { loadingHasAnimated } = useAnimationStore()
  useGSAP(() => {
    const catGroupSelector = gsap.utils.selector(catGroupRef)
    const tasseSelector = gsap.utils.selector(tasseRef)

    const catGroup = catGroupSelector('g')
    const coffeeShadow = tasseSelector('#coffeeShadow')
    const coffeePattern = tasseSelector('#pattern')
    // const patternPaths = coffeePattern.querySelectorAll('path')

    const opacityTimeline = gsap.timeline()
    const textTimeline = gsap.timeline()
    const patternTimeline = gsap.timeline(
      {
        defaults: {
          ease: "linear.inOut"
        }
      }
    )


    if (loadingHasAnimated) {
      // Animation d'apparition des chats et de la tasse
      opacityTimeline
        .fromTo(tasseRef.current,
          { opacity: 0, y: 50, rotate: -30 },
          { opacity: 1, y: 0, duration: 1, rotate: 0 }
        )
        .fromTo(coffeeShadow,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          '+=0.5'
        )
        .fromTo(catGroupRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, },
          '-=0.5'
        )
        .fromTo(catGroup,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 10, duration: 0.5, stagger: 0.1 },
          '-=1'
        )

      // Animation du motif de café
      patternTimeline
        .fromTo(coffeePattern,
          { rotate: 5, transformOrigin: "50% 50%", yoyo: true, repeat: -1 },
          { rotate: -5, duration: 5, yoyo: true, repeat: -1 }
        )

    }

  }, [loadingHasAnimated])


  return <section className="hero-pattern h-screen text-text-300 overflow-hidden">
    <header className='flex justify-between items-center px-8 pt-10 font-poppins font-semibold'>
      <div>
        <p className='text-lg'>37 rue des miaou, Woippy</p>
      </div>
      <div className='absolute translate-x-[-50%] left-1/2 translate-y-[-50%] top-14'>
        <LogoCafeRonron className='z-0' />
      </div>
      <div>
        <a href="tel:0422334455" className='text-lg'>04 22 33 44 55</a>
      </div>
    </header>

    <div className="absolute translate-x-[-50%] left-1/2 translate-y-[-50%] top-1/2">
      <Tasse
        ref={tasseRef}
        className="w-48 h-full md:w-92 opacity-0 z-0"
      />
      <HandWrittenText
        ref={textRef}
        className="z-5"
      />
    </div>
    <div>
      <MiaouTeam
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full md:h-48 opacity-0"
        ref={catGroupRef}
      />
    </div>


  </section>;
}

export default Hero;
