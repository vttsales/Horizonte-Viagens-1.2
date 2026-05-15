// chatbot.js
// assistente virtual "Hor"
// funciona comparando palavras-chave com o que o usuario digitou
// nada de machine learning, e if/else mesmo

const respostasChatbot = [
  {
    palavras: ['oi', 'olá', 'ola', 'hey', 'bom dia', 'boa tarde', 'boa noite'],
    resposta: () => `Olá${usuarioLogado ? ', ' + usuarioLogado.nome : ''}! Sou o Hor, assistente da Horizonte Viagens. Como posso te ajudar?`
  },
  {
    palavras: ['combo', 'combos', 'pacote', 'pacotes'],
    resposta: () => `Temos ${combos.length} combos disponíveis divididos em duas categorias: ${combosLuxo.length} pacotes de luxo (internacionais) e ${combosEconomico.length} pacotes econômicos (nacionais). Role a página para ver todos.`
  },
  {
    palavras: ['luxo', 'internacional', 'premium', 'executiva'],
    resposta: () => `Nossos pacotes de luxo incluem Paris, Tóquio e Nova York. Passagens em classe executiva, hotéis 5★ e ingressos para eventos exclusivos. Parcelamos em até 12x sem juros.`
  },
  {
    palavras: ['economico', 'econômico', 'barato', 'nacional', 'brasil'],
    resposta: () => `Nossos pacotes econômicos são todos no Brasil: Porto Seguro, Ubatuba e Florianópolis. O mais em conta começa em ${combosEconomico.reduce((a,c) => a.precoCombo < c.precoCombo ? a : c).precoCombo.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}. Ótimo custo-benefício!`
  },
  {
    palavras: ['paris', 'franca', 'frança', 'eiffel'],
    resposta: () => { const c = combosLuxo.find(x => x.destino === 'Paris'); return `O combo Paris (${c.duracao}) inclui: ${c.inclui.join(', ')}. Por ${c.precoCombo.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} — pacote de luxo com classe executiva.`; }
  },
  {
    palavras: ['toquio', 'tóquio', 'japao', 'japão', 'fuji'],
    resposta: () => { const c = combosLuxo.find(x => x.destino === 'Tóquio'); return `O combo Tóquio (${c.duracao}) inclui: ${c.inclui.join(', ')}. Por ${c.precoCombo.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}.`; }
  },
  {
    palavras: ['nova york', 'new york', 'manhattan', 'broadway', 'central park'],
    resposta: () => { const c = combosLuxo.find(x => x.destino === 'Nova York'); return `O combo Nova York (${c.duracao}) inclui: ${c.inclui.join(', ')}. Por ${c.precoCombo.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}.`; }
  },
  {
    palavras: ['porto seguro', 'trancoso', 'bahia'],
    resposta: () => { const c = combosEconomico.find(x => x.destino === 'Porto Seguro'); return `O combo Porto Seguro (${c.duracao}) inclui: ${c.inclui.join(', ')}. Por ${c.precoCombo.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})} — pacote econômico nacional.`; }
  },
  {
    palavras: ['ubatuba', 'itamambuca', 'surf'],
    resposta: () => { const c = combosEconomico.find(x => x.destino === 'Ubatuba'); return `O combo Ubatuba (${c.duracao}) inclui: ${c.inclui.join(', ')}. Por ${c.precoCombo.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}.`; }
  },
  {
    palavras: ['florianopolis', 'florianópolis', 'floripa', 'acores', 'açores'],
    resposta: () => { const c = combosEconomico.find(x => x.destino === 'Florianópolis'); return `O combo Florianópolis (${c.duracao}) inclui: ${c.inclui.join(', ')}. Por ${c.precoCombo.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}.`; }
  },
  {
    palavras: ['preco', 'preço', 'quanto', 'valor', 'barato', 'caro'],
    resposta: () => {
      const b = combos.reduce((a, c) => a.precoCombo < c.precoCombo ? a : c);
      return `O combo mais em conta é ${b.destino} por ${b.precoCombo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}. Todos os combos podem ser parcelados em até 12x sem juros.`;
    }
  },
  {
    palavras: ['whatsapp', 'zap', 'atendimento', 'humano', 'suporte', 'falar'],
    resposta: () => `Clica no botão verde no canto da tela para falar com nossa equipe pelo WhatsApp. Atendemos das 8h às 22h.`
  },
  {
    palavras: ['login', 'entrar', 'conta', 'cadastro', 'cadastrar'],
    resposta: () => usuarioLogado
      ? `Você já está logado como ${usuarioLogado.nome}. Quer ver algum combo?`
      : `Clica em "Entrar" no menu para fazer login, ou em "Cadastre-se" para criar sua conta gratuitamente.`
  },
  {
    palavras: ['parcela', 'parcelar', 'cartao', 'cartão', 'pagamento', 'pix'],
    resposta: () => `Parcelamos em até 12x sem juros no cartão. Pagando no PIX, você tem mais 5% de desconto.`
  },
  {
    palavras: ['cancelar', 'cancelamento', 'reembolso', 'devolver'],
    resposta: () => `Cancelamento gratuito até 30 dias antes da viagem. Após esse prazo, entre em contato com nossa equipe pelo WhatsApp.`
  },
  {
    palavras: ['ingresso', 'evento', 'show', 'festival', 'musica', 'música'],
    resposta: () => `Cada combo inclui ingressos para eventos exclusivos no destino: festivais de música, semanas de moda, esportes e muito mais.`
  },
  {
    palavras: ['obrigado', 'obrigada', 'valeu', 'thanks', 'brigado'],
    resposta: () => `Por nada! Qualquer dúvida é só chamar. Boa viagem!`
  },
];

function respostaPadrao() {
  return `Não entendi muito bem. Posso te ajudar com informações sobre combos, preços, parcelamento, destinos ou cadastro. Se preferir, fale com nossa equipe pelo WhatsApp.`;
}

function iniciarChatbot() {
  const input = document.getElementById('chatbot-input');
  if (!input) return;

  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') enviarMensagemChat();
  });

  // manda uma mensagem inicial depois de 1 segundo pra nao aparecer do nada
  setTimeout(() => {
    const nome = usuarioLogado ? `, ${usuarioLogado.nome}` : '';
    adicionarMensagemChat(`Olá${nome}! Sou o Hor, assistente virtual da Horizonte Viagens. Como posso te ajudar?`, 'bot');
  }, 1200);
}

function enviarMensagemChat() {
  const input    = document.getElementById('chatbot-input');
  const mensagem = input.value.trim();
  if (!mensagem) return;

  adicionarMensagemChat(mensagem, 'usuario');
  input.value = '';

  // espera um pouco antes de responder pra nao parecer tao robotico
  setTimeout(() => {
    adicionarMensagemChat(processarMensagem(mensagem), 'bot');
  }, 700);
}

function processarMensagem(texto) {
  // transforma tudo em minusculo e tira os acentos pra comparar melhor
  const t = texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  for (const item of respostasChatbot) {
    if (item.palavras.some(p => t.includes(p))) return item.resposta();
  }
  return respostaPadrao();
}

function adicionarMensagemChat(texto, tipo) {
  const container = document.getElementById('chatbot-mensagens');
  if (!container) return;
  const div     = document.createElement('div');
  div.className = `msg-${tipo}`;
  div.innerHTML = texto.replace(/\n/g, '<br>');
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function toggleChatbot() {
  document.getElementById('chatbot-janela').classList.toggle('aberto');
}
