import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

// AVISO: Credenciais no frontend NÃO são seguras para produção
const ADMIN_EMAIL = "gastronomiavisualofc@gmail.com";
const ADMIN_PASSWORD = "bino1234.";

interface StoredUser {
  email: string;
  password: string;
  name: string;
  createdAt: string;
}

export default function Login() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, isAdmin } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(isAdmin ? "/admin" : "/home");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const getStoredUsers = (): StoredUser[] => {
    const stored = localStorage.getItem("pixelpro_users");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Check admin credentials
      if (loginEmail === ADMIN_EMAIL && loginPassword === ADMIN_PASSWORD) {
        localStorage.setItem("pixelpro_auth", JSON.stringify({ 
          email: loginEmail, 
          role: "admin",
          loginAt: new Date().toISOString()
        }));
        
        toast({
          title: "Login realizado!",
          description: "Bem-vindo ao painel administrativo.",
        });
        
        navigate("/admin");
      } else {
        // Check stored users
        const users = getStoredUsers();
        const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
        
        if (user) {
          localStorage.setItem("pixelpro_auth", JSON.stringify({ 
            email: user.email,
            name: user.name,
            role: "user",
            loginAt: new Date().toISOString()
          }));
          
          toast({
            title: "Login realizado!",
            description: `Bem-vindo de volta, ${user.name}!`,
          });
          
          navigate("/home");
        } else {
          toast({
            title: "Credenciais inválidas",
            description: "E-mail ou senha incorretos.",
            variant: "destructive",
          });
        }
      }
      setIsLoading(false);
    }, 500);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupPassword !== signupConfirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "Por favor, verifique as senhas digitadas.",
        variant: "destructive",
      });
      return;
    }

    if (signupPassword.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const users = getStoredUsers();
      
      // Check if email already exists
      if (users.some(u => u.email === signupEmail)) {
        toast({
          title: "E-mail já cadastrado",
          description: "Este e-mail já está em uso. Tente fazer login.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Add new user
      const newUser: StoredUser = {
        email: signupEmail,
        password: signupPassword,
        name: signupName,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem("pixelpro_users", JSON.stringify(users));
      
      // Auto login
      localStorage.setItem("pixelpro_auth", JSON.stringify({ 
        email: newUser.email,
        name: newUser.name,
        role: "user",
        loginAt: new Date().toISOString()
      }));
      
      toast({
        title: "Conta criada!",
        description: "Bem-vindo ao PixelPro!",
      });
      
      navigate("/home");
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">P</span>
              </div>
              <span className="text-2xl font-bold text-foreground">PixelPro</span>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Cadastrar</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <h1 className="text-2xl font-bold text-foreground text-center mb-2">
                Bem-vindo de volta
              </h1>
              <p className="text-muted-foreground text-center mb-6">
                Entre com suas credenciais para continuar
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">E-mail</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Senha</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12"
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <h1 className="text-2xl font-bold text-foreground text-center mb-2">
                Criar conta
              </h1>
              <p className="text-muted-foreground text-center mb-6">
                Preencha os dados para se cadastrar
              </p>

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Nome completo</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Seu nome"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">E-mail</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Senha</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">Confirmar senha</Label>
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12"
                  disabled={isLoading}
                >
                  {isLoading ? "Criando conta..." : "Criar conta"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
