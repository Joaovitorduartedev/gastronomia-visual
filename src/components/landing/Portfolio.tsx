import { useState } from "react";

const portfolioItems = [
  {
    id: 1,
    category: "Hambúrgueres",
    before: "🍔",
    after: "🍔",
    description: "Hambúrguer artesanal gourmet",
  },
  {
    id: 2,
    category: "Pizzas",
    before: "🍕",
    after: "🍕",
    description: "Pizza margherita tradicional",
  },
  {
    id: 3,
    category: "Sobremesas",
    before: "🍰",
    after: "🍰",
    description: "Cheesecake de frutas vermelhas",
  },
  {
    id: 4,
    category: "Bebidas",
    before: "🧃",
    after: "🧃",
    description: "Smoothie tropical refrescante",
  },
  {
    id: 5,
    category: "Sushi",
    before: "🍣",
    after: "🍣",
    description: "Combo sushi premium",
  },
  {
    id: 6,
    category: "Massas",
    before: "🍝",
    after: "🍝",
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Transformações que
            <span className="text-accent"> impressionam</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja como nossos especialistas transformam fotos comuns em imagens profissionais que vendem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="card-elevated rounded-2xl overflow-hidden cursor-pointer group"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Before Image */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                    hoveredItem === item.id ? "opacity-0 scale-110" : "opacity-100 scale-100"
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <span className="text-7xl grayscale opacity-70">{item.before}</span>
                  </div>
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-foreground/80 text-background text-xs font-semibold">
                    ANTES
                  </div>
                </div>

                {/* After Image */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                    hoveredItem === item.id ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
                    <span className="text-7xl drop-shadow-xl">{item.after}</span>
                  </div>
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                    DEPOIS
                  </div>
                </div>
              </div>

              <div className="p-5">
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-lg font-semibold text-foreground mt-1">
                  {item.description}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">Passe o mouse</span> nas imagens para ver a transformação
          </p>
        </div>
      </div>
    </section>
  );
}
