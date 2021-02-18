gsap.registerPlugin(ScrollTrigger);

//BURGER MENU AND OVERLAY------------------------------------------------------
const menuIcon = document.querySelector('.burger-menu');
const navbar = document.querySelector('.navbar');
const bodyHide = document.body;
const sectionsHide = document.body.querySelectorAll('.section');

menuIcon.addEventListener('click', ()=>{
    for (let i=0; i<sectionsHide.length; i++){
      sectionsHide[i].classList.toggle('sections-hidden');
    }
    navbar.classList.toggle('overlay-change');
    bodyHide.classList.toggle('body-scroll-hide');
})


// SCROLLING CONTROL---------------------------------------------------------------
function scrollingControl(){
//FINDS THE PERCENTAGE OF SCROLLING THROUGH THE PAGE
const header = document.querySelector(".full-header");
const lines = document.querySelectorAll(".scroll-line");
const scrollText = document.querySelector(".scroll-line-text")
const nextSectionButton = document.querySelector('.next-section-arrow');
const firstSection = document.querySelector('.landing');
const secondSection = document.querySelector('.full-second-section');
const thirdSection = document.querySelector('.impact');
const fourthSection = document.querySelector('.full-fourth-section');
const fifthSection = document.querySelector('.subscribe-container');
const progress = Math.ceil(((window.scrollY)/(document.body.scrollHeight - window.innerHeight)*100));
let currentSection = '';

switch(true){
  case (progress<22):
    scrollText.textContent = 'Home';
    // CHANGES THE BACKGROUND COLOR OF THE HEADER WHILE AT THE FIRST SECTION
    gsap.to(header,{background: 'none', duration: 1.5});
    currentSection = 'Home';
    nextSectionButton.onclick = ()=>{secondSection.scrollIntoView()};
    break;
  case (progress>12 && progress<50):
    scrollText.textContent = 'The Technology';
    // APPLIES BACKGROUND COLOR TO THE HEADER WHEN LEAVING THE FIRST SECTION
    gsap.to(header,{backgroundColor: "rgba(0,0,0,0.9)", duration: 0.7});
    currentSection = 'The Technology';
    nextSectionButton.onclick = ()=>{thirdSection.scrollIntoView()};
    break;
  case (progress>49 && progress<80):
    scrollText.textContent = 'Impact';
    gsap.to(header,{backgroundColor: "rgba(0,0,0,0.9)", duration: 0.7});
    currentSection = 'Impact';
    nextSectionButton.onclick = ()=>{fourthSection.scrollIntoView()};
    break;
  case (progress>79 && progress<99):
    scrollText.textContent = 'Opportunities';
    gsap.to(header,{backgroundColor: "rgba(0,0,0,0.9)", duration: 0.7});
    currentSection = 'Opportunities';
    nextSectionButton.onclick = ()=>{fifthSection.scrollIntoView()};
    break;
  case (progress>99):
    scrollText.textContent = 'Subscribe';
    gsap.to(header,{backgroundColor: "rgba(0,0,0,0.9)", duration: 0.7});
    currentSection = 'Subscribe';
    nextSectionButton.onclick = ()=>{firstSection.scrollIntoView()};
    break;
  default:
    console.log("Where was I?");
    break;
}

// SHOWS THE NAME OF THE TARGET SECTION WHEN HOVERING
lines.forEach(line=>{
    line.addEventListener('mouseenter', ()=>{
        const sections = {
            scrollLine1: "Home",
            scrollLine2: "The Technology",
            scrollLine3: "Impact",
            scrollLine4: "Opportunities",
            scrollLine5: "Subscribe"
        }
    scrollText.textContent = `${sections[line.id]}`;
})});
// RETURNS THE NAME OF THE SECTION WHEN HOVERING ENDS
lines.forEach(line=>{
  line.addEventListener('mouseleave', ()=>{
    scrollText.textContent = currentSection;
})});
};
// EVENT LISTENERS WHEN THE PAGE LOADS AND EVERYTIME A SCROLL HAPPEN
window.addEventListener('scroll', scrollingControl);
window.addEventListener('load', scrollingControl);


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

