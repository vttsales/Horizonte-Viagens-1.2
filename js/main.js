// main.js
// arquivo principal — inicializa tudo quando a pagina termina de carregar
// esse arquivo tem que ser o ultimo a ser carregado no html

document.addEventListener('DOMContentLoaded', () => {

  // corrige os links do menu mobile pra fechar o offcanvas antes de scrollar
  // sem isso o scroll nao funciona no celular
  document.querySelectorAll('.menu-links .nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const destino = this.getAttribute('href');

      const offcanvas = document.getElementById('menuMobile');
      const instancia = bootstrap.Offcanvas.getInstance(offcanvas);
      if (instancia) instancia.hide();

      // espera o offcanvas fechar (320ms) antes de scrollar
      setTimeout(() => {
        const secao = document.querySelector(destino);
        if (secao) secao.scrollIntoView({ behavior: 'smooth' });
      }, 320);
    });
  });

  // inicializa os modulos
  atualizarNavbar();
  renderizarCombos();
  renderizarHoteis();
  bloquearDatasPassadas();
  iniciarChatbot();
  iniciarIndicadorSenha();

});
