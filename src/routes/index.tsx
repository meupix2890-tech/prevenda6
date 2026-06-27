import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Heart, Gamepad2, Globe, User, Headphones, Vibrate, Volume2, Play, ChevronLeft, ChevronRight, Plus, Minus, X, Star, Check, Monitor } from "lucide-react";
import heroCover from "@/assets/hero-cover.webp.asset.json";
import trailer2 from "@/assets/gta6-trailer2.webp.asset.json";
import gta6poster from "@/assets/gta6-poster.webp.asset.json";
import gta6scene from "@/assets/gta6-scene.webp.asset.json";
import gta6trailer from "@/assets/gta6-trailer.webp.asset.json";
import gta6logo from "@/assets/gta6-logo.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grand Theft Auto VI · Pré-venda PS5, Xbox e PC" },
      { name: "description", content: "Pré-venda de Grand Theft Auto VI para PlayStation 5, Xbox Series X|S e PC. Edições Standard e Deluxe a partir de R$ 209,93." },
      { property: "og:title", content: "Grand Theft Auto VI · Pré-venda" },
      { property: "og:description", content: "Vice City. Leonida. Uma nova era. Reserve sua edição Standard ou Deluxe." },
      { property: "og:image", content: heroCover.url },
    ],
  }),
  component: GTAVIPage,
});

const TRAILER_ID = "VQRLujxTm3c";
const TRAILER_1_ID = "QdBZY2fkU-0";

type PlatformKey = "ps5" | "xbox" | "pc";
type EditionKey = "standard" | "deluxe";

const PLATFORMS: { key: PlatformKey; name: string; sub: string; grad: string; icon: typeof Gamepad2 }[] = [
  { key: "ps5", name: "PlayStation 5", sub: "PS5 · PS5 Pro Enhanced", grad: "from-[#0070d1] to-[#003478]", icon: Gamepad2 },
  { key: "xbox", name: "Xbox Series X|S", sub: "Series X · Series S", grad: "from-[#107C10] to-[#0a4a0a]", icon: Gamepad2 },
  { key: "pc", name: "PC", sub: "Rockstar Games Launcher", grad: "from-[#b45309] to-[#451a03]", icon: Monitor },
];

const STORE_LABEL: Record<PlatformKey, string> = { ps5: "PS Store", xbox: "Xbox Store", pc: "Rockstar Launcher" };
const PRICES: Record<PlatformKey, Record<EditionKey, number>> = {
  ps5:  { standard: 244.93, deluxe: 349.93 },
  xbox: { standard: 244.93, deluxe: 349.93 },
  pc:   { standard: 209.93, deluxe: 314.93 },
};

const COVERS: Record<PlatformKey, Record<EditionKey, string>> = {
  ps5:  { standard: heroCover.url,  deluxe: gta6poster.url },
  xbox: { standard: gta6trailer.url, deluxe: trailer2.url },
  pc:   { standard: gta6scene.url,   deluxe: gta6logo.url },
};

const fmtBRL = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function getEditions(platform: PlatformKey) {
  const store = STORE_LABEL[platform];
  return [
    {
      key: "standard" as const,
      title: "Edição Standard",
      tag: `Standard · ${PLATFORMS.find(p => p.key === platform)!.name}`,
      img: COVERS[platform].standard,
      price: PRICES[platform].standard,
      desc: platform === "pc" ? "Chave Rockstar Games Launcher + bônus." : "Jogo completo + bônus de pré-venda.",
      items: [
        "GTA VI — jogo completo",
        "Skin exclusiva de pré-venda",
        "R$ 500.000 in-game",
        platform === "pc" ? "Chave enviada por e-mail" : `Entrega digital na ${store}`,
      ],
    },
    {
      key: "deluxe" as const,
      title: "Edição Deluxe",
      tag: `Deluxe · ${PLATFORMS.find(p => p.key === platform)!.name}`,
      img: COVERS[platform].deluxe,
      price: PRICES[platform].deluxe,
      desc: "Conteúdo extra e acesso antecipado de 3 dias.",
      items: [
        "Tudo da Standard",
        "Acesso antecipado (3 dias)",
        "2 veículos exclusivos",
        "Pacote de roupas premium",
        "R$ 1.000.000 in-game",
      ],
    },
  ];
}

