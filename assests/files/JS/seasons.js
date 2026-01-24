console.log("seasons.js loaded");

export function createRatingsTable() {
    const tableContainer = document.querySelector(".ratingTable"); //

    let tableHTML = ` <h1 id="ratings">Ratings by episodes..</h1>
    <table>
        <thead>
            <tr >
                <th></th>
                <th>Ep 1</th><th>Ep 2</th><th>Ep 3</th><th>Ep 4</th>
                <th>Ep 5</th><th>Ep 6</th><th>Ep 7</th><th>Ep 8</th><th>Ep 9</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><b>S1</b></td>
                <td class="red">8.6</td><td class="darkred">8.3</td><td class="red">8.8</td><td class="red">8.9</td>
                <td class="red">8.6</td><td class="red">8.8</td><td class="red">9.0</td><td class="red">9.3</td><td></td>
            </tr>
            <tr>
                <td><b>S2</b></td>
                <td class="darkred">8.1</td><td class="darkred">8.2</td><td class="darkred">8.5</td><td class="darkred">8.5</td>
                <td class="red">8.8</td><td class="red">9.1</td><td class="deepred">6.0</td><td class="red">9.2</td><td class="red">9.3</td>
            </tr>
            <tr>
                <td><b>S3</b></td>
                <td class="darkred">7.8</td><td class="darkred">7.9</td><td class="darkred">8.2</td><td class="red">8.9</td>
                <td class="darkred">8.5</td><td class="darkred">8.5</td><td class="red">8.7</td><td class="red">9.3</td><td></td>
            </tr>
            <tr>
                <td><b>S4</b></td>
                <td class="darkred">8.1</td><td class="darkred">8.1</td><td class="darkred">8.3</td><td class="red">9.5</td>
                <td class="darkred">8.1</td><td class="darkred">8.5</td><td class="red">9.6</td><td class="red">8.7</td><td class="red">9.2</td>
            </tr>
            <tr>
                <td><b>S5</b></td>
                <td class="darkred">7.8</td><td class="darkred">8.3</td><td class="darkred">8.5</td><td class="red">9.4</td>
                <td class="darkred">7.9</td><td class="darkred">7.9</td><td class="deepred">5.7</td><td class="red">7.6</td><td></td>
            </tr>
        </tbody>
    </table>`;


    tableContainer.innerHTML = tableHTML;
}


export async function loadEpisodes(index) {
    const seasonContainer = document.querySelector(".seasonsContainer")
    const currentHeight = seasonContainer.offsetHeight;
    seasonContainer.style.height = `${currentHeight}px`;
    seasonContainer.innerHTML = '';
    const response = await fetch("./assests/json-files/seasons.json")
    const data = await response.json();
    const seasonData = data[index];
    const posterDiv = document.querySelector(".posters")
    posterDiv.innerHTML = ` <img src="${seasonData.poster_url}" alt="${seasonData.season}">
    <p>StrangerThings(${seasonData.season})</p>`
    let episodesHtml = seasonData.episodes.map(episode => {
       return `
    <div class="episodes">
        <h1>${episode.no}</h1>
        <div class="media-container">
            <img src="${episode.image_url}" alt="${episode.title}">
            <div class="hover-overlay">
                <img src="./assests/images/contents/play-circle-svgrepo-com.svg" class="overlay-icon">
            </div>
        </div>
        <div class="episodeDescription">
            <a href="${episode.link}" target="_blank" style="text-decoration: none; color: inherit;">
                <h3>${episode.title}</h3>
            </a>
            <p>${episode.description}</p>
        </div>
    </div>`;
    }).join('');
    seasonContainer.innerHTML = episodesHtml;
    seasonContainer.style.height = 'auto';
}

export function fadeSeasons() {
    gsap.to(".seasons", {
        opacity: 0,
        duration: 2,
        onComplete: () => {
            gsap.set(".seasons", {
                display: "none"
            })
        }
    })
}

export function loadSeasonsPage() {

    gsap.set(".seasons", {
        display: "block"
    })
    const tl = gsap.timeline()
    gsap.set("main", {
        display: "block"
    })
    gsap.set("nav", {
        display: "flex"
    })
    tl.fromTo(
        "nav",
        {
            y: -250,
            opacity: 0,
        },
        {
            delay: 1,
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
        }, "<"
    );
    tl.fromTo(
        "main",
        {
            y: 50,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            duration: 2.5,
            ease: "power2.out",
        },
        "<",
    );

}


const selectorsButtons = document.querySelector(".dropdown");
selectorsButtons.addEventListener("click",event=>{
    const index = event.target.id;
    loadEpisodes(index)
})