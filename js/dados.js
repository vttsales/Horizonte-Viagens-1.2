// dados.js
// arrays com os dados dos combos divididos em duas categorias:
// luxo (destinos internacionais premium) e economico (destinos nacionais acessiveis)
// num projeto real esses dados viriam de uma api/banco de dados

// --- combos de luxo ---
const combosLuxo = [
  {
    id: 'lux-1',
    destino: 'Paris',
    pais: 'França',
    emoji: '🗼',
    gradiente: 'linear-gradient(135deg, #a29bfe, #6c5ce7)',
    duracao: '15 dias',
    saida: 'São Paulo → Paris',
    atracao: 'Torre Eiffel',
    evento: 'Semana de Moda de Paris',
    dataEvento: '02 a 17 Out 2025',
    inclui: [
      'Passagem aérea ida e volta em classe executiva',
      'Hotel 5★ no centro de Paris',
      'Ingresso Semana de Moda + jantar gastronômico',
      'City tour guiado e passeio de barco no Sena'
    ],
    precoOriginal: 22000,
    precoCombo: 15000,
    parcelas: 12
  },
  {
    id: 'lux-2',
    destino: 'Tóquio',
    pais: 'Japão',
    emoji: '⛩️',
    gradiente: 'linear-gradient(135deg, #fd79a8, #d63031)',
    duracao: '20 dias',
    saida: 'São Paulo → Tóquio',
    atracao: 'Monte Fuji',
    evento: 'Festival Hanami (Cherry Blossom)',
    dataEvento: '25 Mar a 14 Abr 2026',
    inclui: [
      'Passagem aérea ida e volta em classe executiva',
      'Hotel 5★ em Shinjuku, Tóquio',
      'Ingresso Festival Hanami + excursão ao Monte Fuji',
      'JR Pass 14 dias + guia bilíngue'
    ],
    precoOriginal: 26000,
    precoCombo: 18000,
    parcelas: 12
  },
  {
    id: 'lux-3',
    destino: 'Nova York',
    pais: 'Estados Unidos',
    emoji: '🗽',
    gradiente: 'linear-gradient(135deg, #0093d0, #1a3a6b)',
    duracao: '10 dias',
    saida: 'São Paulo → Nova York',
    atracao: 'Central Park',
    evento: 'Broadway + Times Square NYE',
    dataEvento: '26 Dez 2025 a 04 Jan 2026',
    inclui: [
      'Passagem aérea ida e volta em classe executiva',
      'Hotel 4★ em Manhattan',
      'Ingresso show Broadway + réveillon Times Square',
      'City pass museus + passeio de helicóptero'
    ],
    precoOriginal: 18500,
    precoCombo: 12000,
    parcelas: 12
  }
]

// --- combos economicos ---
const combosEconomico = [
  {
    id: 'eco-1',
    destino: 'Porto Seguro',
    pais: 'Brasil — Bahia',
    emoji: '🏖️',
    gradiente: 'linear-gradient(135deg, #f9ca24, #f0932b)',
    duracao: '10 dias',
    saida: 'São Paulo → Porto Seguro',
    atracao: 'Trancoso',
    evento: 'Carnaval de Porto Seguro',
    dataEvento: '28 Fev a 08 Mar 2026',
    inclui: [
      'Passagem aérea ida e volta',
      'Pousada 3★ em Porto Seguro',
      'Ingresso Carnaval + abadá incluído',
      'Passeio de escuna para Trancoso'
    ],
    precoOriginal: 7200,
    precoCombo: 4500,
    parcelas: 10
  },
  {
    id: 'eco-2',
    destino: 'Ubatuba',
    pais: 'Brasil — São Paulo',
    emoji: '🌊',
    gradiente: 'linear-gradient(135deg, #00b894, #00cec9)',
    duracao: '7 dias',
    saida: 'São Paulo → Ubatuba',
    atracao: 'Praia do Itamambuca',
    evento: 'Festival de Surf de Ubatuba',
    dataEvento: '10 a 17 Jan 2026',
    inclui: [
      'Traslado de ônibus fretado ida e volta',
      'Pousada 3★ a 200m da praia',
      'Ingresso Festival de Surf + aula de surfe',
      'Passeio de caiaque nas praias selvagens'
    ],
    precoOriginal: 5000,
    precoCombo: 3200,
    parcelas: 6
  },
  {
    id: 'eco-3',
    destino: 'Florianópolis',
    pais: 'Brasil — Santa Catarina',
    emoji: '🏄',
    gradiente: 'linear-gradient(135deg, #55efc4, #0984e3)',
    duracao: '8 dias',
    saida: 'São Paulo → Florianópolis',
    atracao: 'Praia dos Açores',
    evento: 'Fenaostra — Festival da Ostra',
    dataEvento: '05 a 13 Out 2025',
    inclui: [
      'Passagem aérea ida e volta',
      'Apart-hotel 3★ na Lagoa da Conceição',
      'Ingresso Fenaostra + jantar de frutos do mar',
      'Passeio de barco pela Ilha'
    ],
    precoOriginal: 8000,
    precoCombo: 5500,
    parcelas: 10
  }
]

// junta os dois pra manter compatibilidade com o chatbot e a busca
const combos = [...combosLuxo, ...combosEconomico]

