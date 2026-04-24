export async function loadTrialers() {
  try {
    const response = await fetch("./assests/json-files/trailors.json");
    const data = await response.json();
    let trailersContainer = document.querySelector(".trailerContainer");
    trailersContainer.innerHTML = "";
    data.forEach((item) => {
      let element = `
    <div class="trailers">
        <div class="media-container">
            <div class="ytLink" data-link="${item.link}" style="background-image: url(${item.imagePath});"></div>
            <div class="hover-overlay">
                <img src="./assests/images/contents/play-circle-svgrepo-com.svg" class="overlay-icon">
            </div>
        </div>
        <div style="opacity: 70%; text-transform: capitalize;">${item.category}</div>
        <p>${item.trailerHeading}</p>
    </div>`;
      trailersContainer.innerHTML += element;
    });

    initGsapSlider();
  } catch (error) {
    console.log("ERROR LOADING TRAILERS", error);
  }
}

function initGsapSlider() {
  const containerWidth =
    document.querySelector(".trailerContainer").offsetWidth;
  const cardWidth = document.querySelector(".trailers").offsetWidth;
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let nextstop = 0;
  let prevstop = 1;

  const maxSlidingWidth = cardWidth * 8 - containerWidth;
  let widthtoslide = maxSlidingWidth;
  let widthSlided = 0;

  nextBtn.addEventListener("click", () => {
    if (nextstop) {
      shake();
      return;
    }
    widthSlided += cardWidth;
    if (widthSlided > maxSlidingWidth) {
      let widthexceeded = cardWidth - (widthSlided - maxSlidingWidth);
      slideleft(widthexceeded);
      nextstop = 1;
      prevstop = 0;
      widthSlided = maxSlidingWidth;
      widthtoslide = maxSlidingWidth;
    } else {
      slideleft(cardWidth);
      nextstop = 0;
      prevstop = 0;
    }
  });

  prevBtn.addEventListener("click", () => {
    if (prevstop) {
      shake();
      return;
    }
    if (widthSlided <= cardWidth) {
      slideright(widthSlided);
      prevstop = 1;
      nextstop = 0;
      widthSlided = 0;
      widthSlided = 0;
    } else {
      if (widthSlided == 0) {
        shake();
        return;
      }
      widthSlided -= cardWidth;
      slideright(cardWidth);
      prevstop = 0;
      nextstop = 0;
    }
  });
}

function slideleft(value) {
  const cards = document.querySelectorAll(".trailers");
  gsap.to(cards, {
    x: `-=${value}`,
    duration: 0.6,
    ease: "power2.out",
  });
}

function slideright(value) {
  const cards = document.querySelectorAll(".trailers");
  gsap.to(cards, {
    x: `+=${value}`,
    duration: 0.6,
    ease: "power2.out",
  });
}

function shake() {
  const container = document.querySelector(".trailerContainer");
  if (container) {
    gsap.fromTo(
      container,
      { x: `-5` },
      {
        x: `5`,
        duration: 0.02,
        yoyo: true,
        repeat: 4,
        onComplete: () => {
          gsap.set(container, {
          clearProps : "x"
          });
        },
      },
    );
  }
}

export function watchNow() {
  window.location.href = "https://www.netflix.com/in/title/80057281";
}

const videoThumbnail = document.querySelector(".videoBackground");

let play = true;
let mute = false;
let vimeoPlayer = null;

const playBtn = document.querySelector("#playBtn");
const muteBtn = document.querySelector("#muteBtn");

export function playVideo() {
  if (!window.Vimeo) {
    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.onload = () => setupVimeoPlayer(); // Setup once script arrives
    document.head.appendChild(script);
  } else {
    setupVimeoPlayer();
  }
}

function handlePlayToggle() {
  if (play) {
    
    play = false;
    gsap.to(videoThumbnail, {
      delay: 1,
      opacity: 0,
      duration: 3.5,
      ease: "power2.inOut",
      onStart: () => {
        vimeoPlayer.play();
        vimeoPlayer.setMuted(false);
        mute = false;
        muteBtn.innerHTML =
          '<img src="./assests/images/contents/audio-svgrepo-com.svg" alt="" />';
      },
    });

    playBtn.innerHTML =
      ' <img src="./assests/images/contents/pause-circle-svgrepo-com.svg" alt="" />';
  } else {
    vimeoPlayer.pause().then(() => {
      play = true;
      playBtn.innerHTML =
        ' <img src="./assests/images/contents/play-svgrepo-com.svg" alt="" />';

      gsap.to(videoThumbnail, {
        opacity: 1,
        duration: 4,
        ease: "power2.out",
      });
    });
  }
}
function setupVimeoPlayer() {
  const iframe = document.querySelector("#player");
  const link = "https://player.vimeo.com/video/1156773331?background=1&dnt=1";

  // 3. Set the source only once to avoid re-downloads
  if (!iframe.src || iframe.src === window.location.href) {
    iframe.src = link;
  }

  // 4. Initialize the player ONLY if it doesn't exist
  if (!vimeoPlayer) {
    vimeoPlayer = new Vimeo.Player(iframe);
    vimeoPlayer.setLoop(true);
  }

  handlePlayToggle();
}

export function mutevideo() {
  if (!vimeoPlayer) return;
  if (mute) {
    vimeoPlayer.setMuted(false).then(() => {
      mute = false;
      muteBtn.innerHTML =
        '<img src="./assests/images/contents/audio-svgrepo-com.svg" alt="" />';
    });
  } else {
    vimeoPlayer.setMuted(true).then(() => {
      mute = true;
      muteBtn.innerHTML =
        '<img src="./assests/images/contents/audio-off-svgrepo-com.svg" alt="" />';
    });
  }
}

export function redirectYoutube(element) {
  const trailer = element.target.closest(".ytLink");

  if (trailer) {
    const Link = trailer.getAttribute("data-link");
    if (Link) {
      window.open(Link, "_blank");
    }
  }
}

export function fadeHome(){
  gsap.to(".home",{
    opacity:0,
    duration:2,
    onComplete:()=>{
      gsap.set(".home",{
        display:"none"
      })
    }
  })
}