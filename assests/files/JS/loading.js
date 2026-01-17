const tl = gsap.timeline();


tl.fromTo(".letter",
    {
        
        opacity: 0,
        scale: 5,
        x: () => (Math.random() - 0.5) * 4000,
        y: () => (Math.random() - 0.5) * 4000,
        rotation: () => (Math.random() - 0.5) * 90
    },
    {
        color: "#e31212",
        webkitTextStroke: "3px #ac1911",
        textShadow: "0 0 15px #ff0000, 0 0 30px #8b0000",
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 10,
        ease: "expoScale(0.5,7,none)",
        stagger: {
            amount: 1.5,
            from: "random"
        }
    }
);


tl.to(".bar", {
    width: '50%',
    duration: 2,
    ease: "power4.inOut"
}, "-=1");


tl.to(".letter", {
    opacity: 0.8,
    duration: 0.1,
    scale:0.98,
    
    repeat: 5,
    yoyo: true,
    ease: "rough"
});

tl.to(".letter, .bar",{
    opacity:0,
    duration:4,
    ease:"power2.inOut",
    onComplete : ()=>{
        gsap.set(".letter, .bar,.loadingScreen",{
            display:"none",
        })
    }
})

tl.to(".finalBackground",{
    opacity:1,
    duration :8,
    ease:"power4.out",

},"<")
