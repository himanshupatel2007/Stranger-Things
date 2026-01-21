import { loadTrialers } from "./home.js";

window.scrollTo(0, 0);

gsap.set("nav,main", {
    display: "none",
});
gsap.to("#demogorgon", {
    opacity: 1,
    duration: 3,
    ease: "power1.in",
});

let Visitbutton = document.querySelector("#visitHome");
Visitbutton.addEventListener("click", () => {
    gsap.to("#welcome", {
        opacity: 0,
        duration: 2.5,
        onComplete: () => {
            (gsap.set("#welcome", {
                display: "none",
            }),
                gsap.set(".loadingScreen", {
                    display: "flex",
                    onComplete: () => {
                        gsap.set("body", { overflow: "hidden" });
                        const tl = gsap.timeline();

                        tl.fromTo(
                            ".letter",
                            {
                                force3D: true,
                                opacity: 0,
                                scale: 5,
                                x: () => (Math.random() - 0.5) * 4000,
                                y: () => (Math.random() - 0.5) * 4000,
                                rotation: () => (Math.random() - 0.5) * 90,
                            },
                            {
                                onStart: () => {
                                    (introAudio.play(),
                                        console.log("audio atarted"),
                                        fadeOutIntoAudio());
                                },
                                color: "rgba(255, 13, 0, 0.45)",
                                webkitTextStroke: "3px #ac1911",
                                delay: 1.5,
                                opacity: 1,
                                scale: 1,
                                x: 0,
                                y: 0,
                                rotation: 0,
                                duration: 10,
                                ease: "power2.out",
                                stagger: {
                                    amount: 1.5,
                                    from: "random",
                                },
                            },
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

                        tl.to(".letter , .bar,.bottom-bar", {
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
                                duration: 6,
                                ease: "power4.out",
                            },
                            "<",
                        );

                        tl.to(
                            ".loadingScreen,.letter,.bar",
                            {
                                opacity: 0,
                                duration: 3,
                                ease: "power2.inOut",

                                onComplete: () => {
                                    gsap.set(".loadingScreen", { display: "none" });
                                },
                            },
                            "<",
                        );
                        // 2. Animate the Nav sliding from the top (using a position parameter to overlap)
                        tl.fromTo(
                            "nav",
                            {
                                y: -150,
                                opacity: 0,
                                display: "flex", // Set display here so it can animate immediately
                            },
                            {
                                y: 0,
                                opacity: 1,
                                duration: 1.5,
                                ease: "power4.out",
                            },
                            "-=2", // Start this 2 seconds BEFORE the loading screen finish
                        );

                        // 3. Animate Main (overlap this so it feels faster)
                        tl.fromTo(
                            "main",
                            {
                                opacity: 0,
                               
                            },
                            {
                                onComplete: () => {
                                    loadTrialers();
                                },
                                 display: "block",
                                opacity: 1,
                                duration: 2,
                                ease: "power2.out",
                            },
                            "-=1.5", // Overlap with the nav animation
                        );

                        let introAudio = document.querySelector("audio");

                        function fadeOutIntoAudio() {
                            gsap.to(introAudio, {
                                volume: 0,
                                duration: 5,
                                delay: 15,
                                ease: "power1.in",
                                onComplete: () => {
                                    introAudio.pause();
                                    console.log("Intro Audio stopped");
                                },
                            });
                        }
                    },
                }));
        },
    });
});
