import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import logoImg from "@/assets/logo-prime-visual2.png";

export function Hero() {
  const testimonials = [
    {
      title: "Ótimo trabalho! Aumentou muito minhas vendas!",
      description: "As fotos ficaram perfeitas, super recomendo!",
      stars: 6,
    },
    {
      title: "As fotos são incríveis, meu cardápio está mais profissional!",
      description: "Qualidade incrível, a edição transformou meus pratos!",
      stars: 6,
    },
    {
      title: "A melhor escolha para o meu Instagram!",
      description: "O engajamento subiu 40% na primeira semana de postagem.",
      stars: 6,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background px-4 md:px-0">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container-narrow relative z-10 pt-32 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Logo - Ajustada para Mobile */}
          <div className="relative flex justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <img 
              src={logoImg} 
              alt="Prime Visual" 
              className="w-full max-w-[250px] md:max-w-[350px] h-auto mb-2 drop-shadow-2xl" 
            />
          </div>
          
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-8 animate-fade-in">
              Fotos profissionais que
              <span className="block text-accent"> vendem mais</span>
            </h1>

            {/* Quadro Externo - Ajustado para não vazar no mobile */}
            <div className="relative mt-8 p-1 rounded-[2.5rem] border-2 border-white bg-black/20 shadow-[0_0_30px_rgba(255,255,255,0.4)] max-w-full md:max-w-lg mx-auto lg:mx-0 overflow-hidden animate-fade-in" style={{ animationDelay: "0.4s" }}>
              
              {/* Slider Lateral */}
              <div 
                className="flex transition-transform duration-1000 ease-in-out" 
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((item, index) => (
                  <div key={index} className="min-w-full p-2 md:p-4">
                    <div className="bg-white rounded-[2.2rem] p-6 md:p-8 text-black min-h-[220px] flex flex-col justify-center">
                      <div className="space-y-3">
                        <p className="font-bold text-lg md:text-xl leading-tight">
                          "{item.title}"
                        </p>
                        <p className="text-sm text-gray-700">
                          {item.description}
                        </p>
                        <div className="flex gap-1 pt-2">
                          {[...Array(item.stars)].map((_, i) => (
                            <Star key={i} size={14} fill="black" className="text-black" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}