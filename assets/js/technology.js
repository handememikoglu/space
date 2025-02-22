const numbersContainer = document.querySelector('.numbers-tab');
const numberContentContainer = document.querySelector('.numbers-content');
const spaceLaunch = document.querySelector('.space-launch');

let array = [];
let numberLinks = [];
let numberPanels = [];

async function getData(){
    const response = await fetch('./assets/json/space.json');
    const data =  await response.json();
    array = data;
    renderTabs();
    renderTabContents();
    updateEventListeners();

}

function renderTabs(){
    numbersContainer.innerHTML ='';
    array.technology.forEach((t,index) => {
        numbersContainer.innerHTML +=`
        <li class="number">
        <a class="number-link ${index === 0 ? "active" : ""} " data-num="${index}" href="#">${index+1}</a>
        </li>
        `
    });

    numberLinks = document.querySelectorAll('.number-link');
    numberLinks.forEach(num => num.addEventListener('click',setActiveTab));

}

function renderTabContents(){
    numberContentContainer.innerHTML = "";
    array.technology.forEach((t,index) =>{
        numberContentContainer.innerHTML +=`
        <div class="number-panel ${index === 0 ? "active" : ""}" id="${index}">
        <h3>THE TERMINOLOGY…</h3>
        <h2>${t.name.toUpperCase()}</h2>
        <p>${t.description}</p>
        `
    });

    numberPanels = document.querySelectorAll('.number-panel');
}

function updateEventListeners(){
    numberLinks = document.querySelectorAll('.number-link');
    console.log(numberLinks);
    
    numberPanels = document.querySelectorAll('.number-panel');
    console.log(numberPanels);
    

    numberLinks.forEach(num => num.addEventListener('click',setActiveTab));
}

function setActiveTab(e){
    e.preventDefault();
    numberLinks.forEach(num => num.classList.remove('active'));
    e.target.classList.add('active');
  
    const dotNumber = e.target.dataset.num;
    numberPanels.forEach(panel =>{
      panel.classList.remove('active');
      if(panel.id == dotNumber){
        panel.classList.add('active');
      }
    });

    const selectedImg = array.technology[dotNumber];
    console.log(selectedImg.images.landscape);
    if (!selectedImg.images || !selectedImg.images.landscape) {
        console.error("Hata: Görsel verisi eksik!", selectedImg);
        return;
    }

    // Sadece img öğelerini güncelle
    const imgElements = document.querySelector(".space-launch-img");
    imgElements.innerHTML = `
        <img class="desktop-img" src="${selectedImg.images.portrait}" alt="">
        <img class="tablet-img" src="${selectedImg.images.landscape}" alt="">
    `;  

}
getData();