import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { useEffect } from 'react'
import LogoLoading from '@assets/images/logoLoading.svg?react'
import gsap from 'gsap'
import MorphSVGPlugin from 'gsap/MorphSVGPlugin'
import { useAnimationStore } from '../AnimationStore'


gsap.registerPlugin(useGSAP, MorphSVGPlugin)

export default function LoadingSection() {
    const sectionRef = useRef(null)
    const logoRef = useRef(null)
    const originalSteamsID = ["steam1-1", "steam2-1", "steam3-1"]
    const duplicataSteamsID = ["steam1-2", "steam2-2", "steam3-2"]

    const { setLoadingHasAnimated } = useAnimationStore()

    useEffect(() => {
        duplicataSteamsID.forEach((id, index) => {
            document.getElementById(id).style.display = "hidden"
        })
    }, [])

    useGSAP(() => {
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

        const textCafeGroupId = "g41";
        const textRonronGroupId = "g42";

        const splitCafeGroup = document.getElementById(textCafeGroupId)?.childNodes
        const splitRonronGroup = document.getElementById(textRonronGroupId)?.childNodes

        console.log(splitCafeGroup, splitRonronGroup)

        gsap.from(logoRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 1.5,
            ease: "back.inOut"
        })

        const svgTextTimeline = gsap.timeline({
            onComplete: () => setLoadingHasAnimated(true)
        })
        svgTextTimeline
            .from(splitCafeGroup, {
                opacity: 0,
                duration: 0.5,
                ease: "linear.inOut",
                y: 5,
                stagger: 0.1
            }, "+=0.5")
            .from(splitRonronGroup, {
                opacity: 0,
                duration: 0.5,
                ease: "linear.inOut",
                y: -5,
                stagger: 0.1
            }, "+=0.2")
            .to(sectionRef.current, {
                transform: "translateY(-100%)",
                duration: 0.5,
            }, "+=0.5")


        return () => {
            svgTextTimeline.kill()
        }

    }, { scope: sectionRef })

    return (
        <div className="flex justify-center items-center bg-bg-100 absolute top-0 left-0 w-full h-full" ref={sectionRef}>
            <LogoLoading ref={logoRef} className="h-1/2" />
        </div>
    )
}
