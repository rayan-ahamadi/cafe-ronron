import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";



function Menu() {
  const menuData = useRef({
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
  });

  return <section className="bg-bg-300 text-text-300">
    <div id="container" className="flex flex-row justify-between items-center px-8 py-16">
      <div id="menu-list" className="flex flex-col gap-12">
        <div id="coffees">
          <h2 className="text-6xl font-semibold mb-6 font-clatonia">Nos Cafés :</h2>
          <ul >
            {menuData.current.coffees.map((item, index) => (
              <li key={index} className="flex flex-col mb-6 border-b-1 border-primary-100 pb-8">
                <div id="title" className="flex justify-start items-baseline">
                  <span className="text-3xl font-semibold">{item.name}</span>
                  <span className="w-auto h-1 border-b-4 border-primary-400 border-dotted flex-grow"></span>
                  <span className="text-4xl font-bold font-poppins">{item.price}</span>
                </div>

                <div id="descr">
                  <p className="text-2xl italic mt-2">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div id="desserts">
          <h2 className="text-6xl font-semibold mb-6 font-clatonia">Nos Desserts :</h2>
          <ul>
            {menuData.current.desserts.map((item, index) => (
              <li key={index} className="flex flex-col mb-6 border-b-1 border-primary-100 pb-8">
                <div id="title" className="flex justify-start items-baseline">
                  <span className="text-3xl font-semibold">{item.name}</span>
                  <span className="w-auto h-1 border-b-4 border-primary-400 border-dotted flex-grow"></span>
                  <span className="text-4xl font-bold font-poppins">{item.price}</span>
                </div>

                <div id="descr">
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
