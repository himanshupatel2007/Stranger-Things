const tl = gsap.timeline();


tl.fromTo(".letter",
    {
        opacity: 0,
        scale: 5,
        x: () => (Math.random() - 0.5) * 4000,
        y: () => (Math.random() - 0.5) * 4000,
        rotation: () => (Math.random() - 0.5) * 90
    },
    {delay:2,
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 10,
        ease: "power4.out",
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
}, "-=2");


tl.to(".glow", {
    opacity: 0.8,
    duration: 0.1,
    repeat: 5,
    yoyo: true,
    ease: "rough"
});

tl.to(".loadingScreen",{
    opacity:0,
    duration:4
})