// utils.js
// funcoes utilitarias que nao se encaixam em nenhum outro arquivo:
// mascaras de input, busca, whatsapp, newsletter e toast

// filtra os combos pelo destino que o usuario digitou
function buscarCombos() {
  const origem  = document.getElementById('origem').value.trim();
  const destino = document.getElementById('destino').value.trim().toLowerCase();
  const dataIda = document.getElementById('dataIda').value;

  if (!origem || !destino || !dataIda) {
    mostrarToast('Preencha origem, destino e data de ida.');
    return;
  }

  const encontrados = combos.filter(c =>
    c.destino.toLowerCase().includes(destino) ||
    c.pais.toLowerCase().includes(destino)
  );

  if (encontrados.length === 0) {
    mostrarToast(`Nenhum combo encontrado para "${destino}". Tente: Cancún, Paris, Miami...`);
    return;
  }

  mostrarToast(`${encontrados.length} combo(s) encontrado(s). Role a página pra ver.`);
  document.getElementById('combos').scrollIntoView({ behavior: 'smooth' });
}

// impede que o usuario selecione uma data que ja passou
function bloquearDatasPassadas() {
  const hoje = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(i => i.min = hoje);
}

// mascara de telefone — formata (11) 99999-9999 enquanto digita
function mascaraTelefone(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 11);
  if (v.length <= 10) {
    v = v.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    v = v.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
  }
  input.value = v;
}

// mascara de cpf — formata 000.000.000-00 enquanto digita
function mascaraCpf(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 11);
  v = v.replace(/(\d{3})(\d)/, '$1.$2')
       .replace(/(\d{3})(\d)/, '$1.$2')
       .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  input.value = v;
}

// mostra ou esconde a senha no campo
function toggleSenha(idCampo, btn) {
  const campo = document.getElementById(idCampo);
  const icone = btn.querySelector('i');
  campo.type  = campo.type === 'password' ? 'text' : 'password';
  icone.className = campo.type === 'password' ? 'bi bi-eye' : 'bi bi-eye-slash';
}

// barra colorida que mostra se a senha ta fraca ou forte enquanto digita
function iniciarIndicadorSenha() {
  const campo = document.getElementById('cadSenha');
  if (!campo) return;

  campo.addEventListener('input', function () {
    let forca = 0;
    if (this.value.length >= 8)          forca++;
    if (/[A-Z]/.test(this.value))        forca++;
    if (/[0-9]/.test(this.value))        forca++;
    if (/[^a-zA-Z0-9]/.test(this.value)) forca++;

    const niveis = [
      { pct: 0,   cor: '#e74c3c', label: 'Digite uma senha' },
      { pct: 25,  cor: '#e74c3c', label: 'Senha fraca' },
      { pct: 50,  cor: '#f39c12', label: 'Senha razoável' },
      { pct: 75,  cor: '#27ae60', label: 'Senha boa' },
      { pct: 100, cor: '#2ecc71', label: 'Senha forte!' },
    ];

    const n = niveis[forca];
    document.getElementById('barraSenha').style.cssText = `width:${n.pct}%;background:${n.cor};transition:all 0.3s;`;
    const t = document.getElementById('textoForcaSenha');
    t.textContent = n.label;
    t.style.color = n.cor;
  });
}

// salva o email na newsletter (simulacao por enquanto)
function cadastrarNewsletter() {
  const email = document.getElementById('emailNewsletter').value.trim();
  if (!email || !email.includes('@')) { mostrarToast('Informe um e-mail válido.'); return; }
  document.getElementById('emailNewsletter').value = '';
  mostrarToast('E-mail cadastrado! Você vai receber as melhores ofertas em primeira mão.');
}

// abre o whatsapp com uma mensagem ja preenchida pro combo
function abrirWhatsapp(destino, preco) {
  const numero = '5511999999999'; // trocar pelo numero real antes de entregar
  const msg    = encodeURIComponent(`Olá! Vi o combo para ${destino} por ${preco} no site Horizonte Viagens e gostaria de mais informações.`);
  window.open(`https://wa.me/${numero}?text=${msg}`, '_blank');
}

// abre o whatsapp geral (botao flutuante)
function abrirWhatsappGeral() {
  const numero = '5511999999999';
  const nome   = usuarioLogado ? usuarioLogado.nome : 'visitante';
  const msg    = encodeURIComponent(`Olá! Sou ${nome} e preciso de ajuda com o site Horizonte Viagens.`);
  window.open(`https://wa.me/${numero}?text=${msg}`, '_blank');
}

// toast — mensagem de feedback que aparece embaixo da tela
// uso em vez de alert() porque e menos invasivo
let timerToast = null;

function mostrarToast(mensagem) {
  const toast = document.getElementById('toastGlobal');
  document.getElementById('toastMensagem').textContent = mensagem;
  toast.classList.add('show');
  if (timerToast) clearTimeout(timerToast);
  timerToast = setTimeout(() => toast.classList.remove('show'), 3500);
}
