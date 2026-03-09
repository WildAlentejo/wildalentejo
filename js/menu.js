// MENU HAMBURGER — Wild Alentejo
(function() {
    var nav = document.querySelector('nav');
    var headerContainer = document.querySelector('header .container');

    if (!nav || !headerContainer) return;

    // Criar botão hamburger
    var btn = document.createElement('button');
    btn.className = 'hamburger';
    btn.setAttribute('aria-label', 'Menu');
    btn.innerHTML = '<span></span><span></span><span></span>';
    headerContainer.appendChild(btn);

    function fecharMenu() {
        btn.classList.remove('aberto');
        nav.classList.remove('mobile-aberto');
    }

    function abrirMenu() {
        btn.classList.add('aberto');
        nav.classList.add('mobile-aberto');
    }

    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        btn.classList.contains('aberto') ? fecharMenu() : abrirMenu();
    });

    // Fechar ao clicar fora do nav
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('mobile-aberto') && !nav.contains(e.target) && e.target !== btn) {
            fecharMenu();
        }
    });

    nav.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', fecharMenu);
    });
})();
