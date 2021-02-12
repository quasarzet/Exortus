//BURGER MENU AND OVERLAY------------------------------------------------------
const menuIcon = document.querySelector('.burger-menu');
const navbar = document.querySelector('.navbar');
const bodyHide = document.body;

menuIcon.addEventListener('click', ()=>{
    navbar.classList.toggle('overlay-change');
    bodyHide.classList.toggle('body-scroll-hide');
})


//HEADER GLOW
var titleTl = gsap.timeline();
titleTl.to("#header-title", {className: "+=blueGlow", delay: 0, opacity: 1, fontSize: "2.5em", letterSpacing: "10px", duration: 0.7});
titleTl.to("#header-title", {delay: 0, fontSize: "2.5em", letterSpacing: "1px", duration: 0.3});


// INNOVATIONS ANIMATIONS
const squares = document.querySelectorAll('.square');
const allText = document.querySelectorAll('.innovations-text');
const allImages = document.querySelectorAll('.innovation-logo');
const allSquaresContainer = document.querySelector('.innovations-main-container');
const allArrowsContainer = document.querySelector('.all-arrows-container');
const innovationsTimeline1 = gsap.timeline();


// LISTENS FOR HOVERING ON EACH SQUARE. ITERATES OVER THE ARRAYS OF TEXT AND IMAGES, 
// SLICES THE INDEX NUMBER FROM THE CLASS NAME AND USES IT TO SELECT THE TEXT AND IMAGE
// FROM THE ARRAYS. THEN APPLIES THE ANIMATION
squares.forEach(item=> {
    item.addEventListener('mouseenter', ()=>{
        const arrayIndex = `${item.className.slice(-2)-1}`;
        innovationsTimeline1.to(allImages[arrayIndex], {duration: 0.01, display:"none"});
        innovationsTimeline1.to(allText[arrayIndex], {duration: 0.01, display:"inherit"});
        gsap.to(item, {duration: 0.5, width: "200%"});
})})

//LISTENS FOR MOUSE LEAVE, SLICES THE INDEX AND USES IT SELECT TEXT AND IMAGES FROM THE ARRAYS
squares.forEach(item=> {
    item.addEventListener('mouseleave', ()=>{
        const arrayIndex = `${item.className.slice(-2)-1}`;
        innovationsTimeline1.to(allText[arrayIndex], {duration: 0.01, display:"none"});
        innovationsTimeline1.to(allImages[arrayIndex], {delay: 0.1, duration: 0.1, display:"inherit"}); 
        gsap.to(item, {duration: 0.5, width: "100%"});
})})


