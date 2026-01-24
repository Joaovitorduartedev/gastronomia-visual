import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import logoImg from "@/assets/logo-prime-visual2.png";
import {Eye,EyeOff,} from "lucide-react";

// AVISO: Credenciais no frontend NÃO são seguras para produção
const ADMIN_EMAIL = "gastronomiavisualofc@gmail.com";
const ADMIN_PASSWORD = "Pmja100#";

interface StoredUser {
  email: string;
  password: string;
  name: string;
  createdAt: string;
}

export default function Login() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Para o olho da senha
  const [emailValid, setEmailValid] = useState(false); // Para o check verde
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
    // 1. Verifica primeiro se é o Administrador
    if (loginEmail === ADMIN_EMAIL && loginPassword === ADMIN_PASSWORD) {
      localStorage.setItem("pixelpro_auth", JSON.stringify({ 
        email: loginEmail, 
        role: "admin",
        loginAt: new Date().toISOString()
      }));
      toast({ title: "Login realizado!", description: "Bem-vindo ao painel administrativo." });
      navigate("/admin");
    } else {
      // 2. Busca os usuários que você cadastrou no localStorage
      const users = getStoredUsers();
      // Procura um usuário que combine e-mail E senha exatamente como cadastrados
      const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
      
      if (user) {
        // Se encontrar, salva a sessão e redireciona para a home
        localStorage.setItem("pixelpro_auth", JSON.stringify({ 
          email: user.email,
          name: user.name,
          role: "user",
          loginAt: new Date().toISOString()
        }));
        
        toast({ title: "Login realizado!", description: `Bem-vindo de volta, ${user.name}!` });
        navigate("/home"); // Certifique-se de que esta rota existe no seu App.tsx
      } else {
        // Se não encontrar, exibe o erro que você está vendo
        toast({
          title: "Credenciais inválidas",
          description: "E-mail ou senha incorretos. Verifique se a conta foi criada.",
          variant: "destructive",
        });
      }
    }
    setIsLoading(false);
  }, 500);
};

  const handleSignup = (e: React.FormEvent) => {
  e.preventDefault();
  
  // 1. Mantém a verificação se as senhas são iguais
  if (signupPassword !== signupConfirmPassword) {
    toast({
      title: "Senhas não coincidem",
      description: "Por favor, verifique as senhas digitadas.",
      variant: "destructive",
    });
    return;
  }

  // 2. ADICIONA a nova validação de complexidade (8 caracteres, letra e símbolo)
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  if (!passwordRegex.test(signupPassword)) {
    toast({
      title: "Senha muito fraca",
      description: "A senha deve ter no mínimo 8 caracteres, incluir letras e pelo menos um caractere especial.",
      variant: "destructive",
    });
    return;
  }

  setIsLoading(true);

  // 3. Mantém a lógica de salvamento dentro do setTimeout
  setTimeout(() => {
    const users = getStoredUsers();
    
    // Verifica se o e-mail já existe
    if (users.some(u => u.email === signupEmail)) {
      toast({
        title: "E-mail já cadastrado",
        description: "Este e-mail já está em uso. Tente fazer login.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Cria e salva o novo usuário no localStorage
    const newUser: StoredUser = {
      email: signupEmail,
      password: signupPassword, // Agora já validada pelo Regex acima
      name: signupName,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem("pixelpro_users", JSON.stringify(users));
    
    toast({
      title: "Conta criada!",
      description: "Agora faça login para continuar.",
    });
    
    // Reseta o formulário e muda para a aba de login
    setActiveTab("login");
    setLoginEmail(newUser.email);
    setLoginPassword("");
    setIsLoading(false);
  }, 500);
};

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card/70 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-[0_0_25px_rgba(255,255,255,0.1)]">
         {/* Logo Centralizada */}
          <div className="flex flex-col items-center mb-8">
          <img 
            src={logoImg} 
            alt="Prime Visual" 
            className="w-70 h-auto mb-2 drop-shadow-2xl" 
          />
        <h2 className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
          Prime Visual Studio
      </h2>
    </div>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger 
                value="login" 
                className="data-[state=active]:border data-[state=active]:border-white"
              >
            Entrar
            </TabsTrigger>
              <TabsTrigger 
                value="signup" 
                className="data-[state=active]:border data-[state=active]:border-white"
              >
              Cadastrar
              </TabsTrigger>
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
                  <Label htmlFor="login-password">Senha</Label> {/* Alterado ID para login-password */}
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showLoginPassword ? "text" : "password"} // Usa o estado de login
                      placeholder="••••••••"
                      value={loginPassword} // CORRIGIDO: Agora usa loginPassword
                      onChange={(e) => setLoginPassword(e.target.value)} // CORRIGIDO: Agora usa setLoginPassword
                      required
                      className="h-12 pr-10" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)} // CORRIGIDO: Usa o olho do login
                      className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-muted-foreground hover:text-foreground"
                    >
                      {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
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
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showSignupPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      className="h-12 pr-10" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      /* top-0 e h-full garantem que o botão ocupe toda a altura do input, centralizando o ícone */
                      className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-muted-foreground hover:text-foreground"
                    >
                      {showSignupPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">Confirmar senha</Label>
                  <div className="relative">
                    <Input
                      id="signup-confirm-password"
                      type={showConfirmPassword ? "text" : "password"} // Estado independente
                      placeholder="••••••••"
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      required
                      className="h-12 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Função independente
                      className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
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
