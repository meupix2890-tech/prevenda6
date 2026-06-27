import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Lock, Eye, EyeOff, LogOut, Bell, RefreshCw, Trash2,
  Eye as EyeIcon, QrCode, DollarSign, TrendingDown, Percent, Receipt, Search, Zap, ArrowDownRight, ArrowUpRight, Users
} from "lucide-react";
import { loadOrders, loadVisits, saveOrders, type Order } from "@/lib/orders-store";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Painel do ROI · GTA VI Store" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminDashboard,
});

const PASSWORD = "0101";
const AUTH_KEY = "gta6_admin_auth";

function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => { if (sessionStorage.getItem(AUTH_KEY) === "1") setAuthed(true); }, []);
  if (!authed) return <Login onAuth={() => { sessionStorage.setItem(AUTH_KEY, "1"); setAuthed(true); }} />;
  return <Dashboard onLogout={() => { sessionStorage.removeItem(AUTH_KEY); setAuthed(false); }} />;
}

function Login({ onAuth }: { onAuth: () => void }) {
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === PASSWORD) onAuth(); else { setErr(true); setPwd(""); }
  };
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-white text-black rounded-2xl flex items-center justify-center text-2xl font-bold mb-4">G</div>
          <h1 className="text-2xl font-semibold">Painel do <span className="text-zinc-400">ROI</span></h1>
          <p className="text-sm text-zinc-500 mt-1">Acesso restrito</p>
        </div>
        <form onSubmit={submit} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-4">
          <label className="block">
            <span className="block text-xs font-medium mb-2">Senha</span>
            <div className="flex items-center gap-2 bg-black border border-zinc-700 rounded-lg px-3">
              <Lock className="w-4 h-4 text-zinc-500" />
              <input
                type={show ? "text" : "password"}
                value={pwd}
                onChange={(e) => { setPwd(e.target.value); setErr(false); }}
                className="flex-1 bg-transparent py-3 text-sm outline-none"
                placeholder="••••"
                autoFocus
              />
              <button type="button" onClick={() => setShow(!show)} className="text-zinc-500 hover:text-white">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {err && <p className="text-xs text-red-400 mt-2">Senha incorreta</p>}
          </label>
          <button type="submit" className="w-full bg-white text-black rounded-lg py-3 text-sm font-semibold hover:bg-zinc-200 transition">Entrar</button>
        </form>
        <p className="text-center text-xs text-zinc-600 mt-6">
          <Link to="/" className="hover:text-zinc-400">← Voltar à loja</Link>
        </p>
      </div>
    </div>
  );
}

type Period = "hoje" | "ontem" | "7" | "30";

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [visits, setVisits] = useState<Record<string, number>>({});
  const [period, setPeriod] = useState<Period>("hoje");
  const [tab, setTab] = useState<"visao" | "vendas" | "funil">("visao");
  const [clock, setClock] = useState(() => new Date());

  useEffect(() => {
    const refresh = () => { setOrders(loadOrders()); setVisits(loadVisits()); };
    refresh();
    const t = setInterval(() => setClock(new Date()), 1000);
    window.addEventListener("orders:updated", refresh);
    window.addEventListener("storage", refresh);
    return () => { clearInterval(t); window.removeEventListener("orders:updated", refresh); window.removeEventListener("storage", refresh); };
  }, []);

  const range = useMemo(() => {
    const now = new Date();
    const end = new Date(now); end.setHours(23, 59, 59, 999);
    const start = new Date(now); start.setHours(0, 0, 0, 0);
    if (period === "ontem") { start.setDate(start.getDate() - 1); end.setDate(end.getDate() - 1); }
    if (period === "7") start.setDate(start.getDate() - 6);
    if (period === "30") start.setDate(start.getDate() - 29);
    return { start, end };
  }, [period]);

  const inRange = orders.filter((o) => {
    const t = new Date(o.createdAt).getTime();
    return t >= range.start.getTime() && t <= range.end.getTime();
  });
  const visitCount = Object.entries(visits).reduce((acc, [d, n]) => {
    const t = new Date(d + "T12:00:00").getTime();
    return t >= range.start.getTime() && t <= range.end.getTime() ? acc + n : acc;
  }, 0);
  const generated = inRange.length;
  const paid = inRange.filter((o) => o.status === "pago");
  const revenue = paid.reduce((a, o) => a + o.amount, 0);
  const generatedValue = inRange.reduce((a, o) => a + o.amount, 0);
  const conv = generated ? (paid.length / generated) * 100 : 0;
  const ticket = paid.length ? revenue / paid.length : 0;
  const downsell = inRange.filter((o) => o.edition === "standard").length;

  const fmt = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const dateStr = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });
  const timeStr = clock.toLocaleTimeString("pt-BR");

  const clear = () => {
    if (confirm("Limpar todos os pedidos?")) { saveOrders([]); setOrders([]); }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-60 border-r border-zinc-900 p-5 hidden md:flex flex-col">
        <div className="flex items-center gap-3 pb-5 border-b border-zinc-900">
          <div className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center font-bold">G</div>
          <div>
            <p className="font-semibold text-sm">Painel do ROI</p>
            <p className="text-[10px] text-zinc-500">Command Center</p>
          </div>
        </div>
        <nav className="mt-6 flex-1 space-y-1 text-sm">
          <SideItem icon={<EyeIcon className="w-4 h-4" />} label="Visão Geral" active />
          <SideItem icon={<Receipt className="w-4 h-4" />} label="Transações" />
          <SideItem icon={<Users className="w-4 h-4" />} label="Clientes" />
        </nav>
        <button onClick={onLogout} className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white mt-4">
          <LogOut className="w-3.5 h-3.5" /> Sair
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 max-w-[1400px]">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Visão Geral</h1>
            <p className="text-sm text-zinc-500 capitalize">{dateStr}</p>
          </div>
          <div className="flex items-center gap-1 bg-zinc-900 rounded-lg p-1">
            <PBtn active={period === "hoje"} onClick={() => setPeriod("hoje")}>Hoje</PBtn>
            <PBtn active={period === "ontem"} onClick={() => setPeriod("ontem")}>Ontem</PBtn>
            <PBtn active={period === "7"} onClick={() => setPeriod("7")}>7 dias</PBtn>
            <PBtn active={period === "30"} onClick={() => setPeriod("30")}>30 dias</PBtn>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="flex items-center gap-2 text-xs bg-zinc-900 rounded-full px-3 py-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> {timeStr}
          </span>
          <Link to="/checkout" search={{ edition: "standard" }} className="flex items-center gap-2 bg-white text-black text-xs font-semibold rounded-full px-3.5 py-1.5">
            <Zap className="w-3.5 h-3.5" /> Testar PIX
          </Link>
          <button onClick={() => setOrders(loadOrders())} className="flex items-center gap-2 bg-zinc-900 text-xs rounded-full px-3.5 py-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> Revisar Transações
          </button>
          <button className="p-1.5 bg-zinc-900 rounded-full"><Bell className="w-3.5 h-3.5" /></button>
          <button onClick={clear} className="p-1.5 bg-zinc-900 rounded-full hover:bg-red-900"><Trash2 className="w-3.5 h-3.5" /></button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          <Stat icon={<EyeIcon className="w-4 h-4" />} color="text-blue-400" label="Visitas" value={String(visitCount)} delta="+12.5%" up />
          <Stat icon={<Search className="w-4 h-4" />} color="text-cyan-400" label="Consultas" value={String(generated)} delta="+8.3%" up />
          <Stat icon={<QrCode className="w-4 h-4" />} color="text-violet-400" label="PIX Gerados" value={fmt(generatedValue)} delta="+18.2%" up />
          <Stat icon={<DollarSign className="w-4 h-4" />} color="text-green-400" label="PIX Pagos" value={fmt(revenue)} delta="0.0%" />
          <Stat icon={<TrendingDown className="w-4 h-4" />} color="text-rose-400" label="Downsell" value={String(downsell)} delta="-3.2%" />
          <Stat icon={<Percent className="w-4 h-4" />} color="text-orange-400" label="Conversão" value={`${conv.toFixed(1)}%`} delta="-1.1%" />
          <Stat icon={<Receipt className="w-4 h-4" />} color="text-emerald-400" label="Ticket Médio" value={fmt(ticket)} delta="+6.7%" up />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-zinc-900 rounded-lg p-1 w-fit mb-5">
          <TBtn active={tab === "visao"} onClick={() => setTab("visao")}>Visão geral</TBtn>
          <TBtn active={tab === "vendas"} onClick={() => setTab("vendas")}>Análise de Vendas</TBtn>
          <TBtn active={tab === "funil"} onClick={() => setTab("funil")}>Funil de Conversão</TBtn>
        </div>

        {/* Pedidos */}
        <Card title="Pedidos recentes" subtitle={`${inRange.length} no período`}>
          {inRange.length === 0 ? (
            <Empty />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs text-zinc-500 border-b border-zinc-900">
                  <tr><Th>ID</Th><Th>Cliente</Th><Th>Edição</Th><Th>Valor</Th><Th>Status</Th><Th>Gateway</Th><Th>Quando</Th></tr>
                </thead>
                <tbody>
                  {inRange.map((o) => (
                    <tr key={o.id} className="border-b border-zinc-900/50 hover:bg-zinc-900/40">
                      <Td className="font-mono text-xs text-zinc-400">{o.id.slice(0, 12)}</Td>
                      <Td>
                        <div className="text-sm">{o.customer.name || "—"}</div>
                        <div className="text-xs text-zinc-500">{o.customer.email}</div>
                      </Td>
                      <Td>{o.title.replace(" Edition", "")}</Td>
                      <Td className="font-semibold">{fmt(o.amount)}</Td>
                      <Td><Status status={o.status} /></Td>
                      <Td className="text-xs text-zinc-400">{o.provider}</Td>
                      <Td className="text-xs text-zinc-500">{new Date(o.createdAt).toLocaleString("pt-BR")}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Meios de pagamento */}
        <div className="mt-6">
          <Card title="Meios de Pagamento" subtitle={`${paid.length} transações`}>
            <p className="text-xs text-zinc-500 uppercase tracking-wider">Receita Total</p>
            <p className="text-3xl font-light mt-1 mb-6">{fmt(revenue)}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Mini label="PIX" value="100%" tone="bg-green-500/10 text-green-300" />
              <Mini label="Cartão" value="0%" tone="bg-red-500/10 text-red-300" />
              <Mini label="Boleto" value="0%" tone="bg-blue-500/10 text-blue-300" />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-zinc-900 text-sm">
              <Kpi label="Gerados" value={fmt(generatedValue)} />
              <Kpi label="Pagos" value={String(paid.length)} accent="text-green-400" />
              <Kpi label="Pendentes" value={String(inRange.filter((o) => o.status === "pendente").length)} accent="text-yellow-400" />
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

function SideItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${active ? "bg-zinc-900 text-white" : "text-zinc-400 hover:bg-zinc-900/50"}`}>
      {icon}{label}
    </div>
  );
}
function PBtn({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return <button onClick={onClick} className={`text-xs px-3 py-1.5 rounded-md ${active ? "bg-white text-black font-semibold" : "text-zinc-400 hover:text-white"}`}>{children}</button>;
}
function TBtn({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return <button onClick={onClick} className={`text-xs px-3.5 py-1.5 rounded-md ${active ? "bg-white text-black font-semibold" : "text-zinc-400 hover:text-white"}`}>{children}</button>;
}
function Stat({ icon, color, label, value, delta, up }: { icon: React.ReactNode; color: string; label: string; value: string; delta: string; up?: boolean }) {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3">
      <div className="flex items-center justify-between">
        <div className={`${color}`}>{icon}</div>
        <span className={`text-[10px] flex items-center gap-0.5 ${up ? "text-green-400" : "text-zinc-500"}`}>
          {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />} {delta}
        </span>
      </div>
      <p className="text-lg font-semibold mt-2 truncate">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-zinc-500 mt-0.5">{label}</p>
    </div>
  );
}
function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5">
      <header className="mb-4">
        <h2 className="font-semibold">{title}</h2>
        {subtitle && <p className="text-xs text-zinc-500">{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}
function Empty() {
  return (
    <div className="text-center py-12">
      <div className="w-12 h-12 mx-auto rounded-full bg-zinc-900 flex items-center justify-center mb-3">
        <Receipt className="w-5 h-5 text-zinc-600" />
      </div>
      <p className="text-sm text-zinc-400">Nenhuma transação no período</p>
      <p className="text-xs text-zinc-600 mt-1">Os dados aparecem em tempo real quando alguém finaliza um checkout</p>
    </div>
  );
}
function Th({ children }: { children: React.ReactNode }) { return <th className="text-left font-medium py-2.5 px-3">{children}</th>; }
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <td className={`py-3 px-3 ${className}`}>{children}</td>; }
function Status({ status }: { status: Order["status"] }) {
  const map = {
    pendente: "bg-yellow-500/10 text-yellow-300",
    pago: "bg-green-500/10 text-green-300",
    expirado: "bg-zinc-500/10 text-zinc-400",
  };
  return <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded ${map[status]}`}>{status}</span>;
}
function Mini({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className={`rounded-lg px-4 py-3 ${tone}`}>
      <p className="text-xs opacity-80">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}
function Kpi({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div>
      <p className="text-xs text-zinc-500">{label}</p>
      <p className={`font-semibold ${accent || ""}`}>{value}</p>
    </div>
  );
}
