const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const id = params.id;

//
const image = document.createElement("img");
const tvImage = document.getElementById("tv-image");
const title = document.getElementById("title");
const rating = document.getElementById("rating");
const airDate = document.getElementById("air-date");
const moreinfo = document.getElementById("more-info");
const starButton = document.getElementById("star");

//Local Storage
const localStorage = () => {
    
}

const fetchShow = async (id) => {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.warn(error);
  }
};

const updateInfo = async (id) => {
  const showData = await fetchShow(id);
  starButton.addEventListener("click",localStorage)
  image.src = showData.image.medium || showData.image.original;
  image.alt = showData.name;
  tvImage.appendChild(image);
  //
  console.log(showData.name);
  title.textContent = showData.name;
  rating.textContent = showData.rating.average;
  airDate.textContent = showData.premiered;
  moreinfo.innerHTML = showData.summary;

};

updateInfo(id);
