// MENU HAMBURGER
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    const headerContainer = document.querySelector('header .container');

    // Criar overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-mobile-overlay';
    document.body.appendChild(overlay);

    // Criar botão hamburger
    const btn = document.createElement('button');
    btn.className = 'hamburger';
    btn.setAttribute('aria-label', 'Menu');
    btn.innerHTML = '<span></span><span></span><span></span>';
    headerContainer.appendChild(btn);

    function abrirMenu() {
        btn.classList.add('aberto');
        nav.classList.add('mobile-aberto');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function fecharMenu() {
        btn.classList.remove('aberto');
        nav.classList.remove('mobile-aberto');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    btn.addEventListener('click', () => {
        btn.classList.contains('aberto') ? fecharMenu() : abrirMenu();
    });

    overlay.addEventListener('click', fecharMenu);

    // Fechar ao clicar num link
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', fecharMenu));
});
