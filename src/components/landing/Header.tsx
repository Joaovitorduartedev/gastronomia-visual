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
      /* Alterado para bg-black e adicionado border-white/10 para uma divisão sutil */
      <header className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-lg border-b border-white/10">
        <div className="container-narrow section-padding !py-4">
          <nav className="flex items-center justify-between">
            <Link to="/home" className="flex items-center gap-2">
              {/* Remova as classes 'border' e 'border-white/10' desta div abaixo */}
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center p-1">
                <img 
                  src={logoImg} 
                  alt="Prime Visual" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <span className="text-xl font-bold text-white">Prime Visual</span>
            </Link>

            {/* Desktop Navigation - Cores ajustadas para contraste no preto */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#portfolio" className="text-gray-400 hover:text-white transition-colors font-medium">
                Portfólio
              </a>
              
              <a href="#pricing" className="text-gray-400 hover:text-white transition-colors font-medium">
                Planos
              </a>

              <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors font-medium">
                Como Funciona
              </a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated && (
                <Button variant="outline" size="sm" onClick={handleLogout} className="text-white border-white/20 hover:bg-white/10">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </Button>
              )}
            </div>

            {/* Mobile Menu Button - Cor alterada para branco */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* Mobile Menu - Fundo preto e texto branco */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-2 space-y-4 animate-fade-in bg-black">
              <a href="#portfolio" className="block text-gray-400 hover:text-white transition-colors font-medium py-2">
                Portfólio
              </a>

              <a href="#pricing" className="block text-gray-400 hover:text-white transition-colors font-medium py-2">
                Planos
              </a>

              <a href="#how-it-works" className="block text-gray-400 hover:text-white transition-colors font-medium py-2">
                Como Funciona
              </a>
              
              <div className="flex flex-col gap-2 pt-4">
                {isAuthenticated && (
                  <Button variant="outline" className="w-full text-white border-white/20" onClick={handleLogout}>
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