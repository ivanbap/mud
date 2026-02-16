function doGet(e) {
  const emailAcesso = e.parameter.email;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0]; // Pega a primeira aba
  const data = sheet.getDataRange().getValues();
  
  // Supondo que: Coluna A = Nome, Coluna B = Email
  // Se for diferente, mude os números abaixo (0 é A, 1 é B...)
  const indexNome = 1; 
  const indexEmail = 2;

  let usuario = null;

  for (let i = 1; i < data.length; i++) {
    if (data[i][indexEmail].toString().toLowerCase().trim() === emailAcesso.toLowerCase().trim()) {
      usuario = data[i][indexNome];
      break;
    }
  }

  const result = usuario ? 
    { result: "autorizado", nome: usuario } : 
    { result: "negado" };

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// Mantenha seu doPost original para inscrições abaixo...



const URL_GOOGLE = "SUA_URL_AQUI";

const formLogin = document.querySelector('#login-form');
if(formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = formLogin.querySelector('.btn-form');
        const email = document.querySelector('#email-login').value.trim();

        btn.innerText = "Verificando...";
        btn.disabled = true;

        fetch(`${URL_GOOGLE}?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow' 
        })
        .then(res => res.json())
        .then(data => {
            if(data.result === "autorizado") {
                // SALVA OS DADOS PARA USAR NA PRÓXIMA PÁGINA
                localStorage.setItem('curso_acesso', 'true');
                localStorage.setItem('aluno_nome', data.nome); 

                Swal.fire({ 
                    icon: 'success', 
                    title: `Olá, ${data.nome}!`, 
                    text: 'Acesso liberado.',
                    timer: 2000, 
                    showConfirmButton: false 
                }).then(() => {
                    window.location.href = "../curso/curso.html";
                });
            } else {
                Swal.fire('Acesso Negado', 'E-mail não encontrado.', 'error');
            }
        })
        .catch(err => {
            console.error(err);
            Swal.fire('Erro', 'Falha na conexão.', 'error');
        })
        .finally(() => {
            btn.innerText = "Entrar no Curso";
            btn.disabled = false;
        });
    });
}