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
titleTl.to("#header-title", {className: "+=blueGlow", delay: 0, opacity: 1, fontSize: "2em", letterSpacing: "10px", duration: 0.7});
titleTl.to("#header-title", {delay: 0, fontSize: "2em", letterSpacing: "1px", duration: 0.3});


// PROTOTYPES GALLERY
const mainImage = document.querySelector('.main-image');
const images = document.querySelectorAll('.single-image');

// RECEIVES THE IMAGE TO DISPLAY, SLICES THE INDEX AND PASSES IT TO THE
// SLIDE FUNCTION FOR ANIMATION
function displayBigImage(image){
    var imageSource = image.path[0].src;
    if(imageSource.charAt(imageSource.length -6) === "/"){
        var imageIndex = (imageSource.slice(-5,-4)-1);
    }else{
        var imageIndex = (imageSource.slice(-6,-4)-1);
    }
    mainImage.src = imageSource;
    slide(imageIndex);    
};

// RECEIVES THE IMAGEINDEX FROM THE DISPLAYBIGNAME FUNCTION, CREATES A CUSTOMIZED ANIMATION
// DEPENDING OF THE LOCATION OF THE SELECTED IMAGE
function slide(imageIndex){
    const startingPoint = images[imageIndex].offsetLeft - (mainImage.offsetLeft*2+100);
    gsap.to(images[imageIndex],{duration: 0.4, scale: 1.2, opacity: 0, repeat: 1, yoyo: true});
    gsap.from(mainImage, {duration: 0.4, x:startingPoint, y: 200, scale:0.1});
}

// AN EVENT LISTENER THAT LISTENS TO AN ARRAY OF IMAGES
document.querySelectorAll('.single-image').forEach(image=>{
    image.addEventListener('click', displayBigImage);
});


// SNACKBAR/TOAST
const button = document.querySelector('#button-subscribe');
const snackbar = document.querySelector('#snackbar');

function showSnackbar() {
    snackbar.className = "show";
    setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}

button.addEventListener('click', showSnackbar);
