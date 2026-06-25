/*====================================== typing animation =================================*/
var typed = new Typed(".typing",{
    strings:["","Front End","Back End","Social Person","Graphic Designer","web Designer"],
    typeSpeed:100,
    backSpeed:60,
    loop:true
});

/*====================================== Aside =================================*/
const navTogglerBtn = document.querySelector(".nav-toggler"),
      aside = document.querySelector(".aside"),
      navLinks = document.querySelectorAll(".nav li a");

navTogglerBtn.addEventListener("click", () => {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
});

// Close aside when a link is clicked on mobile
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth < 1200) {
            aside.classList.remove("open");
            navTogglerBtn.classList.remove("open");
        }
    });
});

/*====================================== Scroll-Spy =================================*/
const sections = document.querySelectorAll("section");

const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach(link => {
                link.classList.remove("active");
                if(link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});