// Antonio Hernandez
// INF654 - Assignment 2
// Muvva
// 10 - 26 - 23

/* Service Worker Register */
// Can delete the service worker by unregistering the service worker in inspect element > applicaton
// service worker > unregister, can go further by going ALL

/*
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
    .then(reg => {
        console.log(`Service Worker Registration (Scope: ${reg.scope})`);
    }).catch(error => {
        console.log(`Service Worker Error(${error})`);
    })
} else {
    console.log("Service Worker not available");
}
*/

// Better version of above code 
if ("serviceWorker" in navigator) {
    // defer service worker installation until page completes loading
    window.addEventListener("load", () => {
      //then register our service worker
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          //display a success message
          console.log(`Service Worker Registration (Scope: ${reg.scope})`);
        })
        .catch((error) => {
          //display an error message
          console.log(`Service Worker Error (${error})`);
        });
    });
  } else {
    //happens when the app isn't served over a TLS connection (HTTPS)
    // or if the browser doesn't support the service worker
    console.log("Service Worker not available");
  }


  /* Dynamic Content - Adding, Updating(not yet), Deleting movie entries */
  /* This stores the movies in the localStores (I created a json file to locally storae but decided to just store 
    them in localStorage and we did not cover whether we will use cookies or cache yet) */
  /*
  let movies = [];

  // uses localStorage to load movies
  function loadMovies() {
    movies = JSON.parse(localStorage.getItem("movies")) || [];
    renderMovies();
  }

  function renderMovies() {
    const moviesContainer = document.querySelector('.movies');
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
      const movieEl = document.createElement('div');
      movieEl.classList.add('card-panel', 'movie', 'white', 'row');
      movieEl.innerHTML = `
        <img src="${movie.image}" class="responsive-img materialboxed" alt="${movie.title}">
        <div class="movie-detail">
          <div class="movie-title">${movie.title}</div>
          <div class="movie-description">${movie.description}</div>
        </div>
        <div class="movie-delete">
          <i class="material-icons" data-id="${movie.id}">delete_outline</i>
        </div>
      `;
      moviesContainer.appendChild(movieEl);
    });
  }

  // ADD movie
  document.querySelector('.add-movie').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const title = event.target.title.value.trim();
    const description = event.target.description.value.trim();
    const newMovie = {
      id: Date.now(), // generating a ID using the date
      title,
      description,
      image: '/img/movie.jpg' // placeholder image
    };
  
    movies.push(newMovie);
    saveMovies();
    renderMovies();
    event.target.reset(); // Reset the form fields
  });

  // DELETE movie
  document.querySelector('.movies').addEventListener('click', function(event) {
    if (event.target.tagName === 'I' && event.target.textContent === 'delete_outline') {
      const id = event.target.dataset.id;
      movies = movies.filter(movie => movie.id !== Number(id));
      saveMovies();
      renderMovies();
    }
  });

  function saveMovies() {
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  // call get load
  document.addEventListener('DOMContentLoaded', function() {
    loadMovies();
  });
*/