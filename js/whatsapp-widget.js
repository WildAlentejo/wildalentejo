// Wild Alentejo — WhatsApp Widget
(function() {

    var PHONE = '351937573973';

    var MSG_PT = 'Olá! Vim pelo site Wild Alentejo e gostava de saber mais sobre o projeto.';
    var MSG_EN = 'Hello! I found Wild Alentejo online and would like to know more about the project.';

    var lang = document.documentElement.lang || 'pt';
    var msg = lang === 'en' ? MSG_EN : MSG_PT;
    var waUrl = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(msg);

    // Estilos
    var style = document.createElement('style');
    style.textContent = [
        '#wa-widget{position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;align-items:flex-end;gap:10px;font-family:"Inter",sans-serif;}',
        '#wa-tooltip{background:#1a1a1a;color:#fff;font-size:0.72rem;font-weight:700;padding:8px 14px;border-radius:4px;white-space:nowrap;opacity:0;transform:translateX(8px);transition:opacity 0.2s,transform 0.2s;pointer-events:none;}',
        '#wa-tooltip.visible{opacity:1;transform:translateX(0);}',
        '#wa-btn{width:56px;height:56px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;text-decoration:none;box-shadow:0 4px 12px rgba(37,211,102,0.35);transition:transform 0.2s,box-shadow 0.2s;}',
        '#wa-btn:hover{transform:scale(1.08);box-shadow:0 6px 20px rgba(37,211,102,0.45);}',
        '#wa-btn svg{width:30px;height:30px;fill:white;}'
    ].join('');
    document.head.appendChild(style);

    // HTML
    var wrap = document.createElement('div');
    wrap.id = 'wa-widget';

    var tooltip = document.createElement('div');
    tooltip.id = 'wa-tooltip';
    tooltip.textContent = lang === 'en' ? 'Chat on WhatsApp' : 'Fala connosco';

    var btn = document.createElement('a');
    btn.id = 'wa-btn';
    btn.href = waUrl;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.setAttribute('aria-label', 'WhatsApp');
    btn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

    wrap.appendChild(tooltip);
    wrap.appendChild(btn);
    document.body.appendChild(wrap);

    // Tooltip ao hover
    btn.addEventListener('mouseenter', function() { tooltip.classList.add('visible'); });
    btn.addEventListener('mouseleave', function() { tooltip.classList.remove('visible'); });

    // Mostrar tooltip automático após 4 segundos (uma vez)
    setTimeout(function() {
        if (!sessionStorage.getItem('wa_shown')) {
            tooltip.classList.add('visible');
            sessionStorage.setItem('wa_shown', '1');
            setTimeout(function() { tooltip.classList.remove('visible'); }, 3500);
        }
    }, 4000);

})();
