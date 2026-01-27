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

if (window.innerWidth <= 1024) {
        const observerOptions = {
            root: null,
            /* Ajustamos para que o item só ative quando estiver 
               exatamente entre 48% e 52% da altura da tela (quase o centro exato)
            */
            rootMargin: '-48% 0px -50% 0px', 
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active-mobile');
                } else {
                    entry.target.classList.remove('active-mobile');
                }
            });
        }, observerOptions);

        const targets = document.querySelectorAll('#para .item p');
        targets.forEach(p => observer.observe(p));
    };

    //
    document.addEventListener("DOMContentLoaded", function() {
    // Só ativa o script se a tela for menor ou igual a 1024px (Mobile/Tablet)
    if (window.innerWidth <= 1024) {
        
        const observerOptions = {
            root: null, // Usa a janela do navegador como referência
            /* Define uma 'linha' de ativação no centro da tela. 
               O item acende quando chega próximo ao meio. */
            rootMargin: '-35% 0px -40% 0px', 
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Adiciona a classe que criamos no CSS
                    entry.target.classList.add('active-mobile');
                } else {
                    // Remove ao sair da zona central (efeito de foco único)
                    entry.target.classList.remove('active-mobile');
                }
            });
        }, observerOptions);

        // Seleciona todos os itens da sua seção de conteúdo
        const conteudos = document.querySelectorAll('.item-conteudo');
        
        conteudos.forEach(item => {
            observer.observe(item);
        });
    }
});