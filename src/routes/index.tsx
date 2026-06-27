import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Heart, ChevronDown, Gamepad2, Globe, User, Headphones, Vibrate, Volume2, Play, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import heroImg from "@/assets/gta-hero.jpg";
import screen1 from "@/assets/gta-screen1.jpg";
import screen2 from "@/assets/gta-screen2.jpg";
import screen3 from "@/assets/gta-screen3.jpg";
import standardImg from "@/assets/gta-standard.jpg";
import ultimateImg from "@/assets/gta-ultimate.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Grand Theft Auto VI | Jogos PS5 | PlayStation (Brasil)" },
      { name: "description", content: "Explore Vice City e o estado de Leonida em Grand Theft Auto VI. Disponível em pré-venda para PS5 e PS5 Pro a partir de R$449,90." },
      { property: "og:title", content: "Grand Theft Auto VI | PlayStation" },
      { property: "og:description", content: "Vice City, EUA. Jason e Lucia em uma conspiração criminosa que se estende por todo o estado de Leonida." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: GTAVIPage,
});

const navItems = ["Jogos", "PS5", "PS4", "PS Plus", "Acessórios", "Notícias", "Loja", "Suporte"];

const editions = [
  {
    img: standardImg,
    title: "Standard Edition",
    price: "R$449,90",
    items: ["Grand Theft Auto VI", "Pacote Vintage Vice City", "Um mês de GTA+"],
  },
  {
    img: ultimateImg,
    title: "Ultimate Edition",
    price: "R$549,90",
    items: ["Grand Theft Auto VI", "Melhoria Ultimate Edition", "Pacote Vintage Vice City", "Um mês de GTA+"],
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

const screenshots = [screen1, screen2, screen3, screen1, screen2];

function GTAVIPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [carouselIdx, setCarouselIdx] = useState(0);

  return (
    <div className="min-h-screen bg-[#0070d1] text-white" style={{ fontFamily: "'SST', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* Sony bar */}
      <div className="bg-black h-8 flex items-center justify-end px-4">
        <span className="text-white font-bold text-sm tracking-wider">SONY</span>
      </div>

      {/* Header */}
      <header className="bg-white text-black sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1440px] mx-auto flex items-center h-14 px-4 gap-6">
          <a href="#" className="flex items-center" aria-label="PlayStation">
            <svg viewBox="0 0 100 80" className="h-9 w-auto fill-[#0070d1]">
              <path d="M30 5v60l15 5V20c0-3 1-5 4-5s4 2 4 6v25c8 4 18 7 18-3V20c0-10-12-15-25-15h-16zM10 55c-10 5-10 15 5 18l25 7v-10l-18-5c-3-1-3-3 0-4l18-6v-9l-30 9zm60 5l30-10v9l-22 7c-3 1-3 3 0 4l22 6v9l-25-7c-15-3-15-13-5-18z"/>
            </svg>
          </a>
          <nav className="hidden lg:flex items-center gap-6 text-sm flex-1">
            {navItems.map((item) => (
              <button key={item} className="flex items-center gap-1 hover:text-[#0070d1] py-4">
                {item} <ChevronDown className="w-3 h-3" />
              </button>
            ))}
          </nav>
          <button className="bg-[#0070d1] text-white rounded-full px-5 py-1.5 text-sm font-medium hover:bg-[#005ba8]">
            Iniciar sessão
          </button>
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1.5 gap-2">
            <input type="search" placeholder="Pesquisar" className="bg-transparent text-sm outline-none w-32" />
            <Search className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#3b1a5c] via-[#6b2d8a] to-[#c44a7a]">
        <img src={heroImg} alt="Grand Theft Auto VI" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="relative max-w-[1440px] mx-auto px-6 pt-16 pb-24 min-h-[680px] flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-4 tracking-tight">Grand Theft Auto VI</h1>
            <p className="text-lg mb-8 opacity-90">Rockstar Games</p>

            <div className="mb-6">
              <p className="text-xs uppercase tracking-wider opacity-70 mb-2">Disponível para</p>
              <div className="flex gap-2">
                <span className="bg-white/20 backdrop-blur px-3 py-1 rounded text-xs font-bold">PS5</span>
                <span className="bg-white/20 backdrop-blur px-3 py-1 rounded text-xs font-bold">PS5 PRO ENHANCED</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-4xl font-light mb-2">R$549,90</p>
              <p className="text-xs opacity-80 max-w-md">Assine 1 mês do GTA+ na pré-venda. Renovação automática. Verifique Informações do jogo e jurídicas*.</p>
            </div>

            <div className="flex items-center gap-3 mb-12">
              <button className="bg-[#f47024] hover:bg-[#d85e15] text-white rounded-full px-8 py-3 font-medium transition">
                Comprar na pré-venda
              </button>
              <button className="w-12 h-12 rounded-full border border-white/40 hover:bg-white/10 flex items-center justify-center" aria-label="Lista de desejos">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 text-sm">
              <Feature icon={Gamepad2} label="Compras no jogo opcionais" />
              <Feature icon={User} label="1 jogador" />
              <Feature icon={Globe} label="Jogo offline habilitado" />
              <Feature icon={Gamepad2} label="Compatível com Uso remoto" />
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
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
          </div>

          <div className="absolute bottom-6 right-6 text-xs opacity-80">ClassInd Rating Pending</div>
        </div>
      </section>

      {/* Screenshots carousel */}
      <section className="bg-[#00439c] py-10">
        <div className="max-w-[1440px] mx-auto px-6 relative">
          <div className="flex gap-4 overflow-hidden">
            {screenshots.slice(carouselIdx, carouselIdx + 3).concat(screenshots.slice(0, Math.max(0, carouselIdx + 3 - screenshots.length))).map((s, i) => (
              <div key={i} className="flex-1 min-w-0 aspect-video rounded overflow-hidden relative group cursor-pointer">
                <img src={s} alt={`Screenshot ${i + 1}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition" />
                {i === 1 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                      <Play className="w-7 h-7 text-black ml-1" fill="black" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button onClick={() => setCarouselIdx((i) => (i - 1 + screenshots.length) % screenshots.length)} className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center hover:bg-white" aria-label="Anterior">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={() => setCarouselIdx((i) => (i + 1) % screenshots.length)} className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center hover:bg-white" aria-label="Próximo">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Buy section */}
      <section className="bg-[#00439c] py-16">
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="text-sm opacity-80 mb-2">Compre Grand Theft Auto VI na PlayStation® Store</p>
          <h2 className="text-3xl font-light mb-8">Edições:</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {editions.map((ed) => (
              <div key={ed.title} className="bg-[#003478] rounded-lg overflow-hidden">
                <img src={ed.img} alt={ed.title} loading="lazy" className="w-full aspect-[4/3] object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{ed.title}</h3>
                  <ul className="space-y-2 mb-6 text-sm">
                    {ed.items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <span className="text-[#0099ff] mt-1">•</span> {it}
                      </li>
                    ))}
                  </ul>
                  <p className="text-2xl font-light mb-2">{ed.price}</p>
                  <p className="text-xs opacity-70 mb-5">Assine 1 mês do GTA+ na pré-venda. Renovação automática. Verifique Informações do jogo e jurídicas*.</p>
                  <div className="flex items-center gap-3">
                    <button className="bg-[#f47024] hover:bg-[#d85e15] text-white rounded-full px-6 py-2.5 text-sm font-medium flex-1">
                      Comprar na pré-venda
                    </button>
                    <button className="w-10 h-10 rounded-full border border-white/40 hover:bg-white/10 flex items-center justify-center" aria-label="Lista de desejos">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Expansion */}
          <h2 className="text-3xl font-light mt-16 mb-8">Expansões</h2>
          <div className="bg-[#003478] rounded-lg p-6 flex items-center gap-6 max-w-md">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-700 rounded flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider opacity-70 mb-1">PS5 · Pre-Order</p>
              <h3 className="font-semibold mb-2 text-sm">Grand Theft Auto VI: Melhoria Ultimate Edition</h3>
              <p className="text-xs opacity-70">Indisponível</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-gradient-to-b from-[#1a0a2e] to-[#3b1a5c] py-20">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-widest opacity-70 mb-3">O que é Grand Theft Auto VI?</p>
          <h2 className="text-4xl md:text-5xl font-light mb-8">Vice City, EUA.</h2>
          <p className="text-lg leading-relaxed opacity-90">
            Jason e Lucia sempre souberam que tudo estava contra eles. Mas, depois que um serviço simples dá errado, eles vão parar no lado mais sombrio do lugar mais ensolarado dos Estados Unidos, em meio a uma conspiração criminosa que se estende por todo o estado de Leonida — e são forçados a depender um do outro mais do que nunca para saírem dessa vivos.
          </p>
        </div>
      </section>

      {/* Features */}
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
            <button className="border border-white/40 hover:bg-white/10 rounded-full px-6 py-2.5 text-sm">Saiba mais</button>
            <button className="border border-white/40 hover:bg-white/10 rounded-full px-6 py-2.5 text-sm">Compre diretamente do PlayStation</button>
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

      {/* Ratings */}
      <section className="bg-gray-100 text-black py-16">
        <div className="max-w-[900px] mx-auto px-6">
          <h2 className="text-2xl font-light mb-6">Classificação e avaliações</h2>
          <div className="bg-white rounded-lg p-8 border">
            <p className="text-sm opacity-70 mb-2">Classificações globais de jogadores</p>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-light">—</span>
              <div className="text-yellow-500 text-2xl">★★★★★</div>
            </div>
            <h3 className="font-semibold mb-1">Não há classificações e avaliações. Seja o primeiro a avaliar!</h3>
            <p className="text-sm opacity-70">Somente os proprietários deste jogo podem avaliá-lo.</p>
          </div>
        </div>
      </section>

      {/* Info / Legal */}
      <section className="bg-black py-12">
        <div className="max-w-[1100px] mx-auto px-6 text-xs leading-relaxed opacity-70 space-y-4">
          <p><strong className="text-white">Plataforma:</strong> PS5 &nbsp; <strong className="text-white">Lançamento:</strong> 18/11/2026 &nbsp; <strong className="text-white">Distribuidora:</strong> Rockstar Games &nbsp; <strong className="text-white">Gêneros:</strong> Ação</p>
          <p>É preciso ter uma conta para a PlayStation para usar os recursos online, que estão sujeitos aos termos de serviço e à política de privacidade aplicável.</p>
          <p>Software sujeito à licença e à garantia limitada.</p>
          <p>Você pode baixar esse conteúdo e reproduzi-lo no console PS5 principal associado à sua conta e em outros consoles PS5 ao fazer login com essa conta.</p>
          <p>© 1997–2026. Rockstar Games Inc. Rockstar Games, Grand Theft Auto, Grand Theft Auto VI, VI, R* e logotipos relacionados são marcas comerciais da Take-Two Interactive Software, Inc.</p>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}

function Feature({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <span>{label}</span>
    </div>
  );
}
