import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Heart, Gamepad2, Globe, User, Headphones, Vibrate, Volume2, Play, ChevronLeft, ChevronRight, Plus, Minus, X, Monitor } from "lucide-react";
import heroImg from "@/assets/gta-hero.jpg";
import screen1 from "@/assets/gta-screen1.jpg";
import screen2 from "@/assets/gta-screen2.jpg";
import screen3 from "@/assets/gta-screen3.jpg";
import standardImg from "@/assets/gta-standard.jpg";
import ultimateImg from "@/assets/gta-ultimate.jpg";
import { trackVisit } from "@/lib/orders-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grand Theft Auto VI | Jogos PS5 | PlayStation (Brasil)" },
      { name: "description", content: "Explore Vice City e o estado de Leonida em Grand Theft Auto VI. Disponível em pré-venda para PS5 e PS5 Pro a partir de R$249,90." },
      { property: "og:title", content: "Grand Theft Auto VI | PlayStation" },
      { property: "og:description", content: "Vice City, EUA. Jason e Lucia em uma conspiração criminosa que se estende por todo o estado de Leonida." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: GTAVIPage,
});

// Trailer oficial GTA VI – Trailer 2 (YouTube)
const TRAILER_ID = "VQRLujxTm3c";
const TRAILER_1_ID = "QdBZY2fkU-0";

const editions = [
  {
    img: standardImg,
    title: "Standard Edition",
    price: "R$249,90",
    originalPrice: "R$449,90",
    discount: 44,
    items: ["Grand Theft Auto VI", "Pacote Vintage Vice City", "Um mês de GTA+"],
    key: "standard" as const,
  },
  {
    img: ultimateImg,
    title: "Ultimate Edition",
    price: "R$359,90",
    originalPrice: "R$549,90",
    discount: 35,
    items: ["Grand Theft Auto VI", "Melhoria Ultimate Edition", "Pacote Vintage Vice City", "Um mês de GTA+"],
    key: "ultimate" as const,
  },
];

const features = [
  { icon: Vibrate, title: "Resposta tátil", desc: "As vibrações responsivas da resposta tátil revolucionária do controle sem fio DualSense reagem às suas escolhas e simulam fatores ambientais em todo o vasto estado de Leonida e na Vice City dos dias atuais." },
  { icon: Headphones, title: "Tempest 3D Audio", desc: "Mergulhe na paisagem sonora única de Leonida com o posicionamento de áudio aprimorado e altamente preciso do Tempest 3D Audio, dando vida a cada situação exclusiva." },
  { icon: Volume2, title: "Alto-falante integrado", desc: "O alto-falante integrado do controle sem fio DualSense oferece uma dimensão extra com ocorrências e interações acentuadas por efeitos sonoros notáveis vindos do controle, muitas vezes aprimorados pela resposta tátil imersiva." },
];

const faqs = [
  { q: "Como faço para resgatar um mês grátis de GTA+ ao comprar a versão digital de Grand Theft Auto VI na pré-venda?", a: "Compre GTA VI na pré-venda na PlayStation Store antes de 20 de novembro de 2026. Após a compra, acesse a página do produto GTA+ e siga as instruções para concluir a transação sem custo adicional. Conclua até 31 de março de 2027 para resgatar a oferta." },
  { q: "Qual é a data de lançamento de Grand Theft Auto VI?", a: "Grand Theft Auto VI será lançado para PlayStation®5 e PS5® Pro em 19 de novembro de 2026." },
  { q: "Grand Theft Auto VI poderá ser jogado no PlayStation®4?", a: "Grand Theft Auto VI só poderá ser jogado nos consoles PlayStation 5. Não estará disponível para consoles PlayStation 4." },
  { q: "Quais edições de Grand Theft Auto VI estão disponíveis?", a: "Confira as opções mais recentes na PlayStation® Store: Standard Edition e Ultimate Edition." },
  { q: "Grand Theft Auto VI tem modos ou recursos multiplayer?", a: "Grand Theft Auto VI é uma experiência para um jogador." },
  { q: "Qual é a classificação etária de Grand Theft Auto VI?", a: "As classificações etárias variam por país. GTA V foi M (17+) pela ESRB na América do Norte e PEGI 18 na Europa, indicando público adulto." },
];

type MediaItem = { type: "video"; videoId: string; thumb: string } | { type: "image"; src: string };

