// MENU HAMBURGER — Wild Alentejo
(function() {
    var nav = document.querySelector('nav');
    var headerContainer = document.querySelector('header .container');

    if (!nav || !headerContainer) return;

    // Criar overlay
    var overlay = document.createElement('div');
    overlay.style.cssText = 'display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:1049;';
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
        overlay.style.display = 'none';
    }

    function abrirMenu() {
        btn.classList.add('aberto');
        nav.classList.add('mobile-aberto');
        overlay.style.display = 'block';
    }

    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        btn.classList.contains('aberto') ? fecharMenu() : abrirMenu();
    });

    overlay.addEventListener('click', fecharMenu);

    // Navegar primeiro, fechar depois
    nav.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', function(e) {
            var href = a.getAttribute('href');
            e.preventDefault();
            fecharMenu();
            setTimeout(function() {
                window.location.href = href;
            }, 50);
        });
    });
})();
