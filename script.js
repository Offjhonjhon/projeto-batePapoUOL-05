let userNamePost = {
    name: null
};
let arrayMessages = [];




// catchName();
// setInterval(sendPeriodicNameRequest, 5000);
pickUpMensages();

// Requisiçoes para o servidor relacionadas ao nome do usuario
// Recebe o nome do usuario ao abrir a pagina
function catchName() {
    let userName = null;
    if (userNamePost.name === null) {
        userName = prompt("Qual seu nome?");
    }
    else if (userNamePost.name !== null) {
        userName = prompt("Este nome de usuario já está sendo utilizado, por favor forneça outro.")
    }
    userNamePost = {
        name: userName
    }
    sendInicialNameRequest();
}
// Envia a requisição incial ao usuario
function sendInicialNameRequest() {
    const promisse = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants ", userNamePost);
    promisse.then(treatSuccess);
    promisse.catch(treatUserNameFailure);
}
// Trata o erro de usuario já existente e pede novamente o nome
function treatUserNameFailure(error) {
    const statusCode = error.response.status;
    console.log(statusCode);
    catchName();
}
// Envia o nome do usuario para o endereço de status
function sendPeriodicNameRequest() {
    const promisse = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", userNamePost);
    promisse.then(treatSuccess);
    promisse.catch(treatFailure);
}


// Requisiçoes relacionadas as mensagens no servidor
// Pede ao servidor as mensagens
function pickUpMensages() {
    const promisse = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promisse.then(treatSuccesMensages);
    promisse.catch(treatFailure);
}
// Adiciona as mensages a uma variavel
function treatSuccesMensages(response) {
    arrayMessages = response.data;
    formatMensage();
}
// Trata o formato no qual as mensagens devem ser apresentadas
function formatMensage() {
    const messageHtml = document.querySelector("main");
    for (let i = 0; i < arrayMessages.length; i++) {

        if (arrayMessages[i].type === "status") {
            messageHtml.innerHTML += ` 
                <div class="chat ${arrayMessages[i].type}">
                <p class="time">(${arrayMessages[i].time}) &nbsp;</p>
                <p class="from">${arrayMessages[i].from} &nbsp;</p>
                <p class="text">${arrayMessages[i].text}</p>
                </div>
                `}

        if (arrayMessages[i].type === "message") {
            messageHtml.innerHTML += ` 
                <div class="chat ${arrayMessages[i].type}">
                <p class="time">(${arrayMessages[i].time}) &nbsp;</p>
                <p class="from">${arrayMessages[i].from} &nbsp;</p>
                <p> para &nbsp<span class="to">${arrayMessages[i].to}</span> &nbsp;</p>
                <p class="text">${arrayMessages[i].text}</p>
                </div>
                `}

        if (arrayMessages[i].type === "private-message") {
            messageHtml.innerHTML += ` 
                <div class="chat ${arrayMessages[i].type}">
                <p class="time">(${arrayMessages[i].time}) &nbsp;</p>
                <p class="from">${arrayMessages[i].from} &nbsp;</p>
                <p> reservadamente para &nbsp <span class="to">${arrayMessages[i].to}</span> &nbsp;</p>
                <p class="text">${arrayMessages[i].text}</p>
                </div>
                `}
    }
}




// Verificacoes de requisiçoes ao servidor
// Trata caso a requisição seja bem sucedida
function treatSuccess(response) {
    const statusCode = response.status;
    console.log(statusCode);
}
// Trata caso a requisiçao não seja bem sucedida
function treatFailure(error) {
    const statusCode = error.response.status;
    console.log(statusCode);
}





// Efeitos do menu lateral
function openSideMenu() {
    const sideMenuBackground = document.querySelector(".side-menu-background");
    const sideMenu = document.querySelector(".side-menu");
    sideMenu.style.width = "259px";
    sideMenuBackground.style.width = "375px";
    showMenuText();
}
function closeSideMenu(element) {
    const sideMenuBackground = document.querySelector(".side-menu-background");
    const sideMenu = document.querySelector(".side-menu");
    sideMenu.style.width = "0";
    sideMenuBackground.style.width = "0";
    hiddenMenuText();
}
function showMenuText() {
    const sideMenu = document.querySelector(".side-menu");
    sideMenu.innerHTML = ` <h4>Escolha um contato para enviar mensagem:</h4> `
}
function hiddenMenuText() {
    const sideMenu = document.querySelector(".side-menu");
    sideMenu.innerHTML = "";
}