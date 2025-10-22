/**
 * ===== FUNCIONALIDADE DE GALERIA COM ABAS DE FILTRO =====
 * Script para controlar a exibição dos projetos por categoria.
 */

document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.galeria__tab-btn');
    const galeriaGrid = document.querySelector('.galeria__grid');
    const galeriaCards = document.querySelectorAll('.galeria__card');

    if (!tabButtons.length || !galeriaGrid || !galeriaCards.length) {
        console.warn('Elementos da galeria não encontrados. A funcionalidade de abas não será ativada.');
        return;
    }

    // Função para filtrar os cards
    function filterCards(filter) {
        galeriaCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            // Verifica se o card deve ser exibido
            const isVisible = filter === 'all' || category === filter;
            
            // Aplica a classe para controle de visibilidade (via CSS)
            if (isVisible) {
                card.style.display = 'block'; // Mostra o card
                // Adiciona uma pequena animação de fade-in (opcional, se o CSS suportar)
                setTimeout(() => card.classList.add('visible'), 50); 
            } else {
                card.style.display = 'none'; // Esconde o card
                card.classList.remove('visible');
            }
        });
    }

    // Adiciona o evento de clique a cada botão de aba
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // 1. Atualiza o estado 'active' dos botões
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // 2. Aplica o filtro aos cards
            filterCards(filter);
            
            // 3. Atualiza o estado de acessibilidade (aria-selected)
            tabButtons.forEach(btn => btn.setAttribute('aria-selected', 'false'));
            this.setAttribute('aria-selected', 'true');
        });
    });

    // Inicializa a galeria com o filtro 'all' ativo
    filterCards('all');
});

