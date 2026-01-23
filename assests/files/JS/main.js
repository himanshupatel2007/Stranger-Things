import {
    playIntoMusic,
    fadeWelcomeScreen,
    loadStrangerThingsAnimation,
    loadMainPage,
    disableStrangerThingsAnimation
} from "./animation.js";

import { playVideo, mutevideo, redirectYoutube, watchNow } from "./home.js"

if('scrollRestoration' in history){
    history.scrollRestoration = 'manual'
}

window.addEventListener("load",()=>{
    window.scrollTo(0, 0);
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

document.querySelector("#playBtn").addEventListener("click", () => playVideo())
document.querySelector("#muteBtn").addEventListener("click", () => mutevideo())

document.querySelectorAll(".watchNetflix").forEach(e => { e.addEventListener("click", () => { watchNow() }) })

document.querySelector(".trailerContainer").addEventListener("click", e => redirectYoutube(e))