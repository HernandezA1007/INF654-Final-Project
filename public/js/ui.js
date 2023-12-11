// Setup materialize components
document.addEventListener('DOMContentLoaded', function() {
    // console.log("DOM fully loaded and parsed");
    var modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);

    var items = document.querySelectorAll(".collapsible");
    M.Collapsible.init(items);
});


const movies = document.querySelector(".movies");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const setupUI = (user) => {
    if (user) {
        // toggle UI elements
        loggedInLinks.forEach((item) => (item.style.display = "block"));
        loggedOutLinks.forEach((item) => (item.style.display = "none"));
    } else {
        // toggle UI elements
        loggedInLinks.forEach((item) => (item.style.display = "none"));
        loggedOutLinks.forEach((item) => (item.style.display = "block"));
    }

}

document.addEventListener("DOMContentLoaded", function() {
    // Nav Menu
    const menus = document.querySelectorAll(".side-menu");
    M.Sidenav.init(menus, { edge: "right" });
    // Add Movies
    const forms = document.querySelectorAll(".side-form");
    M.Sidenav.init(forms, { edge: "left" });
});

// populate data
const setupMovies = (data) => {
    let html = "";
    data.forEach((doc) => {
      const movie = doc.data();
      const li = `    
      <div class="card-panel movie white row" data-id ="${movie.id}">
      <img src="/img/movie.png" class="responsive-img materialboxed" alt="">
      <div class="movie-detail">
          <div class="movie-title">${movie.title}</div>
          <div class="movie-description">${movie.description}</div>
      </div>
      <div class="movie-delete">
          <i class="material-icons" data-id ="${movie.id}">delete_outline</i>
      </div>
  </div>`;
      html += li;
    });
  
    movies.innerHTML = html;
};

const renderMovie = (data, id) => {
    const html = `
    <div class="card-panel movie white row" data-id ="${id}">
              <img src="/public/img/movie.png" class="responsive-img materialboxed" alt="">
              <div class="movie-detail">
                  <div class="movie-title">${data.title}</div>
                  <div class="movie-description">${data.description}</div>
              </div>
              <div class="movie-delete">
                  <i class="material-icons" data-id ="${id}">delete_outline</i>
              </div>
          </div>
    `;
  
    movies.innerHTML += html;
};

// Remove movie from DOM
const removeMovie = (id) => {
    const movie = document.querySelector(`.movie[data-id=${id}]`); // id as quotations? 
    movie.remove();
};