const features = [
  { icon: Vibrate, title: "Resposta tátil", desc: "As vibrações responsivas reagem às suas escolhas e simulam fatores ambientais em todo o vasto estado de Leonida e na Vice City dos dias atuais." },
  { icon: Headphones, title: "Áudio 3D imersivo", desc: "Mergulhe na paisagem sonora única de Leonida com posicionamento de áudio aprimorado e altamente preciso." },
  { icon: Volume2, title: "Efeitos no controle", desc: "Interações acentuadas por efeitos sonoros notáveis vindos do controle, aprimorados pela resposta tátil imersiva." },
];

const faqs = [
  { q: "Quando recebo o jogo?", a: "Liberado digitalmente em 19 de novembro de 2026. Pré-vendas a partir de 25/06/2026. Deluxe inclui 3 dias de acesso antecipado. Instruções enviadas por e-mail." },
  { q: "Formas de pagamento", a: "PIX com confirmação imediata. Após o pagamento confirmado a chave/ativação é liberada conforme a plataforma escolhida." },
  { q: "Quais plataformas estão disponíveis?", a: "PlayStation 5, Xbox Series X|S e PC (Rockstar Games Launcher)." },
  { q: "Edição Deluxe", a: "Acesso antecipado de 3 dias, veículos exclusivos, pacote de roupas premium e bônus in-game ampliado para R$ 1.000.000." },
  { q: "Cancelamento", a: "Até 7 dias após a compra, conforme o CDC." },
  { q: "GTA VI roda em PS4 ou Xbox One?", a: "Não. GTA VI é exclusivo para consoles da geração atual (PS5 e Xbox Series X|S) e PC." },
];

type MediaItem = { type: "video"; videoId: string; thumb: string } | { type: "image"; src: string };
const media: MediaItem[] = [
  { type: "image", src: trailer2.url },
  { type: "video", videoId: TRAILER_ID, thumb: gta6scene.url },
  { type: "image", src: gta6trailer.url },
  { type: "video", videoId: TRAILER_1_ID, thumb: gta6poster.url },
  { type: "image", src: heroCover.url },
];

const reviews = [
  { name: "Lucas M.", date: "há 2 dias", stars: 5, platform: "PS5", title: "Obra-prima da Rockstar", text: "Vice City nunca esteve tão viva. A direção de arte é surreal e a química entre Jason e Lucia carrega cada missão." },
  { name: "Bianca R.", date: "há 4 dias", stars: 5, platform: "Xbox Series X", title: "Vale cada centavo", text: "Joguei nos dois consoles. Carregamentos rápidos, história envolvente do começo ao fim." },
  { name: "Rafael S.", date: "há 1 semana", stars: 4, platform: "PC", title: "Muito bom, com pequenos detalhes", text: "Mundo aberto incrível, IA dos NPCs deu um salto enorme. Tirei uma estrela por alguns bugs visuais no início." },
  { name: "Camila T.", date: "há 2 semanas", stars: 5, platform: "PS5", title: "DualSense brilha aqui", text: "Os gatilhos adaptáveis e a vibração em cada disparo, freada e batida deixam tudo mais imersivo." },
  { name: "Diego A.", date: "há 3 semanas", stars: 4, platform: "Xbox Series S", title: "Pré-venda valeu a pena", text: "Pacote bônus é um mimo gostoso. Performance estável, gráficos lindos." },
  { name: "Juliana P.", date: "há 1 mês", stars: 5, platform: "PS5", title: "Melhor GTA até hoje", text: "Roteiro à altura de um filme. Trilha sonora fenomenal. Já são 40h e ainda descubro coisa nova." },
  { name: "Henrique B.", date: "há 1 mês", stars: 5, platform: "PC", title: "Otimizado de verdade", text: "Rodou liso na minha máquina, ultra a 1440p. Texturas absurdas." },
  { name: "Marina D.", date: "há 5 semanas", stars: 4, platform: "PS5", title: "Imersão completa", text: "Atuação dos personagens é cinema. Só uns micro-stutters em locais cheios." },
];

function GTAVIPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const [platform, setPlatform] = useState<PlatformKey>("ps5");

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [activeVideo]);

  const toggleWishlist = (key: string) => {
    setWishlist((w) => {
      const n = new Set(w);
      if (n.has(key)) { n.delete(key); setToast("Removido da lista de desejos"); }
      else { n.add(key); setToast("Adicionado à lista de desejos ❤"); }
      return n;
    });
  };

  const navigate = useNavigate();
  const buy = (edition: EditionKey) => {
    navigate({ to: "/checkout", search: { edition, platform } });
  };

  const visible = Array.from({ length: 3 }, (_, k) => media[(carouselIdx + k) % media.length]);
  const eds = getEditions(platform);
  const heroPrice = PRICES[platform].standard;

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>

      {/* Hero estilo gamesrockstars */}
      <section className="relative overflow-hidden bg-black min-h-[90vh] flex items-end">
        <img src={trailer2.url} alt="Grand Theft Auto VI" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6">
          <span className="text-4xl font-black text-[#ff4242] tracking-tighter">VI</span>
          <button onClick={() => buy("standard")} className="border border-white/80 text-white text-xs font-bold tracking-[0.2em] px-5 py-3 hover:bg-white hover:text-black transition">
            RESERVE AGORA
          </button>
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-8 pb-16">
          <p className="text-xs font-semibold tracking-[0.3em] text-white/70 mb-5 uppercase">Rockstar Games apresenta</p>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-10 leading-[0.95] tracking-tight">
            Grand Theft<br />Auto VI
          </h1>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="text-xs tracking-[0.25em] text-white/60 uppercase mb-2">Lançamento</p>
              <p className="text-[#ff8a3c] font-semibold tracking-wider">19 de Novembro de 2026</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => buy("standard")} className="bg-white text-black px-10 py-4 text-xs font-bold tracking-[0.25em] hover:bg-[#ff8a3c] hover:text-white transition">
                RESERVE AGORA
              </button>
              <a href="#edicoes" className="border border-white/70 px-10 py-4 text-xs font-bold tracking-[0.25em] hover:bg-white hover:text-black transition">
                VER EDIÇÕES
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Plataforma + Edições header */}
      <section id="edicoes" className="bg-black pt-20 pb-10">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <p className="text-sm font-bold tracking-[0.4em] text-[#ff8a3c] mb-6 uppercase">Escolha sua plataforma</p>
          <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tight">EDIÇÕES</h2>
          <div className="grid grid-cols-3 gap-3 max-w-3xl mx-auto">
            {PLATFORMS.map((p) => {
              const active = platform === p.key;
              const label = p.key === "ps5" ? "PS5" : p.key === "xbox" ? "XBOX" : "PC";
              const Icon = p.icon;
              return (
                <button
                  key={p.key}
                  onClick={() => { setPlatform(p.key); setToast(`Plataforma: ${p.name}`); }}
                  className={`flex items-center justify-center gap-3 py-5 border transition font-bold tracking-wider ${
                    active
                      ? "bg-[#ffb43a] text-black border-[#ffb43a]"
                      : "bg-[#1a1a1a] text-white/70 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <Icon className="w-6 h-6" strokeWidth={1.8} />
                  <span className="text-base">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Edições */}
      <section className="bg-black pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-sm opacity-70 mb-10 text-center">Edições para {PLATFORMS.find(p => p.key === platform)!.name}</p>


          <div className="grid md:grid-cols-2 gap-8">
            {eds.map((ed) => (
              <div key={ed.key} className="group bg-gradient-to-b from-[#161616] to-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden flex flex-col hover:border-[#ff8a3c]/60 transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(255,138,60,0.15)]">
                <button onClick={() => buy(ed.key)} className="w-full text-left relative overflow-hidden">
                  <div className="aspect-[16/10] relative">
                    <img src={ed.img} alt={ed.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {ed.key === "deluxe" && (
                        <span className="bg-[#ff8a3c] text-black text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded">Deluxe</span>
                      )}
                      {ed.key === "standard" && (
                        <span className="bg-white/90 text-black text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded">Standard</span>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-5 right-5">
                      <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#ff8a3c] mb-1">{ed.tag.split(" · ")[1]}</p>
                      <h3 className="text-2xl md:text-3xl font-black tracking-tight">{ed.title}</h3>
                    </div>
                  </div>
                </button>
                <div className="p-7 flex flex-col flex-1">
                  <p className="text-sm opacity-80 mb-5">{ed.desc}</p>
                  <ul className="space-y-2.5 mb-6 text-sm">
                    {ed.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#ff8a3c] mt-0.5 flex-shrink-0" strokeWidth={3} />
                        <span className="opacity-90">{it}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-5 border-t border-white/10">
                    <p className="text-3xl font-black mb-1">{fmtBRL(ed.price)}</p>
                    <p className="text-xs opacity-60 mb-5">ou 10x de {fmtBRL(ed.price / 10)} sem juros</p>
                    <div className="flex items-center gap-3">
                      <button onClick={() => buy(ed.key)} className="bg-[#ff8a3c] hover:bg-[#ff7a1a] text-black rounded-full px-6 py-3 text-xs font-black tracking-[0.2em] uppercase flex-1 transition">
                        Reservar
                      </button>

                      <button onClick={() => toggleWishlist(`${platform}-${ed.key}`)} className={`w-10 h-10 rounded-full border border-white/40 hover:bg-white/10 flex items-center justify-center transition ${wishlist.has(`${platform}-${ed.key}`) ? "bg-white/20" : ""}`} aria-label="Lista de desejos">
                        <Heart className="w-4 h-4" fill={wishlist.has(`${platform}-${ed.key}`) ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carrossel mídia */}
      <section className="bg-black pb-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <p className="text-sm font-bold tracking-[0.4em] text-[#ff8a3c] mb-3 uppercase text-center">Mídia</p>
          <h2 className="text-3xl md:text-4xl font-black mb-10 text-center tracking-tight">Vídeos e capturas</h2>
          <div className="relative">
            <div className="flex gap-4">
              {visible.map((m, i) => (
                <button
                  key={`${carouselIdx}-${i}`}
                  onClick={() => m.type === "video" ? setActiveVideo(m.videoId) : setActiveVideo(TRAILER_ID)}
                  className="flex-1 min-w-0 aspect-video rounded-lg overflow-hidden relative group cursor-pointer"
                >
                  <img src={m.type === "video" ? m.thumb : m.src} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  {m.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition">
                        <Play className="w-7 h-7 text-black ml-1" fill="black" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <button onClick={() => setCarouselIdx((i) => (i - 1 + media.length) % media.length)} className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#ff8a3c] hover:text-black shadow-lg" aria-label="Anterior">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={() => setCarouselIdx((i) => (i + 1) % media.length)} className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#ff8a3c] hover:text-black shadow-lg" aria-label="Próximo">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>



      {/* História */}
      <section className="bg-gradient-to-b from-[#001e4a] to-[#3b1a5c] py-20">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-widest opacity-70 mb-3">O que é Grand Theft Auto VI?</p>
          <h2 className="text-4xl md:text-5xl font-light mb-8">Vice City, EUA.</h2>
          <p className="text-lg leading-relaxed opacity-90">
            Jason e Lucia sempre souberam que tudo estava contra eles. Mas, depois que um serviço simples dá errado, eles vão parar no lado mais sombrio do lugar mais ensolarado dos Estados Unidos, em meio a uma conspiração criminosa que se estende por todo o estado de Leonida — e são forçados a depender um do outro mais do que nunca para saírem dessa vivos.
          </p>
          <button onClick={() => setActiveVideo(TRAILER_ID)} className="mt-10 inline-flex items-center gap-3 bg-white text-black hover:bg-gray-200 rounded-full px-6 py-3 font-medium transition">
            <Play className="w-5 h-5" fill="black" /> Assistir ao trailer
          </button>
        </div>
      </section>

      {/* Recursos */}
      <section className="bg-black py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light mb-12 max-w-3xl">
            Tecnologia da geração atual a serviço de Grand Theft Auto VI
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((f) => (
              <div key={f.title}>
                <f.icon className="w-12 h-12 mb-5 text-[#0099ff]" strokeWidth={1.2} />
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white text-black py-20">
        <div className="max-w-[900px] mx-auto px-6">
          <h2 className="text-3xl font-light mb-10">Perguntas frequentes</h2>
          <div className="divide-y border-y">
            {faqs.map((f, i) => (
              <div key={i}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full py-5 flex items-start justify-between gap-4 text-left hover:opacity-70">
                  <span className="font-medium">{f.q}</span>
                  {openFaq === i ? <Minus className="w-5 h-5 flex-shrink-0 mt-0.5" /> : <Plus className="w-5 h-5 flex-shrink-0 mt-0.5" />}
                </button>
                {openFaq === i && <div className="pb-5 text-sm text-gray-700 leading-relaxed">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classificação ClassInd estilo PlayStation */}
      <section className="bg-[#0a0a0a] py-16 border-t border-white/5">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light mb-8">Classificação e avaliações</h2>

          <div className="bg-[#141414] border border-white/10 rounded-xl p-6 md:p-8 mb-10">
            <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center">
              <div className="flex items-center gap-5">
                <div className="w-24 h-24 bg-black border-2 border-white flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-4xl font-black leading-none">18</span>
                  <span className="text-[9px] font-bold tracking-wider mt-1">ANOS</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] opacity-60 mb-1">ClassInd</p>
                  <p className="text-xl font-semibold">Não recomendado<br/>para menores de 18 anos</p>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider opacity-60 mb-3">Conteúdo</p>
                <div className="flex flex-wrap gap-2">
                  {["Violência extrema","Linguagem imprópria","Drogas lícitas","Drogas ilícitas","Sexo","Conteúdo sexual","Atos criminosos"].map((t) => (
                    <span key={t} className="bg-white/10 border border-white/15 px-3 py-1.5 rounded text-xs">{t}</span>
                  ))}
                </div>
                <p className="text-[11px] opacity-50 mt-4">Classificação indicativa pelo Ministério da Justiça do Brasil. Conteúdo do jogo pode incluir compras opcionais com dinheiro real.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#141414] border border-white/10 rounded-xl p-6 md:p-8 mb-8">
            {(() => {
              const avg = reviews.reduce((s, r) => s + r.stars, 0) / reviews.length;
              const dist = [5, 4, 3, 2, 1].map((n) => ({ n, c: reviews.filter((r) => r.stars === n).length }));
              return (
                <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-center">
                  <div className="text-center md:border-r md:border-white/10 md:pr-8">
                    <p className="text-6xl font-light">{avg.toFixed(1)}</p>
                    <div className="flex justify-center gap-0.5 my-3">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-5 h-5 text-[#ff8a3c]" fill={i <= Math.round(avg) ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <p className="text-xs opacity-60">Baseado em {reviews.length} avaliações</p>
                  </div>
                  <div className="space-y-2">
                    {dist.map((d) => (
                      <div key={d.n} className="flex items-center gap-3 text-sm">
                        <span className="w-8 text-right opacity-70">{d.n} ★</span>
                        <div className="flex-1 h-2 bg-white/10 rounded overflow-hidden">
                          <div className="h-full bg-[#ff8a3c]" style={{ width: `${(d.c / reviews.length) * 100}%` }} />
                        </div>
                        <span className="w-8 text-xs opacity-60">{d.c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="space-y-4">
            {reviews.map((r, i) => (
              <article key={i} className="bg-[#141414] border border-white/10 rounded-xl p-6">
                <header className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff8a3c] to-[#c44a7a] text-white flex items-center justify-center font-bold text-sm">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{r.name}</p>
                      <p className="text-xs opacity-60">{r.date} · {r.platform}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i2) => (
                      <Star key={i2} className="w-4 h-4 text-[#ff8a3c]" fill={i2 <= r.stars ? "currentColor" : "none"} />
                    ))}
                  </div>
                </header>
                <h3 className="font-semibold mb-1">{r.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{r.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button onClick={() => setToast("Faça login para avaliar")} className="bg-[#ff8a3c] hover:bg-[#ff7a1a] text-black rounded-full px-8 py-3 text-xs font-black tracking-[0.2em] uppercase">
              Escrever uma avaliação
            </button>
          </div>
        </div>
      </section>



      <section className="bg-black py-12">
        <div className="max-w-[1100px] mx-auto px-6 text-xs leading-relaxed opacity-70 space-y-4">
          <p><strong className="text-white">Plataformas:</strong> PS5 · Xbox Series X|S · PC &nbsp; <strong className="text-white">Lançamento:</strong> 19/11/2026 &nbsp; <strong className="text-white">Distribuidora:</strong> Rockstar Games</p>
          <p>© 1997–2026. Rockstar Games Inc. Rockstar Games, Grand Theft Auto, Grand Theft Auto VI, R* e logotipos relacionados são marcas comerciais da Take-Two Interactive Software, Inc.</p>
        </div>
      </section>

      <footer className="bg-[#00439c] py-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex gap-6 opacity-90 flex-wrap">
            <a href="#" className="hover:underline">Termos de Uso</a>
            <a href="#" className="hover:underline">Política de Privacidade</a>
            <a href="#" className="hover:underline">Política de Trocas</a>
            <a href="#" className="hover:underline">Contato</a>
          </div>
          <p className="opacity-70">© 2026 GTA VI Pré-venda</p>
        </div>
      </footer>

      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setActiveVideo(null)}>
          <button onClick={() => setActiveVideo(null)} className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white" aria-label="Fechar">
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-6xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              className="w-full h-full rounded-lg shadow-2xl"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
              title="Grand Theft Auto VI Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-black/90 text-white px-5 py-3 rounded-full text-sm shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4">
          {toast}
        </div>
      )}
    </div>
  );
}

function Feat({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <span>{label}</span>
    </div>
  );
}
