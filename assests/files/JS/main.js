import {
    playIntoMusic,
    fadeWelcomeScreen,
    loadStrangerThingsAnimation,
    loadMainPage,
    disableStrangerThingsAnimation
} from "./animation.js";

import { playVideo, mutevideo, redirectYoutube, watchNow,fadeHome } from "./home.js"
import {loadEpisodes,createRatingsTable,fadeSeasons} from "./seasons.js"

if('scrollRestoration' in history){
    history.scrollRestoration = 'manual'
}

window.addEventListener("load",()=>{
    window.scrollTo(0, 0);
    gsap.set(".loadingScreen,nav,main,.home,.seasons",{
        display:"none"
    })
})

const hasSeenIntro = sessionStorage.getItem("hasSeen");

if (hasSeenIntro) {
        gsap.set("#welcome,.loadingScreen", {
            display: "none"
        })

        loadMainPage()
    }
else {
    gsap.to("#demogorgon", {
        opacity: 1,
        duration: 3,
        ease: "power1.in",
        onStart: () => {
            const video = document.querySelector("#demogorgon");
            if (video) { video.play().catch(error => { console.log("video autoplay blocked") }) }
        }
    });
    sessionStorage.setItem("hasSeen", "true")
}
let VisitHome = document.querySelector("#visitHome");
let goThroughAnimation = document.querySelector("#goThrough");
VisitHome.addEventListener("click", () => {
    fadeWelcomeScreen();
    disableStrangerThingsAnimation();
    loadMainPage()
});
goThroughAnimation.addEventListener(
    "click",
    () => {
        playIntoMusic();
        fadeWelcomeScreen();
        loadStrangerThingsAnimation();
        loadMainPage()

    }
);

const loadHome = document.querySelector("#loadHome")
const loadSeason = document.querySelector("#loadSeasons")

loadHome.addEventListener("click",()=>{
    fadeSeasons()
   gsap.set(".home", { display: "block", opacity: 0 });
    gsap.to(".home", { opacity: 1, duration: 1.5, delay: 0.5 });
    gsap.fromTo(
            ".background",{
                opacity:0
            },
            {onStart:()=>{
                gsap.set(".background",{
                    backgroundImage: 'url("./assests/images/homePage/home.webp")'
                })
            },delay:0.5,
                opacity: 1,
                duration: 2.5,
                ease: "power2.out",
            }
        );
    loadMainPage();
})
loadSeason.addEventListener("click",()=>{
    fadeHome()
   gsap.set(".seasons", { display: "block", opacity: 0 }); 
    gsap.to(".seasons", { opacity: 1, duration: 1.5, delay: 0.5 });
      gsap.fromTo(
            ".background",{
                opacity:0
            },
            {onStart:()=>{
                gsap.set(".background",{
                    backgroundImage: 'url("./assests/images/seasons/seasonsBackground.webp")'
                })
            },delay:0.5,
                opacity: 1,
                duration: 2.5,
                ease: "power2.out",
            }
        );
        createRatingsTable()
        loadEpisodes(0)
    loadMainPage();
})




document.querySelector("#playBtn").addEventListener("click", () => playVideo())
document.querySelector("#muteBtn").addEventListener("click", () => mutevideo())

document.querySelectorAll(".watchNetflix").forEach(e => { e.addEventListener("click", () => { watchNow() }) })

document.querySelector(".trailerContainer").addEventListener("click", e => redirectYoutube(e))
