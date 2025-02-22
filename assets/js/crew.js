const dotsContainer = document.querySelector('.dots');
const dotContentContainer = document.querySelector('.dots-content');
const crewContainer = document.querySelector('.crews');

let array = [];
let dotLinks = [];
let dotPanels = [];

async function getData(){
    const response = await fetch('./assets/json/space.json');
    const data =  await response.json();
    array = data;
    renderTabs();
    renderTabContents();
    updateEventListeners();

}
function renderTabs(){
    dotsContainer.innerHTML = ''
    array.crew.forEach((c,index) => {
      dotsContainer.innerHTML += `
      <li class="dot">
        <a href="#" class="dot-link ${index === 0 ? "active" : ""}" data-dot="${index}"></a>
      </li>
      `
    })

    dotLinks = document.querySelectorAll('.dot-link');
    dotLinks.forEach(dot => dot.addEventListener('click',setActiveTab));

}

function renderTabContents(){
    dotContentContainer.innerHTML = "";
    array.crew.forEach((c,index) => {
      dotContentContainer.innerHTML += `
      <div class="dot-panel ${index === 0 ? "active" : ""}" id="${index}">
        <h3>${c.role.toUpperCase()} </h3>
        <h2>${c.name.toUpperCase()}</h2>
        <p>${c.bio}</p>
      </div>
      `
    })
    dotPanels = document.querySelectorAll('.dot-panel');

}

function updateEventListeners(){
    dotLinks = document.querySelectorAll('.dot-link');
    console.log(dotLinks);
    
    dotPanels = document.querySelectorAll('.dot-panel');
    console.log(dotPanels);
    

    dotLinks.forEach(dot => dot.addEventListener('click', setActiveTab));
}

function setActiveTab(e){
    e.preventDefault();
    dotLinks.forEach(dot => dot.classList.remove('active'));
    e.target.classList.add('active');
  
    const dotNumber = e.target.dataset.dot;
    const selectedCrew = array.crew[dotNumber];
    dotPanels.forEach(panel =>{
      panel.classList.remove('active');
      if(panel.id == dotNumber){
        panel.classList.add('active');
      }
    });

    dotContentContainer.innerHTML = `
      <div class="dot-panel active">
        <h3>${selectedCrew.role.toUpperCase()} </h3>
        <h2>${selectedCrew.name.toUpperCase()}</h2>
        <p>${selectedCrew.bio}</p>
      </div>
    `;

    const selectedImg = array.crew[dotNumber];
    const nameSplit = selectedImg.name.toLowerCase().split(" ").join("-")
    console.log(nameSplit);
    
    document.querySelector('.crews-img-container img').src = `assets/crew/image-${nameSplit}.png`;
}
getData();