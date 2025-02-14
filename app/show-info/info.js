const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const id = params.id;
import redStar from "../Assets/redstar.png";
import whiteStar from "../Assets/Star.png";


//
const image = document.createElement("img");
image.id = "show-poster";
const ul = document.createElement("ul");
ul.id = "genre-Id";
const tvImage = document.getElementById("tv-image");
const title = document.getElementById("title");
const rating = document.getElementById("rating");
const genre = document.getElementById("genre");
const airDate = document.getElementById("air-date");
const type = document.getElementById("type");
const minutes = document.getElementById("minutes");
const moreinfo = document.getElementById("more-info");
const starButton = document.getElementById("star");
// const displayCast = document.getElementById("display-cast");;
const displayCast = document.querySelector(".display-cast");
const savedShows = JSON.parse(localStorage.getItem("shows")) || {};
//Local Storage
const starClick = (showData) => {
  if (id in savedShows) {
    delete savedShows[id];
    localStorage.setItem("shows", JSON.stringify(savedShows));
    starButton.src = whiteStar;
  } else {
    savedShows[id] = {
      name: showData.name,
      image: {
        medium: showData.image.medium,
        original: showData.image.original,
      },
      rating: {
        average: showData.rating.average,
      },
    };
    localStorage.setItem("shows", JSON.stringify(savedShows));
    starButton.src = redStar;
  }
};
const stat = document.getElementById("status");

const fetchShow = async (id) => {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(error);
  }
};
const fetchCast = async (id) => {
  try {
    const response = await fetch(
      `https://api.tvmaze.com/shows/${id}?embed=cast`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(err);
  }
};

const updateInfo = async (id) => {
  const showData = await fetchShow(id);
  if (id in savedShows) {
    starButton.src = redStar;
  }
  starButton.addEventListener("click", () => starClick(showData));
  image.src = showData.image.medium || showData.image.original;
  const showCast = await fetchCast(id);
  starButton.addEventListener("click", localStorage);
  image.alt = showData.name;
  tvImage.appendChild(image);
 
  title.textContent = `${showData.name}`;
  stat.textContent = `Status: ${showData.status}`;
  type.textContent = showData.type;
  minutes.textContent = `${showData.averageRuntime}m`;
  rating.innerHTML = `<p> Rating: ${
    showData.rating.average ? showData.rating.average : "No Rating"
  }/10</p>
            <svg width="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.12 9.88005C21.0781 9.74719 20.9996 9.62884 20.8935 9.53862C20.7873 9.4484 20.6579 9.38997 20.52 9.37005L15.1 8.58005L12.67 3.67005C12.6008 3.55403 12.5027 3.45795 12.3853 3.39123C12.2678 3.32451 12.1351 3.28943 12 3.28943C11.8649 3.28943 11.7322 3.32451 11.6147 3.39123C11.4973 3.45795 11.3991 3.55403 11.33 3.67005L8.89999 8.58005L3.47999 9.37005C3.34211 9.38997 3.21266 9.4484 3.10652 9.53862C3.00038 9.62884 2.92186 9.74719 2.87999 9.88005C2.83529 10.0124 2.82846 10.1547 2.86027 10.2907C2.89207 10.4268 2.96124 10.5512 3.05999 10.6501L6.99999 14.4701L6.06999 19.8701C6.04642 20.0091 6.06199 20.1519 6.11497 20.2826C6.16796 20.4133 6.25625 20.5267 6.36999 20.6101C6.48391 20.6912 6.61825 20.7389 6.75785 20.7478C6.89746 20.7566 7.03675 20.7262 7.15999 20.6601L12 18.1101L16.85 20.6601C16.9573 20.7189 17.0776 20.7499 17.2 20.7501C17.3573 20.7482 17.5105 20.6995 17.64 20.6101C17.7537 20.5267 17.842 20.4133 17.895 20.2826C17.948 20.1519 17.9636 20.0091 17.94 19.8701L17 14.4701L20.93 10.6501C21.0305 10.5523 21.1015 10.4283 21.1351 10.2922C21.1687 10.1561 21.1634 10.0133 21.12 9.88005Z" fill="#d10000" style=""></path>
    </svg>`;

  moreinfo.innerHTML = showData.summary;

  if (showData.image) {
    image.src = showData.image.original;
  } else {
    image.src =
      "https://core.trac.wordpress.org/raw-attachment/ticket/45927/placeholder-image-portrait.png";
  }

  if (showData.ended === null) {
    airDate.textContent = `T.V Series ${
      showData.premiered.split("-")[0]
    } - On Going`;
  } else {
    airDate.textContent = `T.V Series ${showData.premiered.split("-")[0]} - ${
      showData.ended.split("-")[0]
    }`;
  }
  for (let genre of showData.genres) {
    const li = document.createElement("li");
    li.textContent = genre;
    li.classList.add("genreLi");
    ul.appendChild(li);
  }
  genre.appendChild(ul);
};

const updateCast = async (id) => {
  const showCast = await fetchCast(id);

  if (!showCast._embedded.cast || showCast._embedded.cast.length === 0) {
    displayCast.innerHTML = `<p>No Results Found</p>`;
    return;
  }

  displayCast.innerHTML = "";

  const limitedCast = showCast._embedded.cast.slice(0, 7);

  for (let char of limitedCast) {
    let castMember = char.person;
    let character = char.character
    let castMemberChar = char.character;

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("castCard");

    // const img = document.createElement("img");
    const castMemberName = document.createElement("h3");
    const castMemberCharacter = document.createElement("p");
    const flipCard = document.createElement('div');
    flipCard.classList.add("flip-card", "flipImg");
    let placeholder = castMember.gender === "Male"? "https://st4.depositphotos.com/9998432/25177/v/450/depositphotos_251778046-stock-illustration-person-gray-photo-placeholder-man.jpg": "https://thumbs.dreamstime.com/b/woman-icon-picture-profile-female-icon-human-people-sign-symbol-template-design-vector-woman-icon-picture-197275689.jpg";
    let frontImg = castMember.image? castMember.image.original: placeholder; 
    let backImg = character.image? character.image.original: placeholder;
    flipCard.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img class="flipImg" src="${frontImg}" alt="Actor">
        </div>
        <div class="flip-card-back">
        <img class="flipImg" src="${backImg}" alt="Character"> 
        </div>
      </div>
    `

    // if (castMember.image) {
    //   img.src = castMember.image.original;
    // } else {
    //   img.src =
    //     "https://thumbs.dreamstime.com/b/woman-icon-picture-profile-female-icon-human-people-sign-symbol-template-design-vector-woman-icon-picture-197275689.jpg";
    // }
    // img.alt = castMember.name;
    castMemberName.innerText = castMember.name;
    castMemberCharacter.innerText = `as ${castMemberChar.name}`;

    cardDiv.append(flipCard, castMemberName, castMemberCharacter);

    displayCast.appendChild(cardDiv);
  }
};

updateCast(id);
updateInfo(id);