const media: MediaItem[] = [
  { type: "image", src: screen1 },
  { type: "video", videoId: TRAILER_ID, thumb: screen2 },
  { type: "image", src: screen3 },
  { type: "video", videoId: TRAILER_1_ID, thumb: screen1 },
  { type: "image", src: screen2 },
];

function GTAVIPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const [platform, setPlatform] = useState<"ps5" | "xbox" | "pc">("ps5");

  useEffect(() => { trackVisit(); }, []);

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
  const buy = (edition: "standard" | "ultimate") => {
    navigate({ to: "/checkout", search: { edition } });
  };

  const visible = Array.from({ length: 3 }, (_, k) => media[(carouselIdx + k) % media.length]);

  return (
    <div className="min-h-screen bg-[#0070d1] text-white" style={{ fontFamily: "'SST', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>


      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3b1a5c] via-[#6b2d8a] to-[#c44a7a]">
        {/* Mobile: imagem inteira no topo (proporcional) */}
        <img src={heroImg} alt="Grand Theft Auto VI" width={1920} height={1080} className="md:hidden block w-full h-auto" />
        {/* Desktop: imagem de fundo */}
        <img src={heroImg} alt="" aria-hidden="true" width={1920} height={1080} className="hidden md:block absolute inset-0 w-full h-full object-cover object-right opacity-70" />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <button onClick={() => setActiveVideo(TRAILER_ID)} className="absolute right-8 top-1/2 -translate-y-1/2 z-10 group hidden md:flex flex-col items-center gap-2" aria-label="Assistir trailer">
          <span className="w-20 h-20 rounded-full bg-white/20 backdrop-blur border-2 border-white flex items-center justify-center group-hover:bg-white/30 transition">
            <Play className="w-8 h-8 ml-1" fill="white" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider">Ver trailer</span>
        </button>
        <div className="relative max-w-[1440px] mx-auto px-6 pt-8 pb-12 md:pt-16 md:pb-24 md:min-h-[680px] flex flex-col justify-center">


          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-4 tracking-tight">Grand Theft Auto VI</h1>
            <p className="text-lg mb-8 opacity-90">Rockstar Games</p>

            <div className="mb-6">
              <p className="text-xs uppercase tracking-wider opacity-70 mb-2">Disponível para</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 backdrop-blur px-3 py-1 rounded text-xs font-bold">PS5</span>
                <span className="bg-white/20 backdrop-blur px-3 py-1 rounded text-xs font-bold">PS5 PRO ENHANCED</span>
                <span className="bg-white/20 backdrop-blur px-3 py-1 rounded text-xs font-bold">XBOX SERIES X/S</span>
                <span className="bg-white/20 backdrop-blur px-3 py-1 rounded text-xs font-bold">PC</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="bg-[#f5a623] text-black text-xs font-bold px-2 py-1 rounded">-35%</span>
                <span className="text-lg line-through opacity-60">R$549,90</span>
                <span className="text-xs uppercase tracking-wider bg-red-600/90 text-white px-2 py-1 rounded font-bold">Oferta de Lançamento</span>
              </div>
              <p className="text-4xl font-light mb-1">R$359,90</p>
              <p className="text-xs text-[#f5a623] mb-2">Você economiza R$190,00 na pré-venda</p>
              <p className="text-xs opacity-80 max-w-md">Assine 1 mês do GTA+ na pré-venda. Renovação automática. Verifique Informações do jogo e jurídicas*.</p>
            </div>

            <div className="flex items-center gap-3 mb-12">
              <button onClick={() => buy("ultimate")} className="bg-[#f47024] hover:bg-[#d85e15] text-white rounded-full px-8 py-3 font-medium transition">
                Comprar na pré-venda
              </button>
              <button onClick={() => toggleWishlist("hero")} className={`w-12 h-12 rounded-full border border-white/40 hover:bg-white/10 flex items-center justify-center transition ${wishlist.has("hero") ? "bg-white/20" : ""}`} aria-label="Lista de desejos">
                <Heart className="w-5 h-5" fill={wishlist.has("hero") ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 text-sm">
              <Feat icon={Gamepad2} label="Compras no jogo opcionais" />
              <Feat icon={User} label="1 jogador" />
              <Feat icon={Globe} label="Jogo offline habilitado" />
              <Feat icon={Gamepad2} label="Compatível com Uso remoto" />
            </div>

            <div className="mt-8 pt-6 border-t border-white/20 space-y-5">
              <div>
                <p className="text-sm font-semibold mb-2">Versão para PS5</p>
                <div className="flex items-start gap-3 text-sm opacity-90">
                  <Vibrate className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p>Compatível com função de vibração e efeito gatilho (controle sem fio DualSense)</p>
                </div>
                <div className="flex items-center gap-3 text-sm opacity-90 mt-2">
                  <Gamepad2 className="w-5 h-5 flex-shrink-0" />
                  <p>PS5 Pro Aprimorado</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Versão para Xbox Series X|S</p>
                <div className="flex items-start gap-3 text-sm opacity-90">
                  <Vibrate className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p>Compatível com vibração e gatilhos de impulso do controle sem fio Xbox</p>
                </div>
                <div className="flex items-center gap-3 text-sm opacity-90 mt-2">
                  <Gamepad2 className="w-5 h-5 flex-shrink-0" />
                  <p>Otimizado para Xbox Series X — 4K HDR e Smart Delivery</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">Versão para PC</p>
                <div className="flex items-start gap-3 text-sm opacity-90">
                  <Monitor className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p>Suporte a 4K, ultrawide, ray tracing e taxa de quadros desbloqueada</p>
                </div>
                <div className="flex items-center gap-3 text-sm opacity-90 mt-2">
                  <Gamepad2 className="w-5 h-5 flex-shrink-0" />
                  <p>Compatível com teclado/mouse e controles DualSense e Xbox</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 text-xs opacity-80">ClassInd Rating Pending</div>
        </div>
      </section>

      {/* Carrossel */}
      <section className="bg-[#00439c] py-10">
        <div className="max-w-[1440px] mx-auto px-6 relative">
          <div className="flex gap-4">
            {visible.map((m, i) => (
              <button
                key={`${carouselIdx}-${i}`}
                onClick={() => m.type === "video" ? setActiveVideo(m.videoId) : setActiveVideo(TRAILER_ID)}
                className="flex-1 min-w-0 aspect-video rounded overflow-hidden relative group cursor-pointer"
              >
                <img src={m.type === "video" ? m.thumb : m.src} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition" />
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
          <button onClick={() => setCarouselIdx((i) => (i - 1 + media.length) % media.length)} className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center hover:bg-white shadow" aria-label="Anterior">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={() => setCarouselIdx((i) => (i + 1) % media.length)} className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center hover:bg-white shadow" aria-label="Próximo">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Edições */}
      <section className="bg-black py-20">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-[#f5a623] mb-6 font-semibold">Escolha sua plataforma</p>
            <h2 className="text-5xl md:text-6xl font-bold tracking-wide mb-10">EDIÇÕES</h2>
            <div className="inline-flex border border-white/20 rounded-md overflow-hidden">
              {([
                { id: "ps5", label: "PS5" },
                { id: "xbox", label: "XBOX" },
                { id: "pc", label: "PC" },
              ] as const).map((p) => {
                const active = platform === p.id;
                const Icon = p.id === "pc" ? Monitor : Gamepad2;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPlatform(p.id)}
                    className={`px-8 py-3 text-sm font-semibold flex items-center gap-2 transition ${active ? "bg-[#f5a623] text-black" : "bg-transparent text-white hover:bg-white/5"}`}
                  >
                    <Icon className="w-4 h-4" /> {p.label}
                  </button>
                );
              })}
            </div>
          </div>


          <div className="grid md:grid-cols-2 gap-6">
            {editions.map((ed) => (
              <div key={ed.title} className="bg-[#111] border border-white/10 rounded-lg overflow-hidden">
                <div className="px-4 pt-3 text-xs uppercase tracking-wider text-[#f5a623] font-semibold">{platform.toUpperCase()}</div>
                <button onClick={() => buy(ed.key)} className="w-full text-left">
                  <div className="w-full aspect-[4/3] bg-black flex items-center justify-center">
                    <img src={ed.img} alt={ed.title} loading="lazy" className="w-full h-full object-contain hover:opacity-90 transition" />
                  </div>
                </button>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{ed.title}</h3>
                  <ul className="space-y-2 mb-6 text-sm">
                    {ed.items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <span className="text-[#f5a623] mt-1">•</span> {it}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="bg-[#f5a623] text-black text-[10px] font-bold px-2 py-0.5 rounded">-{ed.discount}%</span>
                    <span className="text-sm line-through opacity-50">{ed.originalPrice}</span>
                  </div>
                  <p className="text-2xl font-light mb-1">{ed.price}</p>
                  <p className="text-xs text-[#f5a623] mb-3">Oferta de lançamento por tempo limitado</p>
                  <p className="text-xs opacity-70 mb-5">Assine 1 mês do GTA+ na pré-venda. Renovação automática. Verifique Informações do jogo e jurídicas*.</p>
                  <div className="flex items-center gap-3">
                    <button onClick={() => buy(ed.key)} className="bg-[#f47024] hover:bg-[#d85e15] text-white rounded-full px-6 py-2.5 text-sm font-medium flex-1">
                      Comprar na pré-venda
                    </button>
                    <button onClick={() => toggleWishlist(ed.title)} className={`w-10 h-10 rounded-full border border-white/40 hover:bg-white/10 flex items-center justify-center transition ${wishlist.has(ed.title) ? "bg-white/20" : ""}`} aria-label="Lista de desejos">
                      <Heart className="w-4 h-4" fill={wishlist.has(ed.title) ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-light mt-16 mb-8">Expansões</h2>
          <button onClick={() => setToast("Expansão indisponível")} className="bg-[#003478] hover:bg-[#004299] rounded-lg p-6 flex items-center gap-6 max-w-md text-left transition">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-700 rounded flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider opacity-70 mb-1">PS5 · Pre-Order</p>
              <h3 className="font-semibold mb-2 text-sm">Grand Theft Auto VI: Melhoria Ultimate Edition</h3>
              <p className="text-xs opacity-70">Indisponível</p>
            </div>
          </button>
        </div>
      </section>

      {/* História */}
      <section className="bg-gradient-to-b from-[#1a0a2e] to-[#3b1a5c] py-20">
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
            Como os recursos inovadores aprimoram a experiência em Grand Theft Auto VI no PlayStation 5
          </h2>
          <p className="text-base opacity-80 mb-16 max-w-3xl">
            O poder do PlayStation 5 fica claro com Grand Theft Auto VI, proporcionando uma experiência inigualável com a história de Jason e Lucia. O título não pode ser jogado no PlayStation 4.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {features.map((f) => (
              <div key={f.title}>
                <f.icon className="w-12 h-12 mb-5 text-[#0099ff]" strokeWidth={1.2} />
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <a href="https://www.playstation.com/pt-br/ps5/" target="_blank" rel="noopener noreferrer" className="border border-white/40 hover:bg-white/10 rounded-full px-6 py-2.5 text-sm">Saiba mais</a>
            <a href="https://direct.playstation.com/" target="_blank" rel="noopener noreferrer" className="border border-white/40 hover:bg-white/10 rounded-full px-6 py-2.5 text-sm">Compre diretamente do PlayStation</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white text-black py-20">
        <div className="max-w-[900px] mx-auto px-6">
          <h2 className="text-3xl font-light mb-10">Perguntas frequentes sobre Grand Theft Auto VI</h2>
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



      <section className="bg-black py-12">
        <div className="max-w-[1100px] mx-auto px-6 text-xs leading-relaxed opacity-70 space-y-4">
          <p><strong className="text-white">Plataforma:</strong> PS5 &nbsp; <strong className="text-white">Lançamento:</strong> 18/11/2026 &nbsp; <strong className="text-white">Distribuidora:</strong> Rockstar Games &nbsp; <strong className="text-white">Gêneros:</strong> Ação</p>
          <p>É preciso ter uma conta para a PlayStation para usar os recursos online, que estão sujeitos aos termos de serviço e à política de privacidade aplicável.</p>
          <p>Software sujeito à licença e à garantia limitada.</p>
          <p>© 1997–2026. Rockstar Games Inc. Rockstar Games, Grand Theft Auto, Grand Theft Auto VI, VI, R* e logotipos relacionados são marcas comerciais da Take-Two Interactive Software, Inc.</p>
        </div>
      </section>

      <footer className="bg-[#00439c] py-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex gap-6 opacity-90 flex-wrap">
            <a href="#" className="hover:underline">PlayStation Store</a>
            <a href="#" className="hover:underline">Termos de Serviço</a>
            <a href="#" className="hover:underline">Política de Privacidade</a>
            <a href="#" className="hover:underline">Cookies</a>
            <a href="#" className="hover:underline">Sobre a SIE</a>
          </div>
          <p className="opacity-70">© 2026 Sony Interactive Entertainment LLC</p>
        </div>
      </footer>

      {/* Video Modal */}
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

      {/* Toast */}
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
