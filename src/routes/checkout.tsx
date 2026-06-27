import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ChevronLeft, Lock, Check, Copy, QrCode } from "lucide-react";
import heroCover from "@/assets/hero-cover.webp.asset.json";
import gta6poster from "@/assets/gta6-poster.webp.asset.json";
import gta6trailer from "@/assets/gta6-trailer.webp.asset.json";
import gta6trailer2 from "@/assets/gta6-trailer2.webp.asset.json";
import gta6scene from "@/assets/gta6-scene.webp.asset.json";
import gta6logo from "@/assets/gta6-logo.webp.asset.json";

type EditionKey = "standard" | "deluxe";
type PlatformKey = "ps5" | "xbox" | "pc";
type CheckoutSearch = { edition?: EditionKey; platform?: PlatformKey };

export const Route = createFileRoute("/checkout")({
  validateSearch: (s: Record<string, unknown>): CheckoutSearch => ({
    edition: s.edition === "deluxe" ? "deluxe" : "standard",
    platform: s.platform === "xbox" ? "xbox" : s.platform === "pc" ? "pc" : "ps5",
  }),
  head: () => ({ meta: [{ title: "Checkout PIX – Grand Theft Auto VI" }] }),
  component: CheckoutPage,
});

const PLATFORM_LABEL: Record<PlatformKey, string> = {
  ps5: "PlayStation 5",
  xbox: "Xbox Series X|S",
  pc: "PC (Rockstar Launcher)",
};

const PRICES: Record<PlatformKey, Record<EditionKey, number>> = {
  ps5:  { standard: 244.93, deluxe: 349.93 },
  xbox: { standard: 244.93, deluxe: 349.93 },
  pc:   { standard: 209.93, deluxe: 314.93 },
};

const COVERS: Record<PlatformKey, Record<EditionKey, string>> = {
  ps5:  { standard: heroCover.url, deluxe: gta6poster.url },
  xbox: { standard: gta6trailer.url, deluxe: gta6trailer2.url },
  pc:   { standard: gta6scene.url, deluxe: gta6logo.url },
};

function getEdition(platform: PlatformKey, edition: EditionKey) {
  const isDeluxe = edition === "deluxe";
  const store = platform === "ps5" ? "PS Store" : platform === "xbox" ? "Xbox Store" : "Rockstar Launcher";
  return {
    title: isDeluxe ? "Edição Deluxe" : "Edição Standard",
    price: PRICES[platform][edition],
    img: COVERS[platform][edition],
    items: isDeluxe
      ? ["GTA VI — jogo completo", "Acesso antecipado (3 dias)", "2 veículos exclusivos", "Pacote de roupas premium", "R$ 1.000.000 in-game"]
      : ["GTA VI — jogo completo", "Skin exclusiva de pré-venda", "R$ 500.000 in-game", platform === "pc" ? "Chave por e-mail" : `Entrega digital na ${store}`],
  };
}

function genPixCode(amount: number) {
  const val = amount.toFixed(2);
  const id = Math.random().toString(36).slice(2, 10).toUpperCase();
  return `00020126580014BR.GOV.BCB.PIX0136pix@gta6store.com.br0210GTA6-${id}5204000053039865406${val}5802BR5913GTA VI STORE6009SAO PAULO62100506${id}6304A1B2`;
}

function CheckoutPage() {
  const { edition = "standard", platform = "ps5" } = Route.useSearch();
  const platformLabel = platform === "xbox" ? "Xbox Series S" : "PlayStation 5";
  const navigate = useNavigate();
  const ed = EDITIONS[edition as "standard" | "ultimate"];
  const [step, setStep] = useState<"form" | "pix" | "done">("form");
  const [form, setForm] = useState({ email: "", name: "", cpf: "" });
  const [copied, setCopied] = useState(false);
  const [seconds, setSeconds] = useState(15 * 60);
  const [pixCode] = useState(() => genPixCode(ed.price * 1.05));

  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const tax = ed.price * 0.05;
  const total = ed.price + tax;

  useEffect(() => {
    if (step !== "pix") return;
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [step]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("pix");
  };

  const copyPix = async () => {
    try { await navigator.clipboard.writeText(pixCode); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* noop */ }
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
                  <Field label="CPF" required value={form.cpf} onChange={(v) => setForm({ ...form, cpf: v })} placeholder="000.000.000-00" maxLength={14} />
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

              <button type="submit" className="w-full bg-[#f47024] hover:bg-[#d85e15] text-white rounded-full py-3.5 font-medium transition">
                Gerar código PIX · {fmt(total)}
              </button>
              <p className="text-xs opacity-70 text-center">Pagamento simulado · sem cobrança real</p>
            </form>
          ) : (
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
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(pixCode)}`}
                />
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider opacity-70 mb-2">PIX copia e cola</p>
                <div className="bg-black/30 border border-white/20 rounded p-3 text-xs font-mono break-all">{pixCode}</div>
                <button onClick={copyPix} className="mt-3 w-full bg-[#32BCAD] hover:bg-[#28a594] rounded-full py-2.5 text-sm font-medium flex items-center justify-center gap-2">
                  {copied ? <><Check className="w-4 h-4" /> Copiado!</> : <><Copy className="w-4 h-4" /> Copiar código PIX</>}
                </button>
              </div>

              <ol className="text-xs opacity-80 space-y-1.5 list-decimal list-inside">
                <li>Abra o app do seu banco e entre na área PIX</li>
                <li>Escolha pagar com QR Code ou Copia e Cola</li>
                <li>Confirme as informações e finalize</li>
              </ol>

              <button onClick={() => setStep("done")} className="w-full bg-[#f47024] hover:bg-[#d85e15] rounded-full py-3 text-sm font-medium">
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
                <p className="text-xs opacity-70">Grand Theft Auto VI · {platformLabel}</p>
                <p className="text-xs opacity-70 mt-1">Pré-venda · 19/11/2026</p>
              </div>
            </div>
            <ul className="space-y-1.5 text-xs opacity-80 mb-5">
              {ed.items.map((i: string) => <li key={i}>• {i}</li>)}
            </ul>
            <div className="space-y-2 text-sm border-t border-white/15 pt-4">
              <Row label="Subtotal" value={fmt(ed.price)} />
              <Row label="Taxas" value={fmt(tax)} />
              <Row label="Total" value={fmt(total)} bold />
            </div>

            {step === "form" && (
              <>
                <div className="flex gap-2 mt-4">
                  <button type="button" onClick={() => navigate({ to: "/checkout", search: { edition: "standard", platform } })} className={`flex-1 text-xs py-2 rounded border ${edition === "standard" ? "border-white bg-white/10" : "border-white/30"}`}>Standard</button>
                  <button type="button" onClick={() => navigate({ to: "/checkout", search: { edition: "ultimate", platform } })} className={`flex-1 text-xs py-2 rounded border ${edition === "ultimate" ? "border-white bg-white/10" : "border-white/30"}`}>Ultimate</button>
                </div>
                <div className="flex gap-2 mt-2">
                  <button type="button" onClick={() => navigate({ to: "/checkout", search: { edition, platform: "ps5" } })} className={`flex-1 text-xs py-2 rounded border ${platform === "ps5" ? "border-white bg-white/10" : "border-white/30"}`}>PlayStation 5</button>
                  <button type="button" onClick={() => navigate({ to: "/checkout", search: { edition, platform: "xbox" } })} className={`flex-1 text-xs py-2 rounded border ${platform === "xbox" ? "border-white bg-white/10" : "border-white/30"}`}>Xbox Series S</button>
                </div>
              </>
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
