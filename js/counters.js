/* ═══════════════════════════════════════
   Wild Alentejo — Contadores Animados
   Incluir nas páginas com .sensor-val
   <script src="js/counters.js"></script>
═══════════════════════════════════════ */

(function () {

    function animarContador(el, destino, prefixo, sufixo, duracao) {
        var inicio = 0;
        var startTime = null;

        // Usar easing ease-out para desacelerar no final
        function easeOut(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progresso = Math.min((timestamp - startTime) / duracao, 1);
            var valor = Math.round(easeOut(progresso) * destino);

            // Formatar com ponto nos milhares (ex: 1.350)
            var formatado = valor.toLocaleString('pt-PT');
            el.textContent = prefixo + formatado + sufixo;

            if (progresso < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = prefixo + destino.toLocaleString('pt-PT') + sufixo;
            }
        }

        requestAnimationFrame(step);
    }

    function init() {
        var cards = document.querySelectorAll('.sensor-card');

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (!entry.isIntersecting) return;

                var el = entry.target.querySelector('.sensor-val');
                if (!el || el.dataset.animado) return;
                el.dataset.animado = '1';

                var textoOriginal = el.textContent.trim();

                // Extrair prefixo, número e sufixo
                // Exemplos: "1.350", "+30", "900", "100%", "540"
                var match = textoOriginal.match(/^(\+?)(\d[\d.,]*)(%?)$/);
                if (!match) return;

                var prefixo = match[1] || '';   // ex: "+"
                var numStr  = match[2].replace(/[.,]/g, ''); // remover formatação
                var sufixo  = match[3] || '';   // ex: "%"
                var destino = parseInt(numStr, 10);

                if (isNaN(destino)) return;

                // Duração proporcional ao valor (mínimo 800ms, máximo 2000ms)
                var duracao = Math.min(Math.max(destino * 1.2, 800), 2000);

                // Começar do zero
                el.textContent = prefixo + '0' + sufixo;

                // Pequeno delay para o efeito ser visível
                setTimeout(function() {
                    animarContador(el, destino, prefixo, sufixo, duracao);
                }, 150);

                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.3
        });

        cards.forEach(function(card) {
            observer.observe(card);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
