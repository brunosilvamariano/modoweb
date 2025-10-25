/*
 * Lógica JavaScript para o Footer Modernizado
 * Adiciona interatividade, como a funcionalidade de newsletter (simulada)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Adicionar um pequeno efeito de hover nos links da lista
    const footerLinks = document.querySelectorAll('.footer__col--links .footer__link');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const icon = link.previousElementSibling;
            if (icon && icon.classList.contains('bi-arrow-right-short')) {
                icon.style.transform = 'translateX(5px)';
            }
        });
        link.addEventListener('mouseleave', () => {
            const icon = link.previousElementSibling;
            if (icon && icon.classList.contains('bi-arrow-right-short')) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });
});

