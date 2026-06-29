import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect } from "react";
import { ChevronLeft, Lock, Check, Copy, QrCode, Loader2 } from "lucide-react";
import standardImg from "@/assets/gta-standard.jpg";
import ultimateImg from "@/assets/gta-ultimate.jpg";
import { createPixCharge, checkPixStatus } from "@/lib/pix.functions";
import { addOrder, updateOrder } from "@/lib/orders-store";

type CheckoutSearch = { edition?: "standard" | "ultimate" };

export const Route = createFileRoute("/checkout")({
  validateSearch: (s: Record<string, unknown>): CheckoutSearch => ({
    edition: s.edition === "ultimate" ? "ultimate" : "standard",
  }),
  head: () => ({ meta: [{ title: "Checkout PIX – Grand Theft Auto VI" }] }),
  component: CheckoutPage,
});

const EDITIONS = {
  standard: { title: "Standard Edition", price: 249.9, img: standardImg, items: ["Grand Theft Auto VI", "Pacote Vintage Vice City", "1 mês de GTA+"] },
  ultimate: { title: "Ultimate Edition", price: 359.9, img: ultimateImg, items: ["Grand Theft Auto VI", "Melhoria Ultimate Edition", "Pacote Vintage Vice City", "1 mês de GTA+"] },
};

