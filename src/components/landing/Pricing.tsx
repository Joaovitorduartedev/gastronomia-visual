import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Standard",
    price: "149",
    description: "Ideal para começar a melhorar seu cardápio",
    photos: 5,
    features: [
      "5 fotos profissionais",
      "Correção de cor e luz",
      "Remoção de imperfeições",
      "Entrega em 3 dias úteis",
      "1 revisão gratuita",
    ],
    popular: false,
  },
  {
    name: "Premium",
    price: "249",
    description: "Pacote completo para transformar seu negócio",
    photos: 10,
    features: [
      "10 fotos profissionais",
      "Correção avançada de cor",
      "Remoção de fundo (opcional)",
      "Entrega em 2 dias úteis",
      "3 revisões gratuitas",
      "Suporte prioritário",
    ],
    popular: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-muted/50">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Planos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Escolha o plano ideal
            <span className="text-accent"> para você</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Investimento que se paga com o aumento das suas vendas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? "bg-primary text-primary-foreground scale-105 shadow-2xl"
                  : "card-elevated"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold shadow-lg">
                    <Sparkles size={14} />
                    Mais Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-sm ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>R$</span>
                  <span className={`text-5xl font-extrabold ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}>
                    {plan.price}
                  </span>
                </div>
                <p className={`text-sm mt-2 ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {plan.photos} fotos • pagamento único
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.popular ? "bg-accent" : "bg-accent/20"
                    }`}>
                      <Check size={12} className={plan.popular ? "text-accent-foreground" : "text-accent"} />
                    </div>
                    <span className={`text-sm ${plan.popular ? "text-primary-foreground/90" : "text-foreground"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link to={`/briefing?plan=${plan.name.toLowerCase()}`}>
                <Button
                  variant={plan.popular ? "hero" : "accent"}
                  size="lg"
                  className="w-full"
                >
                  Escolher {plan.name}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            💳 Pagamento seguro via <span className="font-semibold text-foreground">Pix ou Cartão</span>
          </p>
        </div>
      </div>
    </section>
  );
}