// DETECTS RESIZING AND CHANGES THE SIZE OF THE SLIDERS ACCORDINGLY
window.addEventListener("resize", function(event) {
  var newWidth = slide.clientWidth;
  slideWidth = newWidth;
  setTimeout(()=>{moveToNextSlide()}, 500);
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

//HAMMER MODULE FOR SWIPING ON MOBILE DEVICES
//IT TARGETS NEWS AND LISTENS FOR SWIPING 
const swipeElement = document.querySelector('.news');
const swipeAction = new Hammer(swipeElement);
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

const speed = 15;
const speedFloat = 60;

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


//ARROW ANIMATION
const arrow = document.querySelector(".arrow");
// STARTS THE ARROW ANIMATION
function arrowAnimation(){
  arrow.classList.add("arrow");

  gsap.to(".arrow", {y: 50, duration: 1.5, opacity: 1, repeat: -1});
}
arrowAnimation();
// STOPS THE ARROW ANIMATION WHEN SCROLL IS DETECTED
function stopArrow(){
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


// //GSAP SCROLLING ANIMATIONS
function scrollingAnimations(){
const screenWidth = document.body.clientWidth;
if(screenWidth < 1025){
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

gsap.from(".impact",{
  scrollTrigger: {
    trigger: ".impact",
    start: "top center",
    toggleActions:"play none none none"
  },
  opacity: 0,
  x: screenWidth,
  duration: 1
});

ScrollTrigger.create({
    trigger: ".impact",
    start: "top center",
    onEnter: addNewData
  });

gsap.from(".news",{
  scrollTrigger: {
    trigger: ".news",
    start: "top center",
    toggleActions:"play none none none"
  },
  opacity: 0,
  x: -screenWidth,
  duration: 1
});

ScrollTrigger.create({
  trigger: ".news",
  start: "top center",
  onEnter: startSlide
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
}else{
  gsap.from(".full-scrolling-lines",{opacity: 0, duration: 3});
  gsap.from([".landing-text", ".button-full-landing-container"], {opacity: 0, y:40, duration: 1});
  gsap.to([".how-started", ".how-works",".innovations",".prototypes", ".work-with-us"], {opacity: 0, y:40, backgroundSize: "150%"});
  gsap.to(".full-news-container", {opacity: 0, y:40, fontSize:"150%"});

  ScrollTrigger.create({
    trigger: ".full-second-section",
    start: "top center",
    onEnter: secondSectionAnimations =>{
      const fullSizeTimeline = gsap.timeline();
      fullSizeTimeline
      .to(".how-started",{opacity: 1, y:-40, backgroundSize:"80%", duration: 0.5})
      .to(".how-works",{opacity: 1, y:-40, backgroundSize:"100%", duration: 0.5})
      .to(".innovations",{opacity: 1, y:-40, backgroundSize:"100%", duration: 0.5})
    }
  });
  ScrollTrigger.create({
    trigger: ".impact",
    start: "top center",
    onEnter: addNewData
  });
  ScrollTrigger.create({
    trigger: ".full-fourth-section",
    start: "top center",
    onEnter: secondSectionAnimations =>{
      const fullSizeTimeline = gsap.timeline();
      fullSizeTimeline
      .to(".full-news-container",{opacity: 1, y:-40, fontSize:"100%", duration: 0.5})
      .to(".prototypes",{opacity: 1, y:-40, backgroundSize:"100%", duration: 0.5})
      .to(".work-with-us",{opacity: 1, y:-40, backgroundSize:"100%", duration: 0.5})
    }
  });
}
}

// LOADS THE ANIMATIONS ON LOAD
window.addEventListener('load', scrollingAnimations);

//REFRESH THE PAGE TO SWITCH BETWEEN SMALL AND BIG ANIMATIONS
window.addEventListener('resize', ()=>{
  if(document.body.clientWidth < 1025){
    document.body.classList.add('small-animations');
    if (document.body.classList.contains('big-animations')){
        document.body.classList.remove('big-animations');
        document.body.classList.add('small-animations');
        window.location.reload();
    }}
    else{
      if(document.body.clientWidth > 1025){
        document.body.classList.add('big-animations');
        if (document.body.classList.contains('small-animations')){
          document.body.classList.remove('small-animations');
          document.body.classList.add('big-animations');
          window.location.reload();
        }
      }
    }
  });


// //FINDS THE PERCENTAGE OF SCROLLING THROUGH THE PAGE
// window.onscroll = function getScroll(){
//   let percentage = Math.ceil(((window.scrollY)/(document.body.scrollHeight - window.innerHeight)*100));
//   console.log(percentage)
// }