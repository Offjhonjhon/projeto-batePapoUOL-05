



catchData();



function catchData(){
    const informations = axios.get
}





















function openSideMenu() {
    const sideMenuBackground = document.querySelector(".side-menu-background");
    const sideMenu = document.querySelector(".side-menu");
    sideMenu.style.width = "259px";
    sideMenuBackground.style.width = "375px";
    showMenuText();
}
function closeSideMenu(element){
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