const searchButton = document.querySelector('.btn__search');
const searchInput = document.querySelector('.movie__bar'); // Corrected selector
const movieTitle = document.getElementById('movieTitle');
const movieDescription = document.getElementById('movieDescription');
const moviePoster = document.getElementById('moviePoster');
const movieWrapper = document.querySelector('.movie__wrapper'); // Select the container

searchButton.addEventListener('click', searchMovie); // Add event listener

function searchMovie() {
    const searchTerm = searchInput.value.trim(); // Use searchTerm instead of query
    if (searchTerm) {
        fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=4f56ff1f`) // Corrected URL and template literal
            .then(response => response.json())
            .then(data => {
                if (data.Response === 'True') {
                    // Clear previous search results
                    movieWrapper.innerHTML = ''; // Clear the movie display area

                    // Loop through the search results and display each movie
                    data.Search.forEach(movie => {
                        displayMovieData(movie);
                    });
                } else {
                    alert(data.Error || 'Movie not found!'); // Display error message from API or generic message
                    movieWrapper.innerHTML = ''; // Clear previous search results in case of error
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('An error occurred while searching. Please try again later.'); // User-friendly error message
                movieWrapper.innerHTML = ''; // Clear previous search results in case of error
            });
    } else {
        alert('Please enter a movie name to search.');
    }
}

function displayMovieData(movie) {
    const { Title, Year, Plot, Poster } = movie;

    // Create movie element dynamically
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');
    movieDiv.innerHTML = `
        <div class="movie__one">
            <img src="${Poster !== 'N/A' ? Poster : './g2.jpg'}" class="movie1" alt="Movie Poster">
            <div class="movie__wrapper--bg">
                <div class="movie__description">
                    <h3 class="movie__description--title">${Title} <br> ${Year}</h3>
                    <p class="movie__para">${Plot}</p>
                    <button class="movie__btn click" onclick="toggleContrast(event)">Watch Now!</button>
                </div>
            </div>
        </div>
    `;

    movieWrapper.appendChild(movieDiv); // Append the new movie element to the wrapper
}


function toggleContrast(event) {
    event.target.classList.toggle('clicked');
}