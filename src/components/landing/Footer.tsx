import { Instagram, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-narrow section-padding !py-12">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold">PixelPro</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm">
              Transformando fotos comuns em imagens profissionais que vendem mais.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#portfolio" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  Portfólio
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  Planos
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  Como Funciona
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:contato@pixelpro.com" 
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                >
                  <Mail size={16} />
                  contato@pixelpro.com
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/5511999999999" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com/pixelpro" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                >
                  <Instagram size={16} />
                  @pixelpro
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <p className="text-center text-primary-foreground/50 text-sm">
            © {new Date().getFullYear()} Visual Prime. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
