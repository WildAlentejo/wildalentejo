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

        var textoOriginal = el.textContent.trim();

        // Extrair prefixo (ex: "+"), número, e o resto como sufixo
        // Exemplos: "900 m²", "+30", "100%", "1.350", "540", "3"
        var match = textoOriginal.match(/^([+]?)(\d[\d.,]*)(.*)$/);
        if (!match) return;

        var prefixo = match[1] || '';
        var numStr  = match[2].replace(/[.,]/g, ''); // remover formatação pt
        var sufixo  = match[3] || '';                // tudo o resto: " m²", "%", ""
        var destino = parseInt(numStr, 10);

        if (isNaN(destino) || destino === 0) return;

        var duracao = Math.min(Math.max(destino * 1.5, 800), 2000);
        el.textContent = prefixo + '0' + sufixo;

        setTimeout(function() {
            animarContador(el, destino, prefixo, sufixo, duracao);
        }, 150);
    }

    function init() {
        var configs = [
            { pai: '.sensor-card', filho: '.sensor-val' },
            { pai: '.metrica-box', filho: 'strong' },
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
