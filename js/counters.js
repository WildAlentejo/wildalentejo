/* ═══════════════════════════════════════
   Wild Alentejo — Contadores Animados
   Suporta:
   - .sensor-card > .sensor-val  (index.html)
   - .metrica-box > strong       (agrofloresta.html)
═══════════════════════════════════════ */

(function () {

    function animarContador(el, destino, prefixo, sufixo, duracao) {
        var startTime = null;

        function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progresso = Math.min((timestamp - startTime) / duracao, 1);
            var valor = Math.round(easeOut(progresso) * destino);
            el.textContent = prefixo + valor.toLocaleString('pt-PT') + sufixo;
            if (progresso < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = prefixo + destino.toLocaleString('pt-PT') + sufixo;
            }
        }
        requestAnimationFrame(step);
    }

    function configurar(el) {
        if (el.dataset.animado) return;
        el.dataset.animado = '1';

        var texto = el.textContent.trim();
        // Suporta: "1.350", "+30", "900", "100%", "900 m²", "+40", "3"
        var match = texto.match(/^(\+?)(\d[\d.,\s]*)(%|m²)?/);
        if (!match) return;

        var prefixo = match[1] || '';
        var numStr  = match[2].replace(/[.,\s]/g, '');
        var sufixo  = match[3] ? ' ' + match[3] : (texto.includes('%') ? '%' : '');
        var destino = parseInt(numStr, 10);
        if (isNaN(destino)) return;

        var duracao = Math.min(Math.max(destino * 1.2, 800), 2000);
        el.textContent = prefixo + '0' + sufixo;

        setTimeout(function() {
            animarContador(el, destino, prefixo, sufixo, duracao);
        }, 150);
    }

    function init() {
        // Configuração: { elemento pai, elemento com número }
        var configs = [
            { pai: '.sensor-card',  filho: '.sensor-val' },
            { pai: '.metrica-box',  filho: 'strong' },
        ];

        configs.forEach(function(cfg) {
            var pais = document.querySelectorAll(cfg.pai);
            if (!pais.length) return;

            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (!entry.isIntersecting) return;
                    var el = entry.target.querySelector(cfg.filho);
                    if (el) configurar(el);
                    observer.unobserve(entry.target);
                });
            }, { threshold: 0.3 });

            pais.forEach(function(pai) { observer.observe(pai); });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
