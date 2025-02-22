const tabsContainer = document.querySelector('.tabs');
const tabContentContainer = document.querySelector('.tab-content');
const planetContainer = document.querySelector('.planet-container');



let array = [];
let tabLinks = [];
let tabPanels = [];

async function getData(){
    const response = await fetch('./assets/json/space.json');
    const data =  await response.json();
    array = data;
    renderTabs();
    renderTabContents();

}


function renderTabs(){
    console.log(array.destinations);
    tabsContainer.innerHTML = '';
    array.destinations.forEach((destination, index) => {
      tabsContainer.innerHTML += `
        <li class="tab">
          <a href="#" class="tab-link ${index === 0 ? "active" : ""}" data-tab="${index}">${destination.name.toUpperCase()}</a>
        </li>
      `
    });

    
    tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach(link => link.addEventListener('click', setActiveTab));

  }
  
  function renderTabContents(){
    tabContentContainer.innerHTML = '';
    array.destinations.forEach((destination, index) => {
      tabContentContainer.innerHTML += `
        <div class="tab-panel ${index === 0 ? "active" : ""}" id="${index}">
          <h2>${destination.name.toUpperCase()}</h2>
          <p>${destination.description}</p>
          <div class="tab-content-info">
            <div class="distance-info">
                <h4>AVG. DISTANCE</h4>
                <h3>${destination.distance.toUpperCase()}</h3>
            </div>
            <div class="time-info">
                <h4>Est. travel time</h4>
                <h3>${destination.travel.toUpperCase()}</h3>
            </div>
        </div>
        </div>
        
      `
    });
    
    tabPanels = document.querySelectorAll('.tab-panel');
  }
  

  function setActiveTab(e){
    e.preventDefault();
    tabLinks.forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');
  
    const tabNumber = e.target.dataset.tab;
    tabPanels.forEach(panel =>{
      panel.classList.remove('active');
      if(panel.id == tabNumber){
        panel.classList.add('active');
      }
    });

    const selectedPlanet = array.destinations[tabNumber]; 
    console.log(selectedPlanet);
    
    planetContainer.innerHTML = `
    <h4><span>01</span> PICK YOUR DESTINATION</h4>
      <div class="planet-container-img">
        <img src="assets/destination/image-${selectedPlanet.name.toLowerCase()}.png" alt="${selectedPlanet.alt}">
      </div>
    `;
    


  }
  
  getData();