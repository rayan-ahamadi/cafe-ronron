import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LogoCafeRonron from '@assets/images/LogoCafeRonron.svg?react'
import Tasse from '@assets/images/tasse.svg?react'
import { useAnimationStore } from '../AnimationStore'



function Hero() {
  const tasseRef = useRef(null)
  const { loadingHasAnimated } = useAnimationStore()
  useGSAP(() => {
    console.log(loadingHasAnimated)

    if (loadingHasAnimated) {
      gsap.fromTo(tasseRef.current, {
        opacity: 0,
        y: 50,
        rotate: 15,
        duration: 1.5,
        ease: "power3.out",
      },
        {
          opacity: 1,
          rotate: 0,
          y: 0
        }
      )
    }

  }, [loadingHasAnimated])


  return <section className="hero-pattern h-screen text-text-300">
    <header className='flex justify-between items-center px-8 pt-4 font-poppins font-semibold'>
      <div>
        <p className='text-lg'>37 rue des miaou, Woippy</p>
      </div>
      <div>
        <LogoCafeRonron className='' />
      </div>
      <div>
        <a href="tel:04 22 33 44 55" className='text-lg'>04 22 33 44 55</a>
      </div>
    </header>
    <div className=''>
      <Tasse className='absolute bottom-0 left-1/2 -translate-x-1/2 w-48 md:w-82 opacity-0' ref={tasseRef} />
    </div>

  </section>;
}

export default Hero;
