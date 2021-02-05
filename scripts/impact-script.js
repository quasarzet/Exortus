//BURGER MENU AND OVERLAY------------------------------------------------------
const menuIcon = document.querySelector('.burger-menu');
const navbar = document.querySelector('.navbar');
const bodyHide = document.body;

menuIcon.addEventListener('click', ()=>{
    navbar.classList.toggle('overlay-change');
    bodyHide.classList.toggle('body-scroll-hide');
})


//GSAP ANIMATIONS--------------------------------------------------------------------

//HEADER GLOW
var titleTl = gsap.timeline();
titleTl.to("#header-title", {className: "+=blueGlow", delay: 0, opacity: 1, fontSize: "2em", letterSpacing: "10px", duration: 0.7});
titleTl.to("#header-title", {delay: 0, fontSize: "2em", letterSpacing: "1px", duration: 0.3});


// CONTACTS THE ENVIRONMENT API AND WRITES THE RESULTS
const carbonMonoxide = document.querySelector('.carbon-monoxide');
const fineParticles = document.querySelector('.fine-particles');
const ammonia = document.querySelector('.ammonia');
const lastUpdate = document.querySelector('.last-update');

const addNewData = async() =>{
    var results = await getNewData();
    const updatedTime = results[3];
    lastUpdate.innerHTML = updatedTime;
    incrementNumber();
}

const getNewData = async() =>{
    try{
        const response = await axios.get('https://api.openweathermap.org/data/2.5/air_pollution?lat=42&lon=-71&appid=53ead80b03f18d24c2addcee35ad45ae');
        const carbonMonoxideEmission = response.data.list[0].components.co;
        const fineParticlesEmission = response.data.list[0].components.pm2_5;
        const ammoniaEmission = response.data.list[0].components.nh3;
        const timeOfUpdate = response.data.list[0].dt;
        const dateInMilliseconds = ((1000 * timeOfUpdate)-3600000);
        const dateObject = new Date(dateInMilliseconds);
        const localTimeHour = dateObject.toLocaleString("en-US", {hour: "numeric"});
        const localTimeDay = dateObject.toLocaleString("en-US", {weekday: "long"});
        const dateOfUpdate = `Last updated on ${localTimeDay} at ${localTimeHour}`;
        return [carbonMonoxideEmission, fineParticlesEmission, ammoniaEmission, dateOfUpdate];
    }catch(e){
        return [0,0,0];
    }
}

async function incrementNumber(){
  const dataPollution = await getNewData();
  const pollutionOutput = [carbonMonoxide, fineParticles, ammonia];
  var polOutIndex = 0;
  for (let i=0; i<pollutionOutput.length; i++){
    var element = pollutionOutput[polOutIndex];
    var finalNumber = dataPollution[polOutIndex];
    if (finalNumber < 1){
      incrementNumberRecursiveFloat(0, finalNumber, element);
    }else{
      incrementNumberRecursive(0, finalNumber, element);
    }
    polOutIndex++;
  }
}

var speed = 15;
var speedFloat = 60;

   function incrementNumberRecursive (i, finalNumber, element) {
    if (i <= finalNumber) {
       element.innerHTML = i;
      setTimeout(function() {
        incrementNumberRecursive(i + 1, finalNumber, element);
      }, speed);
    }
  }

  function incrementNumberRecursiveFloat(i, finalNumber, element) {
    if ((Math.floor(i*100)) < (Math.floor(finalNumber*100))) {
       element.innerHTML = i.toFixed(3);
      setTimeout(function() {
        incrementNumberRecursiveFloat(i + 0.01, finalNumber, element);
      }, speedFloat);
    }
  }

addNewData();
