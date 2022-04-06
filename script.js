const API_URL_MOVIE =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b262d9e39171a2071dc603d1efb25995&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API_MOVIE =
  'https://api.themoviedb.org/3/search/movie?api_key=b262d9e39171a2071dc603d1efb25995&query="';

const API_URL_TV =
  "https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=b262d9e39171a2071dc603d1efb25995&page=1";

const SEARCH_API_TV =
  'https://api.themoviedb.org/3/search/tv?api_key=b262d9e39171a2071dc603d1efb25995&query="';

getContent(API_URL_MOVIE);

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const movies_c = document.getElementById("movies");
const tv_shows = document.getElementById("tv_shows");

async function getContent(url) {
  const response = await fetch(url);
  const data = await response.json();

  showContent(data.results);
}

function showContent(cards) {
  main.innerHTML = "";

  cards.forEach((card) => {
    const { poster_path, overview, vote_average } = card;

    const cardEl = document.createElement("div");
    cardEl.classList.add("card");
    cardEl.innerHTML = `<img src="${IMG_PATH + poster_path}" alt="${getTitle(
      card
    )}">
        <div class="card-info">
            <h3>${getTitle(card)}</h3>
            <span class="${getColorByVote(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>`;

    main.appendChild(cardEl);
  });
}

function getColorByVote(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

function getTitle(card) {
  if (tv_shows.classList.contains("active")) {
    return card.name;
  } else if (movies_c.classList.contains("active")) {
    return card.title;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    if (tv_shows.classList.contains("active")) {
      getContent(SEARCH_API_TV + searchTerm);
      search.value = "";
    } else if (movies_c.classList.contains("active")) {
      getContent(SEARCH_API_MOVIE + searchTerm);
      search.value = "";
    }
  } else {
    window.location.reload();
  }
});

movies_c.addEventListener("click", () => {
  movies_c.classList.add("active");
  tv_shows.classList.remove("active");

  getContent(API_URL_MOVIE);
});

tv_shows.addEventListener("click", () => {
  tv_shows.classList.add("active");
  movies_c.classList.remove("active");
  getContent(API_URL_TV);
});
