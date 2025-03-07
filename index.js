const searchButton = document.querySelector(".btn__search");
const searchInput = document.querySelector(".movie__bar"); // Corrected selector
const movieTitle = document.getElementById("movieTitle");
const movieDescription = document.getElementById("movieDescription");
const moviePoster = document.getElementById("moviePoster");
const movieWrapper = document.querySelector(".new__wrapper"); // Select the container

searchButton.addEventListener("click", searchMovie); // Add event listener

// menu open and close

function openMenu() {
  document.body.classList += "menu--open"
  }
  
  function closeMenu() {
  document.body.classList.remove('menu--open')
  }


// Carousel1
document.addEventListener("DOMContentLoaded", function () {
  // Hide all slides except the first one on page load

  let slides = document.getElementsByClassName("carousel__img");

  for (let i = 0; i < slides.length; i++) {
    if (i === 0) {
      slides[i].style.display = "block";
    } else {
      slides[i].style.display = "none";
    }
  }

  // Initialize the dots

  let dots = document.getElementsByClassName("dot");

  dots[0].className += " active";
});

// Carousel2
let slideIndex = 1;

function moveSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlides(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("carousel__img");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 5000);
  dots[slideIndex - 1].className += " active";
}

function searchMovie() {
  const searchTerm = searchInput.value.trim(); // Use searchTerm instead of query
  if (searchTerm) {
    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=4f56ff1f`) // Corrected URL and template literal
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          // Clear previous search results
          movieWrapper.innerHTML = ""; // Clear the movie display area

          // Loop through the search results and display each movie
          data.Search.forEach((movie) => {
            displayMovieData(movie);
          });
        } else {
          alert(data.Error || "Movie not found!"); // Display error message from API or generic message
          movieWrapper.innerHTML = ""; // Clear previous search results in case of error
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("An error occurred while searching. Please try again later."); // User-friendly error message
        movieWrapper.innerHTML = ""; // Clear previous search results in case of error
      });
  } else {
    alert("Please enter a movie name to search.");
  }
}

function displayMovieData(movie) {
  const { Title, Year, Poster } = movie;

  // Create movie element dynamically
  const movieDiv = document.createElement("div");
  movieDiv.classList.add("new__movie");
  movieDiv.innerHTML = `
            <div class="new__movie--one">
                <img src="${
                  Poster !== "N/A" ? Poster : "./g2.jpg"
                }" class="movie1" alt="Movie Poster">
                <div class="new__movie__wrapper-bg">
                <div class="new__movie--description">
                <h3 id="movieTitle" class="new__description--title">${Title}<br> ${Year}</h3>
<span class="material-symbols-rounded new__btn click" onclick="toggleContrast(event)">play_circle</span>
                        <a href="./details.html" class="more">More <span class="orange details">Details...</span></a>
            </div>  
            </div> 
            </div> 
    `;

  movieWrapper.appendChild(movieDiv); // Append the new movie element to the wrapper
}

function toggleContrast(event) {
  event.target.classList.toggle("clicked");
}

// Recommended movie

const movies = [
    { title: "Guardians of the Galaxy Vol. 2", imgSrc: "./g2.jpg" },
    { title: "Movie Title 2", imgSrc: "./g3.jpg" },
    { title: "Movie Title 3", imgSrc: "./g4.jpg" },
    { title: "Movie Title 3", imgSrc: "./g4.jpg" },
    { title: "Movie Title 3", imgSrc: "./g4.jpg" },
    { title: "Movie Title 3", imgSrc: "./g4.jpg" },
    { title: "Movie Title 3", imgSrc: "./g4.jpg" },
    { title: "Movie Title 3", imgSrc: "./g4.jpg" },
    { title: "Movie Title 3", imgSrc: "./g4.jpg" },
    // Add more movie objects here!
];

const movieContainer = document.querySelector('.new__wrapper');

movies.forEach(movie => {
    const movieBox = document.createElement('div');
    movieBox.classList.add('new__movie');

    movieBox.innerHTML = `
        <div class="new__movie--one">
            <img id="moviePoster" src="${movie.imgSrc}" class="new__movie1" alt="Movie Poster">
            <div class="new__movie__wrapper-bg">
                <div class="new__movie--description">
                    <h3 id="movieTitle" class="new__description--title">${movie.title}</h3>
                    <span class="material-symbols-rounded new__btn click" onclick="toggleContrast(event)">play_circle</span>
                        <a href="./details.html" class="more">More <span class="orange details">Details...</span></a>
                </div>  
            </div> 
        </div>
    `;

    movieContainer.appendChild(movieBox);
});