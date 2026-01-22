import {
  playIntoMusic,
  fadeWelcomeScreen,
  loadStrangerThingsAnimation,
  loadMainPage,
} from "./animation.js";

window.scrollTo(0, 0);
gsap.set("nav,main", {
  display: "none",
});
gsap.to("#demogorgon", {
  opacity: 1,
  duration: 3,
  ease: "power1.in",
});

let VisitHome = document.querySelector("#visitHome");
let goThroughAnimation = document.querySelector("#goThrough");
VisitHome.addEventListener("click",()=>{
fadeWelcomeScreen();
loadMainPage()
} );
goThroughAnimation.addEventListener(
  "click",
 ()=>{
     playIntoMusic();
     fadeWelcomeScreen();
     loadStrangerThingsAnimation();
     loadMainPage()
 }
);
