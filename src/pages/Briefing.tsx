import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, CheckCircle, Package } from "lucide-react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const consultants = [
  { id: "1", name: "João Silva" },
  { id: "2", name: "Maria Santos" },
  { id: "3", name: "Pedro Oliveira" },
  { id: "4", name: "Ana Costa" },
];

const plans = {
  standard: { name: "Standard", price: "149", photos: 5 },
  premium: { name: "Premium", price: "249", photos: 10 },
};

export default function Briefing() {
  const [searchParams] = useSearchParams();
  const selectedPlanKey = searchParams.get("plan") || "standard";
  const selectedPlan = plans[selectedPlanKey as keyof typeof plans] || plans.standard;

  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    whatsapp: "",
    consultant: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles].slice(0, selectedPlan.photos));
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Pedido Recebido!
          </h1>
          <p className="text-muted-foreground mb-8">
            Recebemos suas fotos e em breve você será redirecionado para o pagamento. 
            Acompanhe o status pelo e-mail cadastrado.
          </p>
          <Link to="/">
            <Button variant="accent" size="lg">
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container-narrow section-padding !py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={20} />
              <span className="font-medium">Voltar</span>
            </Link>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">P</span>
              </div>S
              <span className="font-bold text-foreground">Visual Prime</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container-narrow section-padding">
        <div className="max-w-2xl mx-auto">
          {/* Plan Summary */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Package size={24} className="text-accent" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Pacote {selectedPlan.name}</h2>
                  <p className="text-primary-foreground/70 text-sm">
                    {selectedPlan.photos} fotos profissionais
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">R$ {selectedPlan.price}</p>
                <p className="text-primary-foreground/70 text-sm">pagamento único</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Complete seu pedido
              </h1>
              <p className="text-muted-foreground">
                Preencha os dados abaixo e envie suas fotos para transformação
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Nome da Empresa *</Label>
                  <Input
                    id="companyName"
                    placeholder="Ex: Hamburgueria do João"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                    className="mt-1.5"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp *</Label>
                    <Input
                      id="whatsapp"
                      placeholder="(11) 99999-9999"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      required
                      className="mt-1.5"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="consultant">Consultor que lhe atendeu</Label>
                  <Select
                    value={formData.consultant}
                    onValueChange={(value) => setFormData({ ...formData, consultant: value })}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Selecione o consultor" />
                    </SelectTrigger>
                    <SelectContent>
                      {consultants.map((consultant) => (
                        <SelectItem key={consultant.id} value={consultant.id}>
                          {consultant.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <Label>Envie suas fotos ({files.length}/{selectedPlan.photos})</Label>
                
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-accent/50 transition-colors">
                  <input
                    type="file"
                    id="fileUpload"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={files.length >= selectedPlan.photos}
                  />
                  <label htmlFor="fileUpload" className="cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Upload size={28} className="text-accent" />
                    </div>
                    <p className="font-medium text-foreground mb-1">
                      Clique para enviar ou arraste as imagens
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG ou JPEG (máx. {selectedPlan.photos} fotos)
                    </p>
                  </label>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                            <span className="text-sm">📷</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground truncate max-w-[200px]">
                              {file.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full"
                disabled={isSubmitting || files.length === 0 || !formData.companyName || !formData.email || !formData.whatsapp}
              >
                {isSubmitting ? "Enviando..." : "Continuar para Pagamento"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                🔒 Seus dados estão protegidos e o pagamento é 100% seguro
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
