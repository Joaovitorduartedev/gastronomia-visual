import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import beforeAfterImage from "@/assets/before-after-burger.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/80">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container-narrow section-padding relative z-10 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6 animate-fade-in">
              <Sparkles size={16} />
              <span className="text-sm font-medium">Transforme suas fotos em vendas</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Fotos profissionais que
              <span className="block text-accent"> vendem mais</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Eleve a qualidade visual do seu cardápio e aumente suas vendas no iFood, Instagram e muito mais.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Link to="/briefing">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Começar Agora
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <a href="#portfolio">
                <Button variant="outline-light" size="xl" className="w-full sm:w-auto">
                  Ver Portfólio
                </Button>
              </a>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center gap-6 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-accent/30 border-2 border-primary flex items-center justify-center text-primary-foreground text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 text-accent">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm text-primary-foreground/70">+500 estabelecimentos atendidos</p>
              </div>
            </div>
          </div>

          {/* Right Content - Before/After Preview */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-float">
              <img 
                src={beforeAfterImage} 
                alt="Antes e depois - transformação profissional de foto de hambúrguer" 
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-foreground/80 text-background text-xs font-semibold">
                ANTES
              </div>
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                DEPOIS
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -left-4 bg-card rounded-xl p-4 shadow-xl border border-border animate-pulse-glow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">+45%</p>
                  <p className="text-sm text-muted-foreground">mais vendas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
