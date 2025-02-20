const apiKey = '4f56ff1f';
const searchButton = document.querySelector('.btn__search');
const searchInput = document.getElementById('movieSearch');
const movieTitle = document.getElementById('movieTitle');
const movieDescription = document.getElementById('movieDescription');
const moviePoster = document.getElementById('moviePoster');

function searchMovie() {
  const query = searchInput.value.trim();
  if (query) {
    fetch(` https://omdbapi.com/?s=${searchTerm}&apikey=${ http://www.omdbapi.com/?i=tt3896198&apikey=4f56ff1f
    }`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        displayMovieData(data.Search[0]);
      }
      else {
        alert('Movie not found!')
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }
  else {
    alert('Please enter a movie name to search.');
  }
}

function displayMovieData(movie) {
  const { Title, Year, Plot, Poster } = movie;

  movieTitle.innerHTML = `${Title} <br> ${Year}`;
  movieDescription.innerHTML = Plot;
  moviePoster.src = Poster !== 'N/A' ? Poster : './g2.jpg';
}

function toggleContrast(event) {
  event.target.classList.toggle('clicked');
}