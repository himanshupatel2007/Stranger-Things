import {loadTrialers}from "./home.js"

export function playIntoMusic() {
    let introAudio = document.querySelector("audio");

    function fadeOutIntoAudio() {
        gsap.to(introAudio, {
            volume: 0,
            duration: 5,
            delay: 8,
            ease: "power1.in",
            onComplete: () => {
                introAudio.pause();
                console.log("Intro Audio stopped");
            },
        });
    }

    introAudio.play(),
        console.log("audio atarted"),
        fadeOutIntoAudio()
}

export function fadeWelcomeScreen() {
    gsap.to("#welcome", {
        opacity: 0,
        duration: 3.5,
   ease: "power1.inOut",
        onComplete: () => {
            gsap.set("#welcome", {
                display: "none",
            })
        }
    })
}

export function loadStrangerThingsAnimation() {
     gsap.set(".loadingScreen", {display: "flex"})
    const tl = gsap.timeline();

    tl.fromTo(
        "#stranger span",
        {
            opacity: 0,
            y: -250,
        },
        {
            delay: 1.5,
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 2.5,
            stagger: 0.5,
        },
    );
    tl.fromTo(
        "#things span",
        {
            opacity: 0,
            y: 250,
        },
        {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 2.5,
            stagger: -0.5,
        },
        "<",
    );

    tl.to(
        ".bar",
        {
            width: "50%",
            duration: 2,
            ease: "power4.inOut",
        },
        "-=1",
    );

    tl.to(
        ".bottom-bar",
        {
            width: "5%",
            duration: 2,
            ease: "power4.inOut",
            border: "3px solid #ac1911",
        },
        "<",
    );

    tl.to(".letter", {
        opacity: 0.8,
        duration: 0.1,
        scale: 0.98,
        textShadow: "0 0 15px #ff0000, 0 0 30px #8b0000",
        repeat: 5,
        yoyo: true,
        ease: "rough",
    });

    tl.to(
        ".background",
        {
            opacity: 1,
            duration: 4.5,
            ease: "power4.out",
        },
    );

    tl.to(
        ".loadingScreen,.letter,.bar",
        {
            opacity: 0,
            duration: 3,
            ease: "power2.in",
            onComplete: () => {
                gsap.set(".loadingScreen", { display: "none" });
            },
        },
        "<",
    );
}

export function loadMainPage() {
    const tl = gsap.timeline()
    tl.to(
        ".background",
        {
            opacity: 1,
            duration: 2.5,
            ease: "power4.out",
        }
    );
    gsap.set("main",{
        display:"block"
    })
    gsap.set("nav",{
        display:"flex"
    })
    tl.fromTo(
        "nav",
        {
            y: -250,
            opacity: 0,
        },
        {delay:1,
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
        },"-=2"
    );
    tl.fromTo(
        "main",
        { y:50,
            opacity: 0,
        },
        {
            y:0,
            opacity: 1,
            duration: 2.5,
            ease: "power2.out",
        },
        "<", 
    );
       loadTrialers();
}

export function disableStrangerThingsAnimation(){
    gsap.set(".loadingScreen",{
        display:"none"
    })
}