//ALL THE ARROW ANIMATIONS
function allAnimations(){
const squares = document.querySelectorAll('.square');
const allText = document.querySelectorAll('.innovations-text');
const allImages = document.querySelectorAll('.innovation-logo');
const allSquaresContainer = document.querySelector('.innovations-main-container');
const allArrowsContainer = document.querySelector('.all-arrows-container');
const innovationTimeline = gsap.timeline();
const screenSize = window.innerWidth;
const carsvg = document.querySelector(".car-svg");
const guidesvg = document.querySelector(".guides-svg");
const arrow1 = document.querySelector(".arrow-info1");
const arrow2 = document.querySelector(".arrow-info2");
const arrow3 = document.querySelector(".arrow-info3");
const arrow4 = document.querySelector(".arrow-info4");
const arrow5 = document.querySelector(".arrow-info5");
const horizontalArrow1 = document.querySelector(".arrow-horizontal1");
const horizontalArrow2 = document.querySelector(".arrow-horizontal2");
const horizontalArrow3 = document.querySelector(".arrow-horizontal3");
const horizontalArrow4 = document.querySelector(".arrow-horizontal4");
const horizontalArrow5 = document.querySelector(".arrow-horizontal5");

//MOBIL ANIMATION
if(screenSize<1025){
innovationTimeline
.from(carsvg,{delay: 1, y:80, opacity:0, duration: 1})
.from(guidesvg,{opacity:0, scaleY: 0, y: -50, duration: 1})
.from(arrow1,{opacity:0, duration: 0.3})
.from(arrow2,{opacity:0, duration: 0.3})
.from(arrow3,{opacity:0, duration: 0.3})
.from(arrow4,{opacity:0, duration: 0.3})
.from(arrow5,{opacity:0, duration: 0.3})
.to([arrow1, arrow2, arrow3, arrow4, arrow5],{duration: 0.7, scale: 1.15, opacity: 1.5})
.to([arrow1, arrow2, arrow3, arrow4, arrow5],{duration: 0.7, scale: 1})
.to(guidesvg,{opacity: 0, duration: 2})
.to(arrow5,{x:screenSize, duration: 0.3}, "-=2")
.to(arrow4,{x:screenSize, duration: 0.3}, "-=1.7")
.to(arrow3,{x:screenSize, duration: 0.3}, "-=1.4")
.to(arrow2,{x:screenSize, duration: 0.3}, "-=1.1")
.to(arrow1,{x:screenSize, duration: 0.3}, "-=0.8")
.to([guidesvg, arrow1, arrow2, arrow3, arrow4, arrow5],{display: "none", duration: 0.1})
.from(horizontalArrow1,{opacity: 0, x:-screenSize, duration: 0.5}, "-=0.1")
.from(horizontalArrow2,{opacity: 0, x:-screenSize, duration: 0.5})
.from(horizontalArrow3,{opacity: 0, x:-screenSize, duration: 0.5})
.from(horizontalArrow4,{opacity: 0, x:-screenSize, duration: 0.5})
.from(horizontalArrow5,{opacity: 0, x:-screenSize, duration: 0.5});

// CHECKS FOR CLICKS ON THE ARROWS TO TOGGLE THE PANELS
// PLACED IN HERE SO THE ARROWS WON'T HAVE INTERACTIVITY IN THE DESKTOP VERSION
const horizontalArrow = document.querySelectorAll(".arrow-horizontal");
const panel = document.querySelectorAll('.panel');

for (let i=0; i<horizontalArrow.length; i++) {
    horizontalArrow[i].onclick = function() {
    	let setClasses = !this.classList.contains('active');
        setClass(horizontalArrow, 'active', 'remove');
        setClass(panel, 'show', 'remove');
        gsap.from(".panel", {y:"-1vh", opacity: 0, duration: 0.3});
       	if (setClasses) {
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("show");
        }
        document.body.scrollTop = this.offsetTop;
    }
}
function setClass(elements, className, fnName) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList[fnName](className);
    }
}
}
// DESKTOP ANIMATION
else{
    innovationTimeline
.to([allSquaresContainer, squares],{display:"none", opacity: 0})
.from(horizontalArrow1,{opacity: 0, x:-screenSize, duration: 0.5}, "-=0.1")
.from(horizontalArrow2,{opacity: 0, x:-screenSize, duration: 0.5})
.from(horizontalArrow3,{opacity: 0, x:-screenSize, duration: 0.5})
.from(horizontalArrow4,{opacity: 0, x:-screenSize, duration: 0.5})
.from(horizontalArrow5,{opacity: 0, x:-screenSize, duration: 0.5})
.to(horizontalArrow1, {opacity: 0, x:screenSize, duration: 0.3},"+=1.5")
.to(horizontalArrow2, {opacity: 0, x:screenSize, duration: 0.3})
.to(horizontalArrow3, {opacity: 0, x:screenSize, duration: 0.3})
.to(horizontalArrow4, {opacity: 0, x:screenSize, duration: 0.3})
.to(horizontalArrow5, {opacity: 0, x:screenSize, duration: 0.3})
.to([horizontalArrow1, horizontalArrow2, horizontalArrow3, horizontalArrow4, horizontalArrow5, allArrowsContainer],{display: "none"})
.to([allSquaresContainer, squares],{display:"inherit", opacity:1, duration: 1})
}
}

function onResizing(){
    const horizontalArrow1 = document.querySelector(".arrow-horizontal1");
    const horizontalArrow2 = document.querySelector(".arrow-horizontal2");
    const horizontalArrow3 = document.querySelector(".arrow-horizontal3");
    const horizontalArrow4 = document.querySelector(".arrow-horizontal4");
    const horizontalArrow5 = document.querySelector(".arrow-horizontal5");
    const squares = document.querySelectorAll('.square');
    const allText = document.querySelectorAll('.innovations-text');
    const allImages = document.querySelectorAll('.innovation-logo');
    const allSquaresContainer = document.querySelector('.innovations-main-container');
    const allArrowsContainer = document.querySelector('.all-arrows-container');
    if (window.innerWidth<1025){
        gsap.to(allSquaresContainer,{display:"none"});
        gsap.to(allImages,{display:"none"});
        gsap.to(squares,{display:"none"});
        console.log("happened");
        gsap.to([allArrowsContainer, horizontalArrow1, horizontalArrow2, horizontalArrow3, horizontalArrow4, horizontalArrow5],{display: "block"});
    }else{
        gsap.to(allSquaresContainer,{display:"inherit"});
        gsap.to(allImages,{display:"inherit"});
        gsap.to(squares,{display:"inherit"});
        gsap.to(allImages,{display:"none"});
        gsap.to(allArrowsContainer,{display:"none"});
    }
}

window.addEventListener('load', allAnimations);
window.addEventListener('resize', onResizing);






// SNACKBAR/TOAST
const button = document.querySelector('#button-subscribe');
const snackbar = document.querySelector('#snackbar');

function showSnackbar() {
    snackbar.className = "show";
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}

button.addEventListener('click', showSnackbar);

