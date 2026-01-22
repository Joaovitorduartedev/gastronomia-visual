import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Users, 
  DollarSign, 
  Clock, 
  CheckCircle2,
  ArrowLeft,
  TrendingUp,
  Filter,
  LogOut
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useRequireAuth } from "@/hooks/useAuth";

// Mock data
const mockOrders = [
  {
    id: "1",
    company: "Hamburgueria Gourmet",
    plan: "Premium",
    photos: 10,
    status: "production",
    consultant: "João Silva",
    date: "2024-01-15",
    value: 249,
  },
  {
    id: "2",
    company: "Pizzaria Bella Italia",
    plan: "Standard",
    photos: 5,
    status: "production",
    consultant: "Maria Santos",
    date: "2024-01-14",
    value: 149,
  },
  {
    id: "3",
    company: "Sushi Express",
    plan: "Premium",
    photos: 10,
    status: "resolved",
    consultant: "João Silva",
    date: "2024-01-10",
    value: 249,
  },
  {
    id: "4",
    company: "Doceria Sweet",
    plan: "Standard",
    photos: 5,
    status: "resolved",
    consultant: "Pedro Oliveira",
    date: "2024-01-08",
    value: 149,
  },
];

const consultants = [
  { id: "all", name: "Todos os consultores" },
  { id: "1", name: "João Silva" },
  { id: "2", name: "Maria Santos" },
  { id: "3", name: "Pedro Oliveira" },
];

export default function Admin() {
  const [selectedConsultant, setSelectedConsultant] = useState("all");
  const [selectedTab, setSelectedTab] = useState("production");
  const { isLoading } = useRequireAuth("/login");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  const filteredOrders = mockOrders.filter((order) => {
    const matchesConsultant = selectedConsultant === "all" || 
      consultants.find(c => c.id === selectedConsultant)?.name === order.consultant;
    const matchesStatus = order.status === selectedTab;
    return matchesConsultant && matchesStatus;
  });

  const totalRevenue = mockOrders
    .filter(o => selectedConsultant === "all" || consultants.find(c => c.id === selectedConsultant)?.name === o.consultant)
    .reduce((acc, order) => acc + order.value, 0);

  const totalOrders = mockOrders
    .filter(o => selectedConsultant === "all" || consultants.find(c => c.id === selectedConsultant)?.name === o.consultant)
    .length;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50">
        <div className="container-narrow section-padding !py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                <ArrowLeft size={20} />
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-sm">P</span>
                </div>
                <span className="font-bold">Prime Visual Admin</span>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut size={18} className="mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container-narrow section-padding">
        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <DollarSign size={24} className="text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Faturamento Total</p>
                <p className="text-2xl font-bold text-foreground">R$ {totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Package size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Pedidos</p>
                <p className="text-2xl font-bold text-foreground">{totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <Clock size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Em Produção</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockOrders.filter(o => o.status === "production").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <TrendingUp size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ticket Médio</p>
                <p className="text-2xl font-bold text-foreground">
                  R$ {totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filtrar por:</span>
          </div>
          <Select value={selectedConsultant} onValueChange={setSelectedConsultant}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
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

        {/* Orders Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="production" className="gap-2">
              <Clock size={16} />
              Em Produção
            </TabsTrigger>
            <TabsTrigger value="resolved" className="gap-2">
              <CheckCircle2 size={16} />
              Resolvidos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="production">
            <OrdersTable orders={filteredOrders} />
          </TabsContent>

          <TabsContent value="resolved">
            <OrdersTable orders={filteredOrders} />
          </TabsContent>
        </Tabs>

        {/* Commission Summary */}
        {selectedConsultant !== "all" && (
          <div className="mt-8 bg-card rounded-xl border border-border p-6">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Users size={20} />
              Resumo de Comissões - {consultants.find(c => c.id === selectedConsultant)?.name}
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Vendas Realizadas</p>
                <p className="text-xl font-bold text-foreground">
                  {mockOrders.filter(o => consultants.find(c => c.id === selectedConsultant)?.name === o.consultant).length}
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Total Vendido</p>
                <p className="text-xl font-bold text-foreground">
                  R$ {mockOrders.filter(o => consultants.find(c => c.id === selectedConsultant)?.name === o.consultant).reduce((acc, o) => acc + o.value, 0)}
                </p>
              </div>
              <div className="bg-accent/10 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Comissão (10%)</p>
                <p className="text-xl font-bold text-accent">
                  R$ {Math.round(mockOrders.filter(o => consultants.find(c => c.id === selectedConsultant)?.name === o.consultant).reduce((acc, o) => acc + o.value, 0) * 0.1)}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function OrdersTable({ orders }: { orders: typeof mockOrders }) {
  if (orders.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-12 text-center">
        <p className="text-muted-foreground">Nenhum pedido encontrado</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Empresa</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Plano</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Consultor</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Data</th>
              <th className="text-right p-4 text-sm font-semibold text-muted-foreground">Valor</th>
              <th className="text-right p-4 text-sm font-semibold text-muted-foreground">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <p className="font-medium text-foreground">{order.company}</p>
                  <p className="text-sm text-muted-foreground">{order.photos} fotos</p>
                </td>
                <td className="p-4">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                    order.plan === "Premium" 
                      ? "bg-accent/10 text-accent" 
                      : "bg-primary/10 text-primary"
                  }`}>
                    {order.plan}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground">{order.consultant}</td>
                <td className="p-4 text-muted-foreground">
                  {new Date(order.date).toLocaleDateString("pt-BR")}
                </td>
                <td className="p-4 text-right font-semibold text-foreground">
                  R$ {order.value}
                </td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm">
                    Ver Detalhes
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
