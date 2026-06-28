const header = document.getElementById("header");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const backToTop = document.querySelector(".back-to-top");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");
const loader = document.querySelector(".loader");
const galleryScrollLine = document.querySelector(".gallery-scroll-line");
const gallerySection = document.querySelector("#gallery");

const handleScroll = () => {

    if(header){

        if(window.scrollY > 80){
            header.classList.add("scrolled");
        }else{
            header.classList.remove("scrolled");
        }

    }

    if(backToTop){

        if(window.scrollY > 500){
            backToTop.classList.add("show");
        }else{
            backToTop.classList.remove("show");
        }

    }

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 160;

        if(window.scrollY >= sectionTop){
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active");
        }

    });

    animateGalleryLine();

};

const setupGalleryLine = () => {

    if(galleryScrollLine){

        const lineLength = galleryScrollLine.getTotalLength();

        galleryScrollLine.style.strokeDasharray = lineLength;
        galleryScrollLine.style.strokeDashoffset = lineLength;

    }

};

const animateGalleryLine = () => {

    if(galleryScrollLine && gallerySection){

        const lineLength = galleryScrollLine.getTotalLength();
        const galleryTop = gallerySection.offsetTop;
        const galleryHeight = gallerySection.offsetHeight;
        const scrollPosition = window.scrollY + window.innerHeight;
        const progress = (scrollPosition - galleryTop) / galleryHeight;
        const limitedProgress = Math.max(0, Math.min(progress, 1));

        galleryScrollLine.style.strokeDashoffset = lineLength - limitedProgress * lineLength;

        const moveAmount = limitedProgress * 120;
        galleryScrollLine.style.transform = `translateY(${moveAmount}px)`;

    }

};

window.addEventListener("scroll", handleScroll);

window.addEventListener("load", () => {
    setupGalleryLine();
    handleScroll();
});

const revealElements = document.querySelectorAll(
    ".section-heading, .about-story-container, .menu-card, .outdoor-content, .outdoor-visual, .gallery-item, .review-card, .review-form-wrapper, .contact-content, .booking-box, .contact-map, footer"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const revealOnScroll = () => {

    revealElements.forEach(element => {

        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 120;

        if(elementTop < windowHeight - revealPoint){
            element.classList.add("active");
        }

    });

};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

if(hamburger && navMenu){

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

}

if(loader){

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("hide");
        }, 900);
    });

}