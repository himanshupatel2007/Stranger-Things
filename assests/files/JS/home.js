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
    const maxSteps = cards.length/2 ;

    nextBtn.addEventListener("click", () => {
        if (currentStep < maxSteps) {
            currentStep++;
            gsap.to(cards, {
                x: `-=${cardWidth}`,
                duration: 0.6,
                ease: "power2.out"
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
                ease: "power2.out"
            });
        }
        else{
           gsap.to(container, { x: -10, duration: 0.1, yoyo: true, repeat: 1 });
        }
    });
}