// monta o html de um card de combo
// separei numa funcao pra nao repetir codigo nos dois grupos
function montarCardCombo(combo) {
  const original = combo.precoOriginal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  const atual = combo.precoCombo.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  const parcela = (combo.precoCombo / combo.parcelas).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  const desconto = Math.round(
    (1 - combo.precoCombo / combo.precoOriginal) * 100
  )

  const itensHtml = combo.inclui
    .map(
      item =>
        `<li><i class="bi bi-check me-2" style="color:var(--azul-claro)"></i>${item}</li>`
    )
    .join('')

  return `
    <div class="col-md-6 col-lg-4">
      <div class="card-combo">
        <div class="combo-header" style="background: ${combo.gradiente};">
          <div class="combo-emoji">${combo.emoji}</div>
          <div class="combo-destino-nome">${combo.destino}</div>
          <div class="combo-pais"><i class="bi bi-geo-alt me-1"></i>${combo.pais}</div>
          <div class="combo-atracao"><i class="bi bi-camera me-1"></i>${combo.atracao}</div>
          <div class="combo-desconto-badge">-${desconto}% OFF</div>
        </div>
        <div class="combo-body">
          <div class="combo-infos">
            <span><i class="bi bi-moon me-1"></i>${combo.duracao}</span>
            <span><i class="bi bi-airplane me-1"></i>${combo.saida}</span>
          </div>
          <div class="combo-evento">
            <i class="bi bi-ticket-perforated-fill me-2"></i>
            <div>
              <div class="evento-nome">${combo.evento}</div>
              <div class="evento-data">${combo.dataEvento}</div>
            </div>
          </div>
          <ul class="combo-inclui">${itensHtml}</ul>
          <div class="combo-preco">
            <div class="combo-de">${original}</div>
            <div class="combo-por">${atual}</div>
            <div class="combo-parcelas">ou ${combo.parcelas}x de ${parcela} sem juros</div>
          </div>
          <div class="combo-acoes">
            <button class="btn-ver-combo" onclick="verCombo('${combo.id}')">
              <i class="bi bi-eye me-2"></i>Ver detalhes
            </button>
            <button class="btn-whatsapp-combo" onclick="abrirWhatsapp('${combo.destino}', '${atual}')">
              <i class="bi bi-whatsapp"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
}

// renderiza os dois grupos separados na pagina
function renderizarCombos() {
  const containerLuxo = document.getElementById('lista-combos-luxo')
  const containerEconomico = document.getElementById('lista-combos-economico')
  if (!containerLuxo || !containerEconomico) return

  containerLuxo.innerHTML = combosLuxo.map(montarCardCombo).join('')
  containerEconomico.innerHTML = combosEconomico.map(montarCardCombo).join('')
}

// so deixa ver os detalhes se o usuario estiver logado
function verCombo(id) {
  if (!usuarioLogado) {
    mostrarToast('Faça login para ver os detalhes e reservar.')
    new bootstrap.Modal(document.getElementById('modalLogin')).show()
    return
  }
  const combo = combos.find(c => c.id === id)
  mostrarToast(`Abrindo: ${combo.destino} — ${combo.evento}`)
}

// ---
// hoteis em destaque
const hoteis = [
  {
    nome: 'Grand Cancún Palace',
    localizacao: 'Zona Hoteleira, Cancún',
    estrelas: 5,
    nota: 9.4,
    precoNoite: 980,
    gradiente: 'linear-gradient(135deg, #0093d0, #00c6a7)'
  },
  {
    nome: 'Iberostar Lisboa',
    localizacao: 'Baixa Pombalina, Lisboa',
    estrelas: 4,
    nota: 9.1,
    precoNoite: 620,
    gradiente: 'linear-gradient(135deg, #c0392b, #e67e22)'
  },
  {
    nome: 'Marriott Miami Beach',
    localizacao: 'South Beach, Miami',
    estrelas: 5,
    nota: 9.6,
    precoNoite: 1450,
    gradiente: 'linear-gradient(135deg, #fd79a8, #e84393)'
  },
  {
    nome: 'Sofitel Buenos Aires',
    localizacao: 'Recoleta, Buenos Aires',
    estrelas: 5,
    nota: 8.9,
    precoNoite: 530,
    gradiente: 'linear-gradient(135deg, #74b9ff, #0984e3)'
  }
]

function renderizarHoteis() {
  const container = document.getElementById('lista-hoteis')
  if (!container) return
  container.innerHTML = ''

  hoteis.forEach(hotel => {
    const estrelas = '★'.repeat(hotel.estrelas) + '☆'.repeat(5 - hotel.estrelas)
    const preco = hotel.precoNoite.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    container.innerHTML += `
      <div class="col-sm-6 col-lg-3">
        <div class="card card-hotel">
          <div class="card-hotel-img" style="background: ${hotel.gradiente};">
            <i class="bi bi-building-fill text-white"></i>
          </div>
          <div class="card-body">
            <div class="estrelas">${estrelas}</div>
            <h6>${hotel.nome}</h6>
            <div class="localizacao"><i class="bi bi-geo-alt me-1"></i>${hotel.localizacao}</div>
            <div class="d-flex justify-content-between align-items-center">
              <span class="nota">${hotel.nota} <i class="bi bi-star-fill" style="font-size:0.7rem;"></i></span>
              <div class="preco-hotel">
                <small>a partir de</small>
                <strong>${preco}</strong>
                <small>/noite</small>
              </div>
            </div>
            <button class="btn w-100 mt-3 py-2"
              style="background:var(--azul-escuro);color:white;border-radius:8px;font-size:0.88rem;"
              onclick="mostrarToast('Verificando disponibilidade em ${hotel.nome}...')">
              Ver disponibilidade
            </button>
          </div>
        </div>
      </div>
    `
  })
}
