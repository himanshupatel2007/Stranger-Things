gsap.set("nav,main",{
    display:"none"
})
gsap.set("body", { overflow: "hidden" });
const tl = gsap.timeline();

tl.fromTo(".letter",
    { force3D: true,
        opacity: 0,
        scale: 5,
        x: () => (Math.random() - 0.5) * 4000,
        y: () => (Math.random() - 0.5) * 4000,
        rotation: () => (Math.random() - 0.5) * 90
    },
    { 
        color: "rgba(255, 13, 0, 0.45)",
        webkitTextStroke: "3px #ac1911",
       
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 10,
       ease: "power2.out",
        stagger: {
            amount: 1.5,
            from: "random"
        }
    }
);

tl.to(".bar", {
    width: '60%',
    duration: 2,
    ease: "power4.inOut"
}, "-=1");

tl.to(".bottom-bar", {
    width: '10%',
    duration: 2,
    ease: "power4.inOut"
}, "<");

tl.to(".letter", {
    opacity: 0.8,
    duration: 0.1,
    scale: 0.98,
     textShadow: "0 0 15px #ff0000, 0 0 30px #8b0000",
    repeat: 5,
    yoyo: true,
    ease: "rough"
});

tl.to(".background", {
    opacity: 1,
    duration: 8,
    ease: "power4.out",
}, "<")

tl.to(".loadingScreen,.letter,.bar", {
opacity:0,
    duration: 3,
    ease: "power2.inOut",
    onComplete: () => {
       gsap.set(".loadingScreen", { display: "none" });
        gsap.set("body", { overflow: "auto" });
    }
},"<")
tl.to("main", {
    display: "block", 
    opacity: 1,
    ease: "power2.out",
     onComplete: () => {
       gsap.set("nav", { display: "flex" });}
}, "-=2");