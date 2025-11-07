import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LogoCafeRonron from '@assets/images/LogoCafeRonron.svg?react'
import Tasse from '@assets/images/tasse.svg?react'
import MiaouTeam from '@assets/images/miaouTeam.svg?react'
import { useAnimationStore } from '../AnimationStore'



function Hero() {
  const tasseRef = useRef(null)
  const { loadingHasAnimated } = useAnimationStore()
  useGSAP(() => {
    console.log(loadingHasAnimated)

    if (loadingHasAnimated) {
      console.log("")
    }

  }, [loadingHasAnimated])


  return <section className="hero-pattern h-screen text-text-300 overflow-hidden">
    <header className='flex justify-between items-center px-8 pt-10 font-poppins font-semibold'>
      <div>
        <p className='text-lg'>37 rue des miaou, Woippy</p>
      </div>
      <div className='absolute translate-x-[-50%] left-1/2 translate-y-[-50%] top-14'>
        <LogoCafeRonron className='' />
      </div> 
      <div>
        <a href="tel:0422334455" className='text-lg'>04 22 33 44 55</a>
      </div>
    </header>
    
    <div className="absolute translate-x-[-50%] left-1/2 translate-y-[-50%] top-1/2">
      <Tasse ref={tasseRef} className="w-48 h-full md:w-92" />
    </div>
    <div>
      <MiaouTeam className="absolute bottom-0 left-1/2 transform w-full md:h-48 -translate-x-1/2" />
    </div>


  </section>;
}

export default Hero;
