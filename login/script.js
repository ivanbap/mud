const URL_GOOGLE = "https://script.google.com/macros/s/AKfycbxnOK_51w6Sv2L0QHwa8NAV58IBDu4kvc4j9fvS-hcpzsVrpi_uaK4TqoZoAhv0brUcfw/exec";

// --- CONFIGURAÇÃO DO ALERTA TOAST ---
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
});

// --- LÓGICA DE INSCRIÇÃO (POST) ---
const formInscricao = document.querySelector('.form'); 
if(formInscricao && !formInscricao.id.includes('login')) {
    formInscricao.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = formInscricao.querySelector('.btn-form');
        btn.innerText = "Enviando...";
        btn.disabled = true;

        const dados = {
            nome: document.querySelector('#nome').value,
            email: document.querySelector('#email').value,
            telefone: document.querySelector('#telefone').value
        };

        fetch(URL_GOOGLE, {
            method: 'POST',
            mode: 'no-cors', // POST para Google Apps Script funciona melhor com no-cors
            body: JSON.stringify(dados)
        })
        .then(() => {
            Toast.fire({ icon: 'success', title: 'Inscrição realizada!' });
            formInscricao.reset();
        })
        .catch(() => Toast.fire({ icon: 'error', title: 'Erro ao enviar' }))
        .finally(() => {
            btn.innerText = "Confirmar Inscrição";
            btn.disabled = false;
        });
    });
}

// --- LÓGICA DE LOGIN (GET) ---
const formLogin = document.querySelector('#login-form');
if(formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = formLogin.querySelector('.btn-form');
        const emailInput = document.querySelector('#email-login');
        const email = emailInput.value.trim(); // Limpa espaços extras

        btn.innerText = "Verificando...";
        btn.disabled = true;

        // Adicionamos 'redirect: follow' para evitar o erro de conexão
        fetch(`${URL_GOOGLE}?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow' 
        })
        .then(res => {
            if (!res.ok) throw new Error('Erro na rede');
            return res.json();
        })
        .then(data => {
            if(data.result === "autorizado") {
                localStorage.setItem('curso_acesso', 'true');
                Swal.fire({ 
                    icon: 'success', 
                    title: 'Acesso Liberado!', 
                    timer: 1500, 
                    showConfirmButton: false 
                }).then(() => {
                    window.location.href = "curso.html";
                });
            } else {
                Swal.fire('Acesso Negado', 'E-mail não encontrado na base de dados.', 'error');
            }
        })
        .catch(error => {
            console.error('Erro detalhado:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro de Conexão',
                text: 'Não conseguimos validar seu acesso. Verifique sua internet ou se o script do Google está publicado como "Qualquer Pessoa".'
            });
        })
        .finally(() => {
            btn.innerText = "Entrar no Curso";
            btn.disabled = false;
        });
    });
}