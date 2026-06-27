import { createFileRoute } from "@tanstack/react-router";
import { Clock, TrendingUp, Mail, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Revolução do Hiper-Realismo: Como Grand Theft Auto VI vai transformar a indústria — Games Tech" },
      {
        name: "description",
        content:
          "Análise profunda do impacto da nova RAGE Engine, a parceria estratégica entre Rockstar e Sony PlayStation, e como GTA VI vai redefinir a renderização e a IA dos games.",
      },
      { property: "og:title", content: "GTA VI e a Revolução do Hiper-Realismo — Games Tech" },
      {
        property: "og:description",
        content:
          "Dossiê editorial: RAGE Engine, Ray Tracing, SSD do PS5 e o salto geracional de Grand Theft Auto VI.",
      },
      {
        property: "og:image",
        content:
          "https://gmedia.playstation.com/is/image/SIEPDC/GTA-VI-Trailer-2-Homepage-Hero-Desktop-01-06may25?$4000px$",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top utility bar */}
      <div className="bg-indigo-900 text-white text-xs">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-semibold tracking-wide">Games Tech Editorial</span>
            <span className="hidden sm:inline opacity-70">Edição Global</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#sobre" className="hover:underline">Sobre Nós</a>
            <a href="#contato" className="hover:underline">Contato Corporativo</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between gap-6">
          <a href="/" className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow">
              GT
            </div>
            <div className="leading-tight">
              <div className="font-black text-lg tracking-tight">GAMES TECH</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">
                Notícias & Análises
              </div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold uppercase tracking-wide">
            <a href="#" className="text-slate-700 hover:text-indigo-700">Últimas Notícias</a>
            <a href="#" className="text-slate-700 hover:text-indigo-700">Reviews & Tech</a>
            <a href="#" className="text-slate-700 hover:text-indigo-700">Hardware</a>
            <a href="#dossie" className="text-indigo-700 border-b-2 border-indigo-600 pb-1">
              Reportagens Especiais
            </a>
          </nav>
        </div>
      </header>

      <main id="dossie" className="mx-auto max-w-7xl px-4 py-10 lg:py-14 grid lg:grid-cols-3 gap-10">
        {/* Article */}
        <article className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
              Dossiê Especial
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <Clock className="h-3.5 w-3.5" /> Tempo de Leitura: 15 min
            </span>
          </div>

          <h1 className="font-black tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-slate-900">
            A Revolução do Hiper-Realismo: Como Grand Theft Auto VI vai transformar a indústria
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
            Analisamos em profundidade o impacto da nova geração da RAGE Engine, a parceria
            estratégica com a Sony PlayStation, e como a Rockstar Games pretende redefinir os
            limites da renderização e inteligência artificial.
          </p>

          <div className="my-8 border-t border-b border-slate-200 py-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
            <div>
              <div className="font-bold text-slate-900">Rafael Lins</div>
              <div className="text-xs text-slate-500">
                Editor-Chefe de Hardware & Tecnologia • 26/06/2026
              </div>
            </div>
          </div>

          <figure className="my-8">
            <img
              src="https://gmedia.playstation.com/is/image/SIEPDC/GTA-VI-Trailer-2-Homepage-Hero-Desktop-01-06may25?$4000px$"
              alt="GTA VI - captura in-engine"
              className="w-full rounded-xl shadow-lg"
              loading="lazy"
            />
            <figcaption className="mt-3 text-sm text-slate-500 italic">
              <strong className="not-italic text-slate-700">Captura in-engine:</strong> O novo
              casal de protagonistas contemplando o entardecer hiper-realista no vasto estado de
              Leonida. (Créditos: Rockstar Games)
            </figcaption>
          </figure>

          <div className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-2xl prose-a:text-indigo-700 prose-strong:text-slate-900">
            <p>
              Desde a revelação explosiva do primeiro trailer, a comunidade global de tecnologia e
              entretenimento digital entrou em um frenesi sem precedentes. A Rockstar Games possui
              um histórico impecável de desafiar os limites do hardware disponível em cada época,
              mas a transição que estamos prestes a presenciar com{" "}
              <strong>Grand Theft Auto VI</strong> representa o maior salto geracional já tentado
              por um estúdio de desenvolvimento.
            </p>
            <p>
              O que impressiona em GTA 6 não são apenas as texturas de altíssima resolução. É o
              comportamento simbiótico entre os elementos na tela. A complexidade de renderizar
              centenas de <em>NPCs (Personagens Não-Jogáveis)</em> independentes, com reações
              realistas, em meio a uma física de mundo incrivelmente complexa.
            </p>

            <h2>A Evolução e o Legado</h2>
            <p>
              A franquia não chegou a este patamar da noite para o dia. Desde os tempos de câmera
              top-down até a explosão cultural de <em>GTA: Vice City</em> e <em>San Andreas</em> no
              PlayStation 2, a série tem servido como um termômetro da capacidade de processamento
              dos computadores domésticos e consoles.
            </p>
            <p>
              Com o colossal sucesso de <strong>GTA V</strong> (que acumulou incríveis US$ 8
              bilhões em receita desde 2013), a desenvolvedora conquistou a segurança financeira e
              o tempo de desenvolvimento necessários para criar uma nova estrutura de motor
              gráfico — a nova geração da <strong>RAGE (Rockstar Advanced Game Engine)</strong>. O
              foco de todo esse tempo esteve concentrado em um objetivo: eliminar por completo a
              sensação de artificialidade nos jogos de mundo aberto.
            </p>

            <figure>
              <img
                src="https://store-playstationgta6.com/images/grand-theft-auto-vi-screenshot-08-en-06may25.webp"
                alt="GTA VI detalhes de pele e iluminação"
                className="w-full rounded-xl shadow"
                loading="lazy"
              />
              <figcaption className="mt-2 text-sm text-slate-500 italic">
                Detalhes da pele, iluminação de suor e física de cabelos capturados em tempo real,
                evidenciando o salto computacional exigido pela nova engine.
              </figcaption>
            </figure>

            <h2>A Parceria Histórica: Rockstar e Sony PlayStation</h2>
            <p>
              No campo técnico e corporativo, a relação intrínseca entre a Rockstar e a Sony
              Interactive Entertainment é inegável. Esta parceria estratégica não se resume a
              acordos de marketing, mas se estende ao nível da engenharia de software.
            </p>
            <p>
              No coração do <strong>PlayStation 5</strong> existe um SSD customizado capaz de
              transferir dados a velocidades ultrarrápidas, aliado a um processador dedicado para
              descompressão (o sistema Kraken). Rumores da indústria indicam que a Rockstar e a
              Sony trabalharam em estreita colaboração para que a nova engine RAGE consiga
              transmitir (streamar) os gigantescos blocos de dados da cidade de Vice City
              diretamente do SSD do PS5 para a memória da placa de vídeo em frações de
              milissegundos.
            </p>

            <h3>O Fim dos "Loadings" Invisíveis</h3>
            <p>
              Se você jogou títulos de mundo aberto no passado, certamente percebeu texturas
              demorando para carregar ("pop-in") ao dirigir veículos em altíssima velocidade. A
              integração profunda do GTA 6 com a arquitetura de I/O do PlayStation 5 promete
              extinguir esse gargalo de memória para sempre, permitindo voos rasantes e corridas
              em superesportivos sem perda de qualidade visual.
            </p>

            <h2>Gráficos, Ray Tracing e o Universo de Leonida</h2>
            <p>
              Analisando os materiais de divulgação técnica, os especialistas da Games Tech
              identificaram o uso abrangente de <strong>Ray Tracing Global</strong>. Isso quer
              dizer que o sol do estado fictício de Leonida age como uma fonte de luz do mundo
              real. Ele reflete de forma precisa em espelhos d'água, na lataria metalizada dos
              veículos e ilumina becos escuros por reflexão indireta (Global Illumination).
            </p>

            <figure>
              <img
                src="https://store-playstationgta6.com/images/grand-theft-auto-vi-screenshot-04-en-06may25.webp"
                alt="GTA VI densidade urbana"
                className="w-full rounded-xl shadow"
                loading="lazy"
              />
              <figcaption className="mt-2 text-sm text-slate-500 italic">
                Densidade absurda nas praias: simulação complexa de água, areia volumétrica e
                dezenas de NPCs atuando de forma autônoma.
              </figcaption>
            </figure>

            <p>
              Além dos efeitos luminosos, a física de tecidos e fluidos parece ter sido
              reinventada. A água do pântano de Leonida (uma representação fiel dos Everglades na
              Flórida) sofre deslocamento volumétrico quando veículos anfíbios passam por ela,
              arrastando lama e fauna interativa, elevando a imersão a um padrão quase
              documental.
            </p>

            <h2>Hardware Exigido: Por que o PS4 ficou para trás?</h2>
            <p>
              Uma dura realidade tecnológica:{" "}
              <strong>
                O jogo não será lançado para a geração passada (PlayStation 4 e Xbox One).
              </strong>
            </p>
            <p>
              As exigências computacionais da inteligência artificial de milhares de pedestres na
              rua simultaneamente fariam o processador do PS4 "derreter". Para suportar esse nível
              massivo de interatividade e gráficos baseados em Ray Tracing, o game precisa
              fundamentalmente de processadores AMD Zen 2 (presentes no PS5 e Series X/S) e de
              armazenamento em estado sólido (SSD NVMe).
            </p>

            <div className="overflow-x-auto my-8 not-prose">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-indigo-900 text-white text-left">
                    <th className="p-3 font-bold">Plataforma</th>
                    <th className="p-3 font-bold">Status</th>
                    <th className="p-3 font-bold">Veredito Técnico</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white">
                    <td className="p-3 font-semibold">PlayStation 5</td>
                    <td className="p-3 text-green-700 font-semibold">Lançamento Nativo</td>
                    <td className="p-3 text-slate-600">
                      Hardware base para o qual o jogo foi projetado. Suporte total a Ray Tracing
                      e carregamento SSD.
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 font-semibold">Xbox Series X|S</td>
                    <td className="p-3 text-green-700 font-semibold">Lançamento Nativo</td>
                    <td className="p-3 text-slate-600">
                      Desempenho equivalente garantido na versão 'X'. Versão 'S' utilizará
                      resolução dinâmica.
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 font-semibold">Computador (PC)</td>
                    <td className="p-3 text-amber-700 font-semibold">Pós-Lançamento</td>
                    <td className="p-3 text-slate-600">
                      Chegará posteriormente (tradição do estúdio). Exigirá GPUs RTX 4000+.
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 font-semibold">PS4 / Xbox One</td>
                    <td className="p-3 text-red-700 font-semibold">Incompatível</td>
                    <td className="p-3 text-slate-600">
                      Hardware obsoleto incapaz de gerenciar a carga de IA e a ausência de SSD
                      ultrarrápido.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Anúncio, Lançamento e Status de Pré-venda</h2>
            <p>
              O anúncio de Grand Theft Auto VI foi astronômico, destruindo recordes globais no
              YouTube em apenas 24 horas. A <strong>Take-Two Interactive</strong> e a Rockstar
              confirmaram de forma oficial que a janela de lançamento está fixada para o{" "}
              <strong>outono (americano) de 2025</strong>.
            </p>

            <h3>Reserva Antecipada de Edições Especiais</h3>
            <p>
              O hype insano resultou em uma procura sem precedentes na indústria de varejo
              digital. A recomendação clara do corpo editorial e de especialistas de mercado é
              garantir as mídias (físicas ou licenças digitais de pré-load no PlayStation) assim
              que a pré-venda oficial em lotes limitados for acionada pelas plataformas
              credenciadas, a fim de evitar congestionamentos nos servidores e o inflacionamento
              pós-lançamento.
            </p>
          </div>

          {/* CTA */}
          <div className="not-prose my-10 rounded-2xl bg-gradient-to-br from-indigo-700 to-purple-700 p-8 text-white shadow-xl">
            <div className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-2">
              Aviso Editorial
            </div>
            <h3 className="text-2xl font-black mb-3">Verificar Disponibilidade Oficial</h3>
            <p className="text-indigo-100 mb-5">
              Confirme nas plataformas autorizadas (PlayStation Store, Xbox Store e revendedores
              credenciados) a abertura oficial das pré-vendas antes de qualquer reserva.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-6 py-3 rounded-lg hover:bg-indigo-50 transition"
            >
              Acessar Plataformas Oficiais <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          <p className="text-slate-600 italic">
            Independentemente do dispositivo que você utilize, o mercado financeiro e a comunidade
            de tecnologia já concordam em um ponto: quando o jogo chegar ao mercado, a indústria
            de entretenimento não será mais a mesma.
          </p>

          <div className="mt-10 pt-6 border-t border-slate-200">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
              Tópicos de Pesquisa Frequentes
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "gta 6",
                "comprar gta 6",
                "gta 6 pré venda",
                "gta 6 preço",
                "gta 6 ps5",
                "gta 6 xbox",
                "gta 6 lançamento",
                "data de lançamento gta 6",
                "onde comprar gta 6",
                "reservar gta 6",
                "grand theft auto 6 pré venda",
                "gta vi lançamento",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center">
            <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-2xl">
              GT
            </div>
            <h3 className="mt-4 font-black text-lg">Games Tech Oficial</h3>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mt-1">
              Portal Editorial Autorizado
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Jornalismo investigativo, análises técnicas profundas e a verdade sobre a indústria
              dos videogames e hardware de alta performance.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 font-bold border-b border-slate-200 pb-3 mb-4">
              <TrendingUp className="h-4 w-4 text-indigo-600" /> Artigos em Destaque
            </div>
            <ol className="space-y-5">
              {[
                {
                  title:
                    "A escassez do PlayStation 5 Pro: Por que ele é a máquina perfeita para a nova geração?",
                  time: "Há 5 horas",
                },
                {
                  title:
                    "Especialistas explicam a RAGE Engine e como a física da água funciona.",
                  time: "Ontem",
                },
                {
                  title: "Rumor: Tamanho vazado do mapa de Leonida aponta escala massiva.",
                  time: "Há 3 dias",
                },
                {
                  title: "Comparativo: SSD do PS5 vs NVMe Gen4 em testes reais.",
                  time: "Há 4 dias",
                },
              ].map((a, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-3xl font-black text-slate-200 leading-none">{i + 1}</span>
                  <div>
                    <div className="font-semibold text-sm leading-snug text-slate-900 hover:text-indigo-700 cursor-pointer">
                      {a.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{a.time}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-2 font-bold mb-1">
              <Mail className="h-4 w-4" /> Assine a NewsTech
            </div>
            <p className="text-sm text-indigo-200 mb-4">
              Receba semanalmente as análises mais relevantes sobre hardware e o universo gamer.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-2"
            >
              <input
                type="email"
                required
                placeholder="seu@email.com"
                className="w-full rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="w-full bg-white text-indigo-900 font-bold rounded-lg py-2.5 text-sm hover:bg-indigo-50 transition"
              >
                Inscrever Gratuitamente
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Categorias
            </div>
            <ul className="space-y-2 text-sm">
              {["PlayStation", "Xbox", "PC Gaming", "Hardware", "Rockstar Games", "Indústria"].map(
                (c) => (
                  <li key={c}>
                    <a
                      href="#"
                      className="flex items-center justify-between text-slate-700 hover:text-indigo-700"
                    >
                      <span>{c}</span>
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        </aside>
      </main>

      <footer id="contato" className="bg-slate-900 text-slate-300 mt-12">
        <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black">
                GT
              </div>
              <div className="font-black text-white">GAMES TECH</div>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Portal editorial independente. Análises técnicas sobre videogames e hardware.
            </p>
          </div>
          <div>
            <div className="font-bold text-white mb-3">Editorial</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Últimas Notícias</a></li>
              <li><a href="#" className="hover:text-white">Reviews & Tech</a></li>
              <li><a href="#" className="hover:text-white">Hardware</a></li>
              <li><a href="#" className="hover:text-white">Reportagens</a></li>
            </ul>
          </div>
          <div id="sobre">
            <div className="font-bold text-white mb-3">Institucional</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-white">Equipe Editorial</a></li>
              <li><a href="#" className="hover:text-white">Política Editorial</a></li>
              <li><a href="#" className="hover:text-white">Privacidade</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold text-white mb-3">Contato Corporativo</div>
            <p className="text-sm text-slate-400">
              redacao@gamestech.editorial<br />
              comercial@gamestech.editorial
            </p>
          </div>
        </div>
        <div className="border-t border-slate-800">
          <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
            <span>© {new Date().getFullYear()} Games Tech Editorial. Todos os direitos reservados.</span>
            <span>
              Marcas citadas pertencem aos seus respectivos titulares. Conteúdo de natureza
              editorial.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
