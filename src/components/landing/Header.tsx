import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container-narrow section-padding !py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-foreground">PixelPro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#portfolio" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Portfólio
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Planos
            </a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Como Funciona
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/admin">
              <Button variant="ghost">Admin</Button>
            </Link>
            <Link to="/briefing">
              <Button variant="accent">Começar Agora</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-4 animate-fade-in">
            <a href="#portfolio" className="block text-muted-foreground hover:text-foreground transition-colors font-medium py-2">
              Portfólio
            </a>
            <a href="#pricing" className="block text-muted-foreground hover:text-foreground transition-colors font-medium py-2">
              Planos
            </a>
            <a href="#how-it-works" className="block text-muted-foreground hover:text-foreground transition-colors font-medium py-2">
              Como Funciona
            </a>
            <div className="flex flex-col gap-2 pt-4">
              <Link to="/admin">
                <Button variant="ghost" className="w-full">Admin</Button>
              </Link>
              <Link to="/briefing">
                <Button variant="accent" className="w-full">Começar Agora</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
