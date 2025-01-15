const savedShows = JSON.parse(localStorage.getItem("shows"));

const showDiv = document.getElementById("main-show-div");

const showLister = (shows) => {
    showDiv.innerHTML = "";
    if(shows.length === 0){
        showDiv.innerHTML = `<p>No Results Found</p>`
    }
    for (let show in shows) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add("showCard");

        const img = document.createElement('img');
        img.src = shows[show].image ? shows[show].image.original : "https://core.trac.wordpress.org/raw-attachment/ticket/45927/placeholder-image-portrait.png";
        img.alt = shows[show].name;

        const overlayDiv = document.createElement('div');
        overlayDiv.classList.add("overlay");
        const overlayContent = document.createElement('div');
        overlayContent.classList.add("overlay-content");

        const title = document.createElement('p');
        title.textContent = shows[show].name;
        const trashBin = document.createElement('svg');
        trashBin.innerHTML = `<svg fill="#000000" width="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" fill="#d10000" style=""></path>`;  // Your trash bin path here
        trashBin.classList.add('trash-bin');

        trashBin.addEventListener('click', () => {
            delete savedShows[show]
            localStorage.setItem("shows", JSON.stringify(savedShows));
            showLister(savedShows)
        })
        const ratingDiv = document.createElement('div');
        ratingDiv.classList.add('rating-div');
        ratingDiv.innerHTML = `<p>${shows[show].rating.average || 'No Rating'}</p>`;

        overlayContent.append(title, trashBin);
        overlayDiv.append(overlayContent);
        cardDiv.append(img, overlayDiv, ratingDiv);
        cardDiv.addEventListener('click', (e) => {
            if (!(e.target.matches('svg') || e.target.matches('path'))) {
                window.location.href = `./show-info.html?id=${show}`;
            }
        });

        showDiv.append(cardDiv);
    }
}


showLister(savedShows)