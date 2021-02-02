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
const slideContainer = document.querySelector('.news');
var slide = document.querySelector('.slides');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const interval = 8000;

var slides = document.querySelectorAll('.slide');
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
// setTimeout(startSlide, 4000);

//HAMMER MODULE FOR SWIPING
//IT TARGETS NEWS AND LISTENS FOR SWIPING 
var swipeElement = document.querySelector('.news');
var swipeAction = new Hammer(swipeElement);
swipeAction.on("swipeleft", moveToNextSlide);
swipeAction.on("swiperight", moveToPrevSlide);


//IMPACT SECTION --------------------------------------------------//
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
        const dateInMilliseconds = (1000 * timeOfUpdate);
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


//GSAP ANIMATIONS--------------------------------------------------------------------

//HEADER GLOW
var titleTl = gsap.timeline();
titleTl.to("#header-title", {className: "+=blueGlow", delay: 0, opacity: 1, fontSize: "2em", letterSpacing: "10px", duration: 0.7});
titleTl.to("#header-title", {delay: 0, fontSize: "2em", letterSpacing: "1px", duration: 0.3});


//LANDING IMAGE ANIMATION
gsap.from(".landing-text", {x: -300, duration: 0.5});
gsap.from(".button-landing", {y: -200, duration: 0.5});


//ARROW ANIMATION
var arrow = document.querySelector(".arrow");
// STARTS THE ARROW ANIMATION
function arrowAnimation(){
  arrow.classList.add("arrow");
  gsap.to(".arrow", {y: 90, duration: 1.5, opacity: 1, repeat: -1});
}
arrowAnimation();
// STOPS THE ARROW ANIMATION WHEN SCROLL IS DETECTED
function stopArrow(){
  // arrow.visibility.visible = false;
  arrow.classList.remove("arrow");
  arrow.classList.add("arrow-invisible");
}
document.addEventListener('scroll', stopArrow);


// SNACKBAR/TOAST
const button = document.querySelector('#button-subscribe');
const snackbar = document.querySelector('#snackbar');

function showSnackbar() {
    snackbar.className = "show";
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}

button.addEventListener('click', showSnackbar);


//GSAP SCROLL ANIMATIONS
gsap.registerPlugin(ScrollTrigger);
var screenWidth = document.body.clientWidth;

gsap.from(".how-started",{
  scrollTrigger: {
    trigger: ".how-started",
    start:"top center",
    toggleActions:"play none none none",
  },
  opacity: 0,
  x: -screenWidth,
  duration: 1,
});

gsap.from(".how-works",{
  scrollTrigger: {
    trigger: ".how-works",
    start:"top center",
    toggleActions:"play none none none",
  },
  opacity: 0,
  x: screenWidth,
  duration: 1,
});

gsap.from(".innovations",{
  scrollTrigger: {
    trigger: ".innovations",
    start:"top center",
    toggleActions:"play none none none",
  },
  opacity: 0,
  x: -screenWidth,
  duration: 1,
});

gsap.from(".news",{
  scrollTrigger: {
    trigger: ".news",
    start: "top center",
    toggleActions:"play none none none"
  },
  opacity: 0,
  x: screenWidth,
  duration: 1
});

ScrollTrigger.create({
  trigger: ".news",
  start: "top center",
  onEnter: startSlide
});

gsap.from(".impact",{
  scrollTrigger: {
    trigger: ".impact",
    start: "top center",
    toggleActions:"play none none none"
  },
  opacity: 0,
  x: -screenWidth,
  duration: 1
});

ScrollTrigger.create({
    trigger: ".impact",
    start: "top center",
    onEnter: addNewData
  });

gsap.from(".prototypes",{
  scrollTrigger: {
    trigger:".prototypes",
    start:"top center",
    toggleActions:"play none none none"
  },
  opacity: 0,
  x: screenWidth,
  duration: 1
});

gsap.from(".work-with-us",{
  scrollTrigger: {
    trigger:".work-with-us",
    start:"top center",
    toggleActions:"play none none none"
  },
  opacity: 0,
  x: -screenWidth,
  duration: 1
});