function CheckoutPage() {
  const { edition = "standard" } = Route.useSearch();
  const navigate = useNavigate();
  const ed = EDITIONS[edition as "standard" | "ultimate"];
  const createPix = useServerFn(createPixCharge);
  const checkStatus = useServerFn(checkPixStatus);

  const [step, setStep] = useState<"form" | "pix" | "done">("form");
  const [form, setForm] = useState({ email: "", name: "", cpf: "" });
  const [copied, setCopied] = useState(false);
  const [seconds, setSeconds] = useState(15 * 60);
  const [loading, setLoading] = useState(false);
  const [pix, setPix] = useState<{ id: string; brCode: string; brCodeBase64: string | null; provider: string } | null>(null);
  const [orderId, setOrderId] = useState<string>("");

  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const total = ed.price;

  useEffect(() => {
    if (step !== "pix") return;
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [step]);

  // Polling de status do PIX
  useEffect(() => {
    if (step !== "pix" || !pix) return;
    const t = setInterval(async () => {
      try {
        const { paid } = await checkStatus({ data: { id: pix.id } });
        if (paid) {
          updateOrder(orderId, { status: "pago", paidAt: new Date().toISOString() });
          setStep("done");
        }
      } catch { /* noop */ }
    }, 5000);
    return () => clearInterval(t);
  }, [step, pix, orderId, checkStatus]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const maskCPF = (v: string) => v.replace(/\D/g, "").slice(0, 11).replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  const isValidCPF = (cpfRaw: string) => {
    const c = cpfRaw.replace(/\D/g, "");
    if (c.length !== 11 || /^(\d)\1{10}$/.test(c)) return false;
    let s = 0;
    for (let i = 0; i < 9; i++) s += parseInt(c[i]) * (10 - i);
    let d = (s * 10) % 11; if (d === 10) d = 0;
    if (d !== parseInt(c[9])) return false;
    s = 0;
    for (let i = 0; i < 10; i++) s += parseInt(c[i]) * (11 - i);
    d = (s * 10) % 11; if (d === 10) d = 0;
    return d === parseInt(c[10]);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidCPF(form.cpf)) { alert("CPF inválido. Digite um CPF válido."); return; }
    setLoading(true);
    try {
      const res = await createPix({
        data: {
          amount: total,
          description: `${ed.title} – Grand Theft Auto VI`,
          customer: form,
        },
      });
      setPix(res);
      const id = `ord_${Date.now()}`;
      setOrderId(id);
      addOrder({
        id,
        pixId: res.id,
        edition: edition as "standard" | "ultimate",
        title: ed.title,
        amount: total,
        customer: form,
        status: "pendente",
        provider: res.provider,
        createdAt: new Date().toISOString(),
      });
      setStep("pix");
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Não foi possível gerar o PIX.";
      alert(`Erro ao gerar PIX: ${msg}`);
    } finally {
      setLoading(false);
    }
  };


  const copyPix = async () => {
    if (!pix) return;
    try { await navigator.clipboard.writeText(pix.brCode); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* noop */ }
  };

  const confirmManually = () => {
    updateOrder(orderId, { status: "pago", paidAt: new Date().toISOString() });
    setStep("done");
  };

  if (step === "done") {
    return (
      <div className="min-h-screen bg-[#00439c] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#003478] rounded-lg p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500 mx-auto mb-5 flex items-center justify-center">
            <Check className="w-9 h-9" strokeWidth={3} />
          </div>
          <h1 className="text-2xl font-light mb-2">Pagamento confirmado!</h1>
          <p className="text-sm opacity-80 mb-6">Sua pré-venda de {ed.title} foi registrada. Enviaremos atualizações para <strong>{form.email || "seu@email.com"}</strong>.</p>
          <p className="text-xs opacity-60 mb-6">Pedido {orderId}</p>
          <Link to="/" className="inline-block bg-[#f47024] hover:bg-[#d85e15] rounded-full px-6 py-3 text-sm font-medium">Voltar à loja</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#00439c] text-white">
      <div className="bg-black/40 py-4">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between">
          <button onClick={() => step === "pix" ? setStep("form") : navigate({ to: "/" })} className="flex items-center gap-2 text-sm hover:opacity-80">
            <ChevronLeft className="w-4 h-4" /> Voltar
          </button>
          <div className="flex items-center gap-2 text-xs opacity-80">
            <Lock className="w-3.5 h-3.5" /> Checkout seguro
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-10">
        <h1 className="text-3xl font-light mb-8">{step === "form" ? "Finalizar pré-venda" : "Pague com PIX"}</h1>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {step === "form" ? (
            <form onSubmit={submit} className="bg-[#003478] rounded-lg p-6 space-y-6">
              <section>
                <h2 className="text-lg font-semibold mb-4">Seus dados</h2>
                <div className="space-y-4">
                  <Field label="E-mail" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="seu@email.com" />
                  <Field label="Nome completo" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Como no documento" />
                  <Field label="CPF" required value={form.cpf} onChange={(v) => setForm({ ...form, cpf: maskCPF(v) })} placeholder="000.000.000-00" maxLength={14} />
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-4">Forma de pagamento</h2>
                <div className="border-2 border-[#32BCAD] bg-[#32BCAD]/10 rounded-lg p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#32BCAD] flex items-center justify-center flex-shrink-0">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">PIX</p>
                    <p className="text-xs opacity-80">Aprovação imediata · sem taxas adicionais</p>
                  </div>
                  <Check className="w-5 h-5 text-[#32BCAD]" />
                </div>
              </section>

              <button type="submit" disabled={loading} className="w-full bg-[#f47024] hover:bg-[#d85e15] disabled:opacity-60 text-white rounded-full py-3.5 font-medium transition flex items-center justify-center gap-2">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Gerando PIX..." : `Gerar código PIX · ${fmt(total)}`}
              </button>
            </form>
          ) : pix && (
            <div className="bg-[#003478] rounded-lg p-6 space-y-6">
              <div className="text-center">
                <p className="text-sm opacity-80 mb-1">Total a pagar</p>
                <p className="text-4xl font-light mb-1">{fmt(total)}</p>
                <p className="text-xs opacity-70">Expira em <span className="font-mono font-semibold text-[#32BCAD]">{mm}:{ss}</span></p>
                
              </div>

              <div className="bg-white p-5 rounded-lg mx-auto w-fit">
                <img
                  alt="QR Code PIX"
                  width={220}
                  height={220}
                  src={pix.brCodeBase64 ? `data:image/png;base64,${pix.brCodeBase64}` : `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(pix.brCode)}`}
                />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider opacity-70 mb-2">PIX copia e cola</p>
                <div className="bg-black/30 border border-white/20 rounded p-3 text-xs font-mono break-all">{pix.brCode}</div>
                <button onClick={copyPix} className="mt-3 w-full bg-[#32BCAD] hover:bg-[#28a594] rounded-full py-2.5 text-sm font-medium flex items-center justify-center gap-2">
                  {copied ? <><Check className="w-4 h-4" /> Copiado!</> : <><Copy className="w-4 h-4" /> Copiar código PIX</>}
                </button>
              </div>

              <ol className="text-xs opacity-80 space-y-1.5 list-decimal list-inside">
                <li>Abra o app do seu banco e entre na área PIX</li>
                <li>Escolha pagar com QR Code ou Copia e Cola</li>
                <li>Confirme as informações e finalize</li>
              </ol>

              <p className="text-xs text-center opacity-70 flex items-center justify-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" /> Aguardando confirmação automática...
              </p>

              <button onClick={confirmManually} className="w-full bg-[#f47024] hover:bg-[#d85e15] rounded-full py-3 text-sm font-medium">
                Já paguei — confirmar
              </button>
            </div>
          )}

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
              {ed.items.map((i: string) => <li key={i}>• {i}</li>)}
            </ul>
            <div className="space-y-2 text-sm border-t border-white/15 pt-4">
              <Row label="Subtotal" value={fmt(ed.price)} />
              <Row label="Total" value={fmt(total)} bold />
            </div>

            {step === "form" && (
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={() => navigate({ to: "/checkout", search: { edition: "standard" } })} className={`flex-1 text-xs py-2 rounded border ${edition === "standard" ? "border-white bg-white/10" : "border-white/30"}`}>Standard</button>
                <button type="button" onClick={() => navigate({ to: "/checkout", search: { edition: "ultimate" } })} className={`flex-1 text-xs py-2 rounded border ${edition === "ultimate" ? "border-white bg-white/10" : "border-white/30"}`}>Ultimate</button>
              </div>
            )}
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
