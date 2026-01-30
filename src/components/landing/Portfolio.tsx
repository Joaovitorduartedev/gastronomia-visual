import { useState } from "react";
import beforeImage1 from "@/assets/antes-1.jpg"; 
import afterImage1 from "@/assets/depois-1.jpg";
import beforeImage2 from "@/assets/antes-2.jpg"; 
import afterImage2 from "@/assets/depois-2.jpg";
import beforeImage3 from "@/assets/antes-3.jpg"; 
import afterImage3 from "@/assets/depois-3.jpg";
import beforeImage4 from "@/assets/antes-4.jpg"; 
import afterImage4 from "@/assets/depois-4.jpg";
import beforeImage5 from "@/assets/antes-5.jpg"; 
import afterImage5 from "@/assets/depois-5.jpg"
import beforeImage6 from "@/assets/antes-6.jpg"; 
import afterImage6 from "@/assets/depois-6.jpg"

const portfolioItems = [
  {
    id: 1,
    category: "Hambúrgueres",
    before: beforeImage1, // Caminho da imagem original
    after: afterImage1,   // Caminho da imagem editada
    description: "Hambúrguer artesanal gourmet",
  },
  {
    id: 2,
    category: "Pizzas",
    before: beforeImage2,
    after: afterImage2,
    description: "Pizza margherita tradicional",
  },
  {
    id: 3,
    category: "Sobremesas",
    before: beforeImage3,
    after: afterImage3,
    description: "Cheesecake de frutas vermelhas",
  },
  {
    id: 4,
    category: "Bebidas",
    before: beforeImage4,
    after: afterImage4,
    description: "Smoothie tropical refrescante",
  },
  {
    id: 5,
    category: "Sushi",
    before: beforeImage5,
    after: afterImage5,
    description: "Combo sushi premium",
  },
  {
    id: 6,
    category: "Massas",
    before: beforeImage6,
    after: afterImage6,
    description: "Spaghetti à carbonara",
  },
];

export function Portfolio() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <section id="portfolio" className="section-padding bg-black">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Portfólio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Transformações que
            <span className="text-accent"> impressionam</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="relative rounded-2xl overflow-hidden cursor-pointer group bg-neutral-900 border border-white/10"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Imagem do DEPOIS (Fica por baixo) */}
                <img
                  src={item.after}
                  alt="Depois"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Imagem do ANTES (Fica por cima e desaparece no hover) */}
                <img
                  src={item.before}
                  alt="Antes"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                    hoveredItem === item.id ? "opacity-0" : "opacity-100"
                  }`}
                />

                {/* Badges Indicativas */}
                <div className="absolute top-3 left-3 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-500 ${
                    hoveredItem === item.id 
                      ? "bg-accent text-accent-foreground" 
                      : "bg-black/60 text-white backdrop-blur-md"
                  }`}>
                    {hoveredItem === item.id ? "DEPOIS" : "ANTES"}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-lg font-semibold text-white mt-1">
                  {item.description}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
