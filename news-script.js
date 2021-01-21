const slideContainer = document.querySelector('.news-container');
const slide = document.querySelector('.slides');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const interval = 5000;


var slides = document.querySelectorAll('.slide');
let index = 1;
let slideId; 

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slide.append(firstClone);
slide.prepend(lastClone);

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
    console.log(slideWidth);
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
  slide.style.transition = '1s';
};

const moveToPrevSlide = ()=> {
  if(index <= 0) return;
  index--;
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  slide.style.transition = '1s';
};

// slideContainer.addEventListener('mouseenter', ()=>{
//   clearInterval(slideId)
// });

// slideContainer.addEventListener('mouseleave', startSlide);

nextBtn.addEventListener('click', moveToNextSlide);
prevBtn.addEventListener('click', moveToPrevSlide);
setTimeout(startSlide, 4000);