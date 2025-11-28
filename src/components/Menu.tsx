import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useRef, useEffect } from "react";
import { useAnimationStore } from '../AnimationStore';



function Menu() {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const { heroPinEnded } = useAnimationStore();
  const coffeeH2Ref = useRef(null);
  const dessertH2Ref = useRef(null);
  const coffeeContainerRef = useRef(null);
  const dessertContainerRef = useRef(null);

  const coffeeSelector = gsap.utils.selector(coffeeContainerRef);
  const dessertSelector = gsap.utils.selector(dessertContainerRef);

  const menuData = {
    coffees: [
      {
        name: "Espresso",
        price: "2.50€",
        description: "Un café court et concentré, au goût intense et légèrement amer.",
      },
      {
        name: "Cappuccino",
        price: "3.00€",
        description: "Expresso, lait chaud et mousse onctueuse, saupoudré de cacao.",
      },
      {
        name: "Latte",
        price: "3.50€",
        description: "Douceur de lait chaud avec un espresso léger, texture crémeuse.",
      },
      {
        name: "Mocha",
        price: "4.00€",
        description: "Mélange de café et chocolat, surmonté de crème fouettée.",
      },
    ],
    desserts: [
      {
        name: "Cheesecake",
        price: "4.50€",
        description: "Gâteau crémeux au fromage sur croûte croustillante, coulis de fruits.",
      },
      {
        name: "Brownie",
        price: "3.50€",
        description: "Brownie fondant au chocolat, cœur moelleux et éclats de noix.",
      },
      {
        name: "Tiramisu",
        price: "5.00€",
        description: "Douceur italienne au mascarpone, imbibée de café et saupoudrée de cacao.",
      },
      {
        name: "Glace Italienne",
        price: "3.00€",
        description: "Glace artisanale veloutée, saveurs du jour (vanille, chocolat, fruit).",
      },
    ],
  };



  useGSAP(() => {
    if (!heroPinEnded) return; // Après le pin du héros

    const coffeeH2 = coffeeH2Ref.current;
    const dessertH2 = dessertH2Ref.current;

    // Animation du titre "Nos Cafés"

    const coffeeH2ScrollTrigger = ScrollTrigger.create({
      trigger: coffeeH2,
      start: "top 90%",
      markers: false,
      invalidateOnRefresh: true,
    });

    const splitCoffeeH2 = new SplitText(coffeeH2, { type: "chars" });
    gsap.fromTo(
      splitCoffeeH2.chars,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: coffeeH2ScrollTrigger,
      }
    );

    // Animation du titre "Nos Desserts"

    const splitDessertH2 = new SplitText(dessertH2, { type: "chars" });
    const dessertH2ScrollTrigger = ScrollTrigger.create({
      trigger: dessertH2,
      start: "top 90%",
      markers: false,
      invalidateOnRefresh: true,
    });
    gsap.fromTo(
      splitDessertH2.chars,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: dessertH2ScrollTrigger,
      },
    );

    // Animation de la carte des cafés

    const coffeesItems = coffeeSelector("li");
    coffeesItems.forEach((item, index) => {
      gsap.to(
        item,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            markers: false,
            invalidateOnRefresh: true,
          }
        },
      );
    });

    // Animation de la carte des desserts

    const dessertItems = dessertSelector("li");
    dessertItems.forEach((item, index) => {
      gsap.to(
        item,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            markers: false,
            invalidateOnRefresh: true,
          }
        }
      );
    });

    // return () => {
    //   if (coffeeH2ScrollTrigger) coffeeH2ScrollTrigger.kill();
    //   if (tween) tween.kill();
    // };
  }, [heroPinEnded]);

  return <section className="bg-bg-300 text-text-300">
    <div id="container" className="flex flex-row justify-between items-center px-8 py-16">
      <div id="menu-list" className="flex flex-col gap-12">
        <div id="coffees" ref={coffeeContainerRef}>
          <h2 ref={coffeeH2Ref} className="text-6xl font-semibold mb-6 font-clatonia">Nos Cafés :</h2>
          <ul >
            {menuData.coffees.map((item, index) => (
              <li key={index} className="flex flex-col mb-6 border-b-1 border-primary-100 pb-8" style={{ opacity: 0, transform: 'translateY(-20px)' }}>
                <div className="flex justify-start items-baseline">
                  <span className="text-3xl font-semibold">{item.name}</span>
                  <span className="w-auto h-1 border-b-4 border-primary-400 border-dotted flex-grow"></span>
                  <span className="text-4xl font-bold font-poppins">{item.price}</span>
                </div>

                <div>
                  <p className="text-2xl italic mt-2">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div id="desserts" ref={dessertContainerRef}>
          <h2 ref={dessertH2Ref} className="text-6xl font-semibold mb-6 font-clatonia">Nos Desserts :</h2>
          <ul>
            {menuData.desserts.map((item, index) => (
              <li key={index} className="flex flex-col mb-6 border-b-1 border-primary-100 pb-8" style={{ opacity: 0, transform: 'translateY(-20px)' }}>
                <div className="flex justify-start items-baseline">
                  <span className="text-3xl font-semibold">{item.name}</span>
                  <span className="w-auto h-1 border-b-4 border-primary-400 border-dotted flex-grow"></span>
                  <span className="text-4xl font-bold font-poppins">{item.price}</span>
                </div>

                <div>
                  <p className="text-2xl italic mt-2">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div id="animated-image-container"></div>
    </div>
  </section>;
}

export default Menu;
