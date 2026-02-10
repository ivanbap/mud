//btn faq question
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    // Abre ou fecha o item clicado
    item.classList.toggle('active');
  });
});
//

//btn menu mobile
$(document).ready(function() {
    // Abre e fecha o menu ao clicar no botão
    $('.btn-mobile').on('click', function(e) {
        e.stopPropagation(); // Impede que o clique no botão "suba" para o document
        $('.mobile-menu').toggleClass('active');
        
        const icon = $(this).find('i');
        icon.toggleClass('fa-bars fa-xmark');
    });

    // Fecha o menu automaticamente ao clicar em qualquer link
    $('.mobile-list a').on('click', function() {
        fecharMenu();
    });

    // NOVA FUNÇÃO: Fecha ao clicar fora
    $(document).on('click', function(e) {
        const menu = $('.mobile-menu');
        const btn = $('.btn-mobile');

        // Se o clique NÃO foi no menu E NÃO foi no botão, e o menu está aberto
        if (!menu.is(e.target) && menu.has(e.target).length === 0 && !btn.is(e.target) && btn.has(e.target).length === 0) {
            if (menu.hasClass('active')) {
                fecharMenu();
            }
        }
    });

    // Função auxiliar para evitar repetição de código
    function fecharMenu() {
        $('.mobile-menu').removeClass('active');
        $('.btn-mobile i').addClass('fa-bars').removeClass('fa-xmark');
    }
});
//

//animação 'para quem' hover mobile
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

//formulario
const formulario = document.querySelector('.form');
const btn = document.querySelector('.btn-form');

// Configuração do alerta estilo "Toast" (discreto e moderno)
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

///mobile animação conteudo
if (window.innerWidth <= 1024) {
        const observerOptions = {
            root: null,
            // Foco centralizado: ativa quando o card passa pelo meio da tela
            rootMargin: '-40% 0px -45% 0px', 
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

        document.querySelectorAll('.card-clean').forEach(item => {
            observer.observe(item);
        });
    }

formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  // Feedback visual no botão
  btn.innerText = "Enviando...";
  btn.disabled = true;

  // Captura os dados do formulário
  const dados = {
    nome: document.querySelector('#nome').value,
    email: document.querySelector('#email').value,
    telefone: document.querySelector('#telefone').value
  };

  // Envio para a Planilha Google
  fetch('https://script.google.com/macros/s/AKfycby7LXfWDlglNIP7eR4NgEielCehEwlxqEEUHA9UrNJpl1jOETS4uyi3IBU_JFBaUZnLpg/exec', {
    method: 'POST',
    mode: 'no-cors', // Mantido para evitar bloqueios de CORS
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  })
  .then(() => {
    // Alerta de Sucesso
    Toast.fire({
      icon: 'success',
      title: 'Inscrição confirmada!'
    });
    
    formulario.reset(); // Limpa os campos
  })
  .catch(error => {
    console.error('Erro:', error);
    // Alerta de Erro
    Toast.fire({
      icon: 'error',
      title: 'Erro ao enviar. Tente novamente.'
    });
  })
  .finally(() => {
    // Restaura o botão após o processo
    btn.innerText = "Confirmar Inscrição";
    btn.disabled = false;
  });
});
//final formulario


