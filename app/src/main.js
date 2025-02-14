const main = async () => {
  const showDiv = document.getElementById("main-show-div");
  const searchBar = document.getElementsByClassName("search-bar")[0];
  const leftPag = document.getElementById("left-pag");
  const rightPag = document.getElementById('right-pag');
  const currentPage = document.getElementById("current-page")
  const pagDiv = document.getElementsByClassName('pag')[0];
  let pagNum = 0;

  const fetchGeneralShows = async () => {
    try {
      const response = await fetch("https://api.tvmaze.com/show");
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn(error);
    }
  };
  const generalShowArray = await fetchGeneralShows();

    const showLister = (shows) => {
        showDiv.innerHTML = "";
        if(shows.length === 0){
            showDiv.innerHTML = `<p>No Results Found</p>`
            pagDiv.style.display = "none";
        }
        for (let show of shows) {
            if("show" in show){
                show = show.show;
                pagDiv.style.display = "none";
            } else {
              pagDiv.style.display = "flex";
            }
            const cardDiv = document.createElement('div');
            cardDiv.classList.add("showCard");
        
            const img = document.createElement('img');
            if(show.image){
                img.src = show.image.original;
            } else {
                img.src = "https://core.trac.wordpress.org/raw-attachment/ticket/45927/placeholder-image-portrait.png"
            }
            img.alt = show.name;
            const link = document.createElement('a');
            link.href = `./show-info/?id=${show.id}`
            link.classList.add('cardLink');
            const overlayDiv = document.createElement('div');
            overlayDiv.classList.add("overlay");
            const ratingDiv = document.createElement('div');
            ratingDiv.classList.add('rating-div')
            ratingDiv.innerHTML = `<p>${show.rating.average? show.rating.average: 'No Rating'}</p>
            <svg width="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.12 9.88005C21.0781 9.74719 20.9996 9.62884 20.8935 9.53862C20.7873 9.4484 20.6579 9.38997 20.52 9.37005L15.1 8.58005L12.67 3.67005C12.6008 3.55403 12.5027 3.45795 12.3853 3.39123C12.2678 3.32451 12.1351 3.28943 12 3.28943C11.8649 3.28943 11.7322 3.32451 11.6147 3.39123C11.4973 3.45795 11.3991 3.55403 11.33 3.67005L8.89999 8.58005L3.47999 9.37005C3.34211 9.38997 3.21266 9.4484 3.10652 9.53862C3.00038 9.62884 2.92186 9.74719 2.87999 9.88005C2.83529 10.0124 2.82846 10.1547 2.86027 10.2907C2.89207 10.4268 2.96124 10.5512 3.05999 10.6501L6.99999 14.4701L6.06999 19.8701C6.04642 20.0091 6.06199 20.1519 6.11497 20.2826C6.16796 20.4133 6.25625 20.5267 6.36999 20.6101C6.48391 20.6912 6.61825 20.7389 6.75785 20.7478C6.89746 20.7566 7.03675 20.7262 7.15999 20.6601L12 18.1101L16.85 20.6601C16.9573 20.7189 17.0776 20.7499 17.2 20.7501C17.3573 20.7482 17.5105 20.6995 17.64 20.6101C17.7537 20.5267 17.842 20.4133 17.895 20.2826C17.948 20.1519 17.9636 20.0091 17.94 19.8701L17 14.4701L20.93 10.6501C21.0305 10.5523 21.1015 10.4283 21.1351 10.2922C21.1687 10.1561 21.1634 10.0133 21.12 9.88005Z" fill="#d10000" style=""></path>
    </svg>`;
      const title = document.createElement("p");
      title.textContent = show.name;
      overlayDiv.appendChild(title);
      cardDiv.append(img, overlayDiv, ratingDiv);
      link.append(cardDiv);
      showDiv.append(link);
    }
  };
  
  showLister([...generalShowArray].splice(currentPage, 20));

  const fetchSearchShows = async (query) => {
    try {
      const response = await fetch(
        `https://api.tvmaze.com/search/shows?q=${query}`
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.warn(error);
    }
  };

  searchBar.addEventListener("submit", async (e) => {
    e.preventDefault();
    const val = e.target.query.value;
    const shows = await fetchSearchShows(val);
    pagNum = 0;
    currentPage.textContent = pagNum + 1;
    showLister(val ? shows : [...generalShowArray].splice(0 * 20, 20));
  });

  leftPag.addEventListener('click', () => {
    if(pagNum === 0) return;
    pagNum--;
    currentPage.textContent = pagNum + 1
    showLister([...generalShowArray].splice(pagNum * 20, 20));
  })

  rightPag.addEventListener('click', () => {
    pagNum++;
    const arr = [...generalShowArray].splice(pagNum * 20, 20);
    if(!arr.length) {
      pagNum--
      return;
    };
    currentPage.textContent = pagNum + 1
    showLister(arr);
  })

};
main();
