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
            mode: 'no-cors', 
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
        const email = emailInput.value.trim();

        btn.innerText = "Verificando...";
        btn.disabled = true;

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
                // --- ALTERAÇÕES AQUI ---
                localStorage.setItem('curso_acesso', 'true');
                localStorage.setItem('aluno_nome', data.nome); // SALVA O NOME DO PACIENTE

                Swal.fire({ 
                    icon: 'success', 
                    title: `Bem-vindo, ${data.nome}!`, // MENSAGEM PERSONALIZADA
                    text: 'Acesso liberado ao seu painel.',
                    timer: 2000, 
                    showConfirmButton: false 
                }).then(() => {
                    // REDIRECIONA PARA O MENU DE MÓDULOS
                    window.location.href = "../curso/curso.html"; 
                });
                // -----------------------
            } else {
                Swal.fire('Acesso Negado', 'E-mail não encontrado na base de dados.', 'error');
            }
        })
        .catch(error => {
            console.error('Erro detalhado:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro de Conexão',
                text: 'Não conseguimos validar seu acesso. Verifique se o script do Google está publicado como "Qualquer Pessoa".'
            });
        })
        .finally(() => {
            btn.innerText = "Entrar no Curso";
            btn.disabled = false;
        });
    });
}