import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo-prime-visual2.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Background Pattern - Brilho trocado de bg-accent (laranja) para bg-white */}
      <div className="absolute inset-0 opacity-10">
        {/* O uso de bg-white com blur-3xl cria o efeito de iluminação suave */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container-narrow section-padding relative z-10 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <img 
                src={logoImg} 
                alt="Prime Visual" 
                className="w-70 h-auto mb-2 drop-shadow-2xl" 
              />
          </div>
          
          {/* Conteúdo à Direita */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Fotos profissionais que
              <span className="block text-accent"> vendem mais</span>
            </h1>
          </div>

        </div>
      </div>
    </section>
  );
}