// auth.js
// tudo relacionado a login, cadastro e logout
// to usando localStorage porque ainda nao aprendi backend
// futuramente isso aqui vira uma requisicao pra uma api

// verifica se ja tem alguem logado quando a pagina abre
let usuarioLogado = JSON.parse(localStorage.getItem('horizonte_usuario')) || null;

// muda os botoes da navbar dependendo se o usuario ta logado ou nao
// atualiza tanto o desktop quanto o menu mobile
function atualizarNavbar() {
  const areaLogin       = document.getElementById('area-login');
  const areaLoginMobile = document.getElementById('area-login-mobile');

  if (usuarioLogado) {
    const htmlLogado = `
      <div class="d-flex align-items-center gap-2">
        <span class="saudacao-nav">
          <i class="bi bi-person-circle text-warning me-1"></i>
          Olá, <strong>${usuarioLogado.nome}</strong>
        </span>
        <button class="nav-link btn-login-nav" onclick="fazerLogout()">
          <i class="bi bi-box-arrow-right me-1"></i>Sair
        </button>
      </div>
    `;

    const htmlLogadoMobile = `
      <div class="menu-usuario-mobile">
        <div class="menu-usuario-nome">
          <i class="bi bi-person-circle text-warning me-2"></i>
          Olá, <strong>${usuarioLogado.nome}</strong>
        </div>
        <button class="btn-sair-mobile" onclick="fazerLogout()">
          <i class="bi bi-box-arrow-right me-2"></i>Sair da conta
        </button>
      </div>
    `;

    if (areaLogin)       areaLogin.innerHTML       = htmlLogado;
    if (areaLoginMobile) areaLoginMobile.innerHTML = htmlLogadoMobile;

    // troca o titulo do hero com o nome do usuario
    const saudacaoHero = document.getElementById('saudacao-hero');
    if (saudacaoHero) {
      saudacaoHero.innerHTML = `Olá, <span class="destaque">${usuarioLogado.nome}</span>, para onde quer ir?`;
    }

  } else {
    const htmlDeslogado = `
      <div class="d-flex gap-2">
        <a class="nav-link btn-login-nav" href="#" data-bs-toggle="modal" data-bs-target="#modalLogin">
          <i class="bi bi-person me-1"></i>Entrar
        </a>
        <a class="nav-link btn-cadastro-nav" href="#" data-bs-toggle="modal" data-bs-target="#modalCadastro">
          Cadastre-se
        </a>
      </div>
    `;

    const htmlDeslogadoMobile = `
      <div class="menu-botoes-mobile">
        <a class="btn-entrar-mobile" href="#" data-bs-toggle="modal" data-bs-target="#modalLogin" data-bs-dismiss="offcanvas">
          <i class="bi bi-person me-2"></i>Entrar
        </a>
        <a class="btn-cadastrar-mobile" href="#" data-bs-toggle="modal" data-bs-target="#modalCadastro" data-bs-dismiss="offcanvas">
          Cadastre-se grátis
        </a>
      </div>
    `;

    if (areaLogin)       areaLogin.innerHTML       = htmlDeslogado;
    if (areaLoginMobile) areaLoginMobile.innerHTML = htmlDeslogadoMobile;

    const saudacaoHero = document.getElementById('saudacao-hero');
    if (saudacaoHero) {
      saudacaoHero.innerHTML = `Explore o mundo com o <span class="destaque">Horizonte</span>`;
    }
  }
}

// funcao que roda quando o usuario clica em criar conta
function fazerCadastro() {
  const nome     = document.getElementById('cadNome').value.trim();
  const email    = document.getElementById('cadEmail').value.trim();
  const telefone = document.getElementById('cadTelefone').value.trim();
  const senha    = document.getElementById('cadSenha').value;
  const termos   = document.getElementById('aceitarTermos').checked;

  // checa se todos os campos foram preenchidos direito
  if (!nome)                                                { mostrarToast('Informe seu nome.'); return; }
  if (!email || !email.includes('@'))                       { mostrarToast('Informe um e-mail válido.'); return; }
  if (!telefone || telefone.replace(/\D/g, '').length < 10) { mostrarToast('Informe seu telefone com DDD.'); return; }
  if (senha.length < 8)                                     { mostrarToast('A senha precisa ter pelo menos 8 caracteres.'); return; }
  if (!termos)                                              { mostrarToast('Aceite os termos de uso pra continuar.'); return; }

  // nao deixa cadastrar o mesmo email duas vezes
  const usuarios = JSON.parse(localStorage.getItem('horizonte_usuarios') || '[]');
  if (usuarios.find(u => u.email === email)) {
    mostrarToast('Esse e-mail já tem uma conta cadastrada.');
    return;
  }

  // salva o usuario novo
  const novoUsuario = { nome, email, telefone, senha };
  usuarios.push(novoUsuario);
  localStorage.setItem('horizonte_usuarios', JSON.stringify(usuarios));

  // ja loga automaticamente depois de cadastrar
  usuarioLogado = novoUsuario;
  localStorage.setItem('horizonte_usuario', JSON.stringify(novoUsuario));

  bootstrap.Modal.getInstance(document.getElementById('modalCadastro')).hide();
  ['cadNome', 'cadEmail', 'cadTelefone', 'cadSenha'].forEach(id => document.getElementById(id).value = '');

  atualizarNavbar();
  mostrarToast(`Bem-vindo, ${nome}! Conta criada com sucesso.`);
}

// funcao que roda quando o usuario clica em entrar
function fazerLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;

  if (!email || !senha) { mostrarToast('Preencha e-mail e senha.'); return; }

  const usuarios = JSON.parse(localStorage.getItem('horizonte_usuarios') || '[]');
  const usuario  = usuarios.find(u => u.email === email && u.senha === senha);

  if (!usuario) { mostrarToast('E-mail ou senha incorretos.'); return; }

  usuarioLogado = usuario;
  localStorage.setItem('horizonte_usuario', JSON.stringify(usuario));

  bootstrap.Modal.getInstance(document.getElementById('modalLogin')).hide();
  ['loginEmail', 'loginSenha'].forEach(id => document.getElementById(id).value = '');

  atualizarNavbar();
  mostrarToast(`Bem-vindo de volta, ${usuario.nome}!`);
}

// remove o usuario da sessao e volta pra tela inicial
function fazerLogout() {
  usuarioLogado = null;
  localStorage.removeItem('horizonte_usuario');
  atualizarNavbar();
  mostrarToast('Você saiu da sua conta. Até logo!');
}
