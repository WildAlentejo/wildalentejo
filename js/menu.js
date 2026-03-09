// MENU HAMBURGER — Wild Alentejo
(function() {
    var nav = document.querySelector('nav');
    var headerContainer = document.querySelector('header .container');

    if (!nav || !headerContainer) return;

    // Criar overlay
    var overlay = document.createElement('div');
    overlay.className = 'nav-mobile-overlay';
    document.body.appendChild(overlay);

    // Criar botão hamburger
    var btn = document.createElement('button');
    btn.className = 'hamburger';
    btn.setAttribute('aria-label', 'Menu');
    btn.innerHTML = '<span></span><span></span><span></span>';
    headerContainer.appendChild(btn);

    function fecharMenu() {
        btn.classList.remove('aberto');
        nav.classList.remove('mobile-aberto');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function abrirMenu() {
        btn.classList.add('aberto');
        nav.classList.add('mobile-aberto');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    btn.addEventListener('click', function() {
        btn.classList.contains('aberto') ? fecharMenu() : abrirMenu();
    });

    overlay.addEventListener('click', fecharMenu);

    // Fechar e navegar ao clicar num link
    nav.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', function(e) {
            var href = a.getAttribute('href');
            fecharMenu();
            if (href && href !== '#') {
                e.preventDefault();
                setTimeout(function() {
                    window.location.href = href;
                }, 150);
            }
        });
    });
})();
