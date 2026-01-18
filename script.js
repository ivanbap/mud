//btn faq
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    // Abre ou fecha o item clicado
    item.classList.toggle('active');
  });
});

$(document).ready(function() {
    // Abre e fecha o menu ao clicar no botão
    $('.btn-mobile').on('click', function(e) {
        e.preventDefault();
        $('.mobile-menu').toggleClass('active');
        
        // Troca o ícone
        const icon = $(this).find('i');
        icon.toggleClass('fa-bars fa-xmark');
    });

    // Fecha o menu automaticamente ao clicar em qualquer link (âncora)
    $('.mobile-list a').on('click', function() {
        $('.mobile-menu').removeClass('active');
        
        // Garante que o ícone volte a ser o "hambúrguer"
        $('.btn-mobile i').addClass('fa-bars').removeClass('fa-xmark');
    });
});