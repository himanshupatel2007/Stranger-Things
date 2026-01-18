async function loadTrialers() {
  try {
    const response = await fetch("./assests/json-files/trailors.json");
    const data = await response.json();
    let trailersContainer = document.querySelector(".trailerContainer");
    trailersContainer.innerHTML = "";
    data.forEach((item) => {
      let element = ` <div class="trailers">
                        <iframe class="ytLink"src="${item.embedId}" frameborder="0" allowfullscreen></iframe><div>${item.category}</div>
                        <p>${item.trailerHeading}</p>
                    </div>`;
      trailersContainer.innerHTML += element;
    });

    initGsapSlider();
  } catch (error) {
    console.log("ERROR LOADING TRAILERS", error);
  }
}

loadTrialers();
let currentStep = 0;

function initGsapSlider() {
  const container = document.querySelector(".trailerContainer");
  const cards = document.querySelectorAll(".trailers");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  const cardWidth = 300;
  const maxSteps = cards.length / 2;

  nextBtn.addEventListener("click", () => {
    if (currentStep < maxSteps) {
      currentStep++;
      gsap.to(cards, {
        x: `-=${cardWidth}`,
        duration: 0.6,
        ease: "power2.out",
      });
    } else {
      gsap.to(container, { x: -10, duration: 0.1, yoyo: true, repeat: 1 });
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      gsap.to(cards, {
        x: `+=${cardWidth}`,
        duration: 0.6,
        ease: "power2.out",
      });
    } else {
      gsap.to(container, { x: +10, duration: 0.1, yoyo: true, repeat: 1 });
    }
  });
}

document.querySelector("#watchNow").addEventListener("click", () => {
  window.location.href = "https://www.netflix.com/in/title/80057281";
});
document.querySelector(".footerWatchNow").addEventListener("click", () => {
  window.location.href = "https://www.netflix.com/in/title/80057281";
});

const iframe = document.querySelector("#player");
const vimeoPlayer = new Vimeo.Player(iframe);

const videoThumbnail = document.querySelector(".videoBackground");

let play = true;
let mute = false;

const playBtn = document.querySelector("#playBtn");
const muteBtn = document.querySelector("#muteBtn");
playBtn.addEventListener("click", () => {
  if (play) {
    vimeoPlayer.play().then(() => {
      playBtn.innerHTML =
        ' <img src="./assests/images/contents/pause-circle-svgrepo-com.svg" alt="" />';
      play = false;
      gsap.to(videoThumbnail, {
        opacity: 0,
        duration: 2,
        ease: "power2.inOut",
      });
    });
  } else {
    vimeoPlayer.pause().then(() => {
      play = true;
      playBtn.innerHTML = ' <img src="./assests/images/contents/play-svgrepo-com.svg" alt="" />';

      gsap.to(videoThumbnail, {
        opacity: 1,
        duration: 2,
        ease: "power2.out",
      });
    });
  }
});

muteBtn.addEventListener("click", () => {
  if (mute) {
    vimeoPlayer.setMuted(false).then(() => {
      mute = false;
      muteBtn.innerHTML = '<img src="./assests/images/contents/audio-svgrepo-com.svg" alt="" />';

    });
  } else {
    vimeoPlayer.setMuted(true).then(() => {
      mute = true;
      muteBtn.innerHTML = '<img src="./assests/images/contents/audio-off-svgrepo-com.svg" alt="" />';

    });
  }
});


let introAudio = document.querySelector("audio")

function playIntroAudio() {
 introAudio.play();
}

playIntroAudio()