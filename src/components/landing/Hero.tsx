import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react'; // Biblioteca já presente no seu package.json
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

  // Configuração do Embla para permitir arrastar e transição suave
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    duration: 30, // Transição mais lenta conforme solicitado anteriormente
    skipSnaps: false 
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // Funções para movimentação manual
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Atualiza o índice das bolinhas (dots) quando o slide muda
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    
    // Autoplay: Troca a cada 5 segundos, mas para se o usuário interagir
    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      clearInterval(timer);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background px-4 md:px-0">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container-narrow relative z-10 pt-32 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="relative flex justify-center lg:justify-start animate-fade-in">
            <img 
              src={logoImg} 
              alt="Prime Visual" 
              className="w-full max-w-[250px] md:max-w-[350px] h-auto mb-2 drop-shadow-2xl" 
            />
          </div>
          
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-8">
              Fotos profissionais que
              <span className="block text-accent"> vendem mais</span>
            </h1>

            {/* Quadro Externo com suporte a Arrastar (Drag) */}
            <div className="relative mt-8 group">
              <div className="p-1 rounded-[2.5rem] border-2 border-white bg-black/20 shadow-[0_0_30px_rgba(255,255,255,0.4)] max-w-full md:max-w-lg mx-auto lg:mx-0 overflow-hidden">
                
                {/* Viewport do Embla */}
                <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                  <div className="flex">
                    {testimonials.map((item, index) => (
                      <div key={index} className="flex-[0_0_100%] min-w-0 p-2 md:p-4">
                        <div className="bg-white rounded-[2.2rem] p-6 md:p-8 text-black min-h-[220px] flex flex-col justify-center select-none">
                          <div className="space-y-3">
                            <p className="font-bold text-lg md:text-xl leading-tight">"{item.title}"</p>
                            <p className="text-sm text-gray-700">{item.description}</p>
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

              {/* Setas de Movimentação (aparecem no hover no Desktop) */}
              <button 
                onClick={scrollPrev}
                className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white backdrop-blur-md hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={scrollNext}
                className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white backdrop-blur-md hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}