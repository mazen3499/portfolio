/* ================================ toggle style switcher ================================= */
const styleswitchertoggle = document.querySelector(".style-switcher-toggler")
styleswitchertoggle.addEventListener("click",()=>{
    document.querySelector(".style-switcher").classList.toggle("open");
})
// hide style switcher on scroll
window.addEventListener("scroll",()=> {
    if(document.querySelector(".style-switcher").classList.contains("open"))
    {
        document.querySelector(".style-switcher").classList.remove("open");
    }
})    
/* ================================ them colors ================================= */
const alternatesstyle = document.querySelectorAll(".alternate-style");
function setActiveStyle(color)
{
    alternatesstyle.forEach((style) => {
        if(color === style.getAttribute("title"))
        {
            style.removeAttribute("disabled");
        }    
        else
        {
            style.setAttribute("disabled","true");
        }       
    })
}      
/* ================================ theme light and dark ================================= */  
const daynight =document.querySelector(".day-night");
daynight.addEventListener("click",()=> {
     daynight.querySelector("i").classList.toggle("fa-sun")
      daynight.querySelector("i").classList.toggle("fa-moon")
    document.body.classList.toggle("dark")  
})    
window.addEventListener("load",() => {
    if(document.body.classList.contains("dark"))
    {
        daynight.querySelector("i").classList.add("fa-sun")
    }    
    else
    {
        daynight.querySelector("i").classList.add("fa-moon")
    }    
})    