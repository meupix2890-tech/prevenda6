import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, Lock, CreditCard, Check } from "lucide-react";
import standardImg from "@/assets/gta-standard.jpg";
import ultimateImg from "@/assets/gta-ultimate.jpg";

type CheckoutSearch = { edition?: "standard" | "ultimate" };

export const Route = createFileRoute("/checkout")({
  validateSearch: (s: Record<string, unknown>): CheckoutSearch => ({
    edition: s.edition === "ultimate" ? "ultimate" : "standard",
  }),
  head: () => ({ meta: [{ title: "Checkout – Grand Theft Auto VI" }] }),
  component: CheckoutPage,
});

const EDITIONS = {
  standard: { title: "Standard Edition", price: 449.9, img: standardImg, items: ["Grand Theft Auto VI", "Pacote Vintage Vice City", "1 mês de GTA+"] },
  ultimate: { title: "Ultimate Edition", price: 549.9, img: ultimateImg, items: ["Grand Theft Auto VI", "Melhoria Ultimate Edition", "Pacote Vintage Vice City", "1 mês de GTA+"] },
};

function CheckoutPage() {
  const { edition = "standard" } = Route.useSearch();
  const navigate = useNavigate();
  const ed = EDITIONS[edition];
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", name: "", card: "", exp: "", cvv: "", cep: "" });

  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const tax = ed.price * 0.05;
  const total = ed.price + tax;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1500);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-[#00439c] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#003478] rounded-lg p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500 mx-auto mb-5 flex items-center justify-center">
            <Check className="w-9 h-9" strokeWidth={3} />
          </div>
          <h1 className="text-2xl font-light mb-2">Pedido confirmado!</h1>
          <p className="text-sm opacity-80 mb-6">Sua pré-venda de {ed.title} foi registrada. Você receberá um e-mail em <strong>{form.email || "seu@email.com"}</strong> próximo ao lançamento.</p>
          <p className="text-xs opacity-60 mb-6">Pedido #GTA6-{Math.floor(Math.random() * 900000 + 100000)}</p>
          <Link to="/" className="inline-block bg-[#f47024] hover:bg-[#d85e15] rounded-full px-6 py-3 text-sm font-medium">Voltar à loja</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#00439c] text-white">
      <div className="bg-black/40 py-4">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between">
          <button onClick={() => navigate({ to: "/" })} className="flex items-center gap-2 text-sm hover:opacity-80">
            <ChevronLeft className="w-4 h-4" /> Voltar
          </button>
          <div className="flex items-center gap-2 text-xs opacity-80">
            <Lock className="w-3.5 h-3.5" /> Checkout seguro
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-10">
        <h1 className="text-3xl font-light mb-8">Finalizar pré-venda</h1>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          <form onSubmit={submit} className="bg-[#003478] rounded-lg p-6 space-y-6">
            <section>
              <h2 className="text-lg font-semibold mb-4">Contato</h2>
              <Field label="E-mail" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="seu@email.com" />
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4">Endereço de cobrança</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nome completo" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Como no cartão" />
                <Field label="CEP" required value={form.cep} onChange={(v) => setForm({ ...form, cep: v })} placeholder="00000-000" />
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> Pagamento
              </h2>
              <div className="space-y-4">
                <Field label="Número do cartão" required value={form.card} onChange={(v) => setForm({ ...form, card: v })} placeholder="1234 5678 9012 3456" maxLength={19} />
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Validade" required value={form.exp} onChange={(v) => setForm({ ...form, exp: v })} placeholder="MM/AA" maxLength={5} />
                  <Field label="CVV" required value={form.cvv} onChange={(v) => setForm({ ...form, cvv: v })} placeholder="123" maxLength={4} />
                </div>
              </div>
            </section>

            <button type="submit" disabled={loading} className="w-full bg-[#f47024] hover:bg-[#d85e15] disabled:opacity-60 text-white rounded-full py-3.5 font-medium transition">
              {loading ? "Processando..." : `Pagar ${fmt(total)}`}
            </button>
            <p className="text-xs opacity-70 text-center">Cobrança simulada · Sem cobrança real</p>
          </form>

          <aside className="bg-[#003478] rounded-lg p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">Resumo do pedido</h2>
            <div className="flex gap-3 mb-5 pb-5 border-b border-white/15">
              <img src={ed.img} alt={ed.title} className="w-20 h-20 rounded object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{ed.title}</p>
                <p className="text-xs opacity-70">Grand Theft Auto VI · PS5</p>
                <p className="text-xs opacity-70 mt-1">Pré-venda · 19/11/2026</p>
              </div>
            </div>
            <ul className="space-y-1.5 text-xs opacity-80 mb-5">
              {ed.items.map((i) => <li key={i}>• {i}</li>)}
            </ul>
            <div className="space-y-2 text-sm border-t border-white/15 pt-4">
              <Row label="Subtotal" value={fmt(ed.price)} />
              <Row label="Taxas" value={fmt(tax)} />
              <Row label="Total" value={fmt(total)} bold />
            </div>

            <div className="flex gap-2 mt-4">
              <button type="button" onClick={() => navigate({ to: "/checkout", search: { edition: "standard" } })} className={`flex-1 text-xs py-2 rounded border ${edition === "standard" ? "border-white bg-white/10" : "border-white/30"}`}>Standard</button>
              <button type="button" onClick={() => navigate({ to: "/checkout", search: { edition: "ultimate" } })} className={`flex-1 text-xs py-2 rounded border ${edition === "ultimate" ? "border-white bg-white/10" : "border-white/30"}`}>Ultimate</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, ...rest }: { label: string; value: string; onChange: (v: string) => void } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider opacity-70 mb-1.5">{label}</span>
      <input {...rest} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-black/30 border border-white/20 focus:border-white/60 rounded px-3 py-2.5 text-sm outline-none" />
    </label>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "text-base font-semibold pt-2" : "opacity-80"}`}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}
