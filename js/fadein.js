/* ═══════════════════════════════════════
   Wild Alentejo — Fade-in ao scroll
   Incluir em todas as páginas antes de </body>
   <script src="js/fadein.js"></script>
═══════════════════════════════════════ */

(function () {
    const CSS = `
        .fade-in {
            opacity: 0;
            transform: translateY(22px);
            transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .fade-in.visivel {
            opacity: 1;
            transform: translateY(0);
        }
    `;

    // Injetar CSS
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Elementos que vão animar
    const SELECTORES = [
        '.sensor-card',
        '.info-card',
        '.link-card',
        '.card-planta',
        '.gallery-item',
        '.gallery-item-video',
        '.section-label',
        '.section-title',
        '.seccao-tecnica-box',
        '.carrosel-wrap',
        '.live-monitor',
        '.logbook-entry',
        '.produto-card',
    ].join(', ');

    function init() {
        const elementos = document.querySelectorAll(SELECTORES);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    // Delay escalonado para grupos de cards
                    const delay = entry.target.dataset.fadeDelay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visivel');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        // Escalonar cards dentro do mesmo pai
        const grupos = {};
        elementos.forEach(el => {
            const pai = el.parentElement;
            if (!grupos[pai]) grupos[pai] = [];
            grupos[pai].push(el);
        });

        Object.values(grupos).forEach(grupo => {
            grupo.forEach((el, i) => {
                el.classList.add('fade-in');
                el.dataset.fadeDelay = i * 80; // 80ms entre cada card
            });
        });

        elementos.forEach(el => observer.observe(el));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
