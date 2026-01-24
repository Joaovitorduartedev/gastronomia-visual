import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import logoImg from "@/assets/logo-prime-visual2.png"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container-narrow section-padding !py-4">
          <nav className="flex items-center justify-between">
            <Link to="/home" className="flex items-center gap-2">
              {/* Fundo alterado para preto para destacar a logo */}
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center p-1">
                <img 
                  src={logoImg} 
                  alt="Prime Visual" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="text-xl font-bold text-foreground">Prime Visual</span>
            </Link>

            {/* Desktop Navigation - Ordem Invertida: Planos antes de Como Funciona */}
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
              {isAuthenticated && (
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* Mobile Menu - Ordem Invertida também no Mobile */}
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
                {isAuthenticated && (
                  <Button variant="outline" className="w-full" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
  );
}
