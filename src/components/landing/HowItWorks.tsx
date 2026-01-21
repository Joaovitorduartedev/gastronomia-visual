import { Upload, Palette, Send, CreditCard } from "lucide-react";

const steps = [
  {
    icon: CreditCard,
    title: "Escolha seu plano",
    description: "Selecione o pacote ideal para suas necessidades e faça o pagamento seguro.",
  },
  {
    icon: Upload,
    title: "Envie suas fotos",
    description: "Faça upload das imagens originais através do nosso formulário simples.",
  },
  {
    icon: Palette,
    title: "Edição profissional",
    description: "Nossa equipe trabalha na transformação das suas fotos com técnicas avançadas.",
  },
  {
    icon: Send,
    title: "Receba e venda",
    description: "Receba as fotos finalizadas e comece a aumentar suas vendas!",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-background">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Processo
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Simples e
            <span className="text-accent"> rápido</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Em apenas 4 passos você terá fotos profissionais para seu negócio
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent to-accent/20" />
              )}

              <div className="text-center">
                <div className="relative inline-flex mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-accent/10 flex items-center justify-center transition-all duration-300 hover:bg-accent/20 hover:scale-110">
                    <step.icon size={36} className="text-accent" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
