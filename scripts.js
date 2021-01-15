//SPLASH SCREEN ---------------------------------------
// const splash = document.querySelector('.splash');
// const fadeInQuote = document.querySelector('.fade-in-quote');
// const fadeInAuthor = document.querySelector('.fade-in-author');

// document.addEventListener('DOMContentLoaded', (e) =>{
//     setTimeout(() =>{
//         fadeInQuote.classList.add('display-none');
//         fadeInAuthor.classList.add('display-none');
//         splash.classList.add('display-none');
//     }, 5000);
// })


//BURGER MENU AND OVERLAY------------------------------------------------------
const menuIcon = document.querySelector('.burger-menu');
const navbar = document.querySelector('.navbar');
const bodyHide = document.body;

menuIcon.addEventListener('click', ()=>{
    navbar.classList.toggle('overlay-change');
    bodyHide.classList.toggle('body-scroll-hide');
})


//NEWS SLIDER--------------------------------------------
const slideContainer = document.querySelector('.news-container');
const slide = document.querySelector('.slides');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const interval = 8000;

let slides = document.querySelectorAll('.slide');
let index = 1;
let slideId; 

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slide.append(firstClone);
slide.prepend(lastClone);


window.addEventListener("resize", function(event) {
  var newWidth = document.body.clientWidth;
  console.log(newWidth);
  slideWidth = newWidth;
  return moveToNextSlide();
});

var slideWidth = slides[index].clientWidth;

slide.style.transform = `translateX(${-slideWidth * index}px)`;

const startSlide = () =>{
  slideId = setInterval(() =>{
    moveToNextSlide();
  }, interval);
};

const getSlides = () => document.querySelectorAll('.slide');

slide.addEventListener('transitionend', ()=>{
  slides = getSlides();
  if(slides[index].id === firstClone.id){
    slide.style.transition = 'none';
    index = 1;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
  if(slides[index].id === lastClone.id){
    slide.style.transition = 'none';
    index = slides.length - 2;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

const moveToNextSlide = ()=>{
  slides = getSlides()
  if(index >= slides.length -1) return;
  index++;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = '.7s';
};

const moveToPrevSlide = ()=> {
  if(index <= 0) return;
  index--;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = '.7s';
};

slideContainer.addEventListener('mouseenter', ()=>{
  clearInterval(slideId)
});

slideContainer.addEventListener('mouseleave', startSlide);

nextBtn.addEventListener('click', moveToNextSlide);
prevBtn.addEventListener('click', moveToPrevSlide);
startSlide();


//IMPACT SECTION --------------------------------------------------//
const carbonMonoxide = document.querySelector('.carbon-monoxide');
const fineParticles = document.querySelector('.fine-particles');
const ammonia = document.querySelector('.ammonia');
const lastUpdate = document.querySelector('.last-update');

const addNewData = async() =>{
    const results = await getNewData();
    const carbonMonoxideOutput = results[0];
    const fineParticlesEmissionOutput = results[1];
    const ammoniaEmissionOutput = results[2];
    const updatedTime = results[3];
    carbonMonoxide.innerHTML = Math.floor(carbonMonoxideOutput);
    fineParticles.innerHTML = fineParticlesEmissionOutput;
    ammonia.innerHTML = ammoniaEmissionOutput;
    lastUpdate.innerHTML = updatedTime;
}

const getNewData = async() =>{
    try{
        const response = await axios.get('https://api.openweathermap.org/data/2.5/air_pollution?lat=42&lon=-71&appid=53ead80b03f18d24c2addcee35ad45ae');
        const carbonMonoxideEmission = response.data.list[0].components.co;
        const fineParticlesEmission = response.data.list[0].components.pm2_5;
        const ammoniaEmission = response.data.list[0].components.nh3;
        const timeOfUpdate = response.data.list[0].dt;
        const dateInMilliseconds = (1000 * timeOfUpdate);
        const dateObject = new Date(dateInMilliseconds);
        const localTimeHour = dateObject.toLocaleString("en-US", {hour: "numeric"});
        const localTimeDay = dateObject.toLocaleString("en-US", {weekday: "long"});
        const dateOfUpdate = `Last updated on ${localTimeDay} at ${localTimeHour}`;
        console.log(carbonMonoxideEmission, fineParticlesEmission, ammoniaEmission, dateOfUpdate);
        return [carbonMonoxideEmission, fineParticlesEmission, ammoniaEmission, dateOfUpdate];
    }catch(e){
        return "Updating..."
    }
}

setTimeout(addNewData, 'onload');
setInterval(addNewData, 600000);


//GSAP ANIMATIONS--------------------------------------------------------------------

//HEADER GLOW
var titleTl = gsap.timeline();
titleTl.to("#header-title", {className: "+=blueGlow", delay: 0, opacity: 1, fontSize: "2em", letterSpacing: "10px", duration: 0.7});
titleTl.to("#header-title", {delay: 0, fontSize: "2em", letterSpacing: "1px", duration: 0.3});

//LANDING IMAGE ANIMATION
gsap.from(".download-app-message", {x: -300, duration: 0.5});
gsap.from(".button-download-app", {y: -200, duration: 0.5});




