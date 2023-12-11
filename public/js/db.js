// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3cf-cla0gNekQ4ni6hZ0kH9aDJ5XQ7mI",
    authDomain: "movielog-e24b9.firebaseapp.com",
    projectId: "movielog-e24b9",
    storageBucket: "movielog-e24b9.appspot.com",
    messagingSenderId: "290332001115",
    appId: "1:290332001115:web:c2e1e1c5da75ab7772507e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getMovies(db) {
    const moviesCol = collection(db, "movies");
    const movieSnapshot = await getDocs(moviesCol);
    const movieList = movieSnapshot.docs.map(doc => doc); // removed .data()
    return movieList;
}
// async vs sync...

// IndexedDb (stores the data offline)
/* this will be deprecated in the future -> will need to use FirestoreSettings.cache instead */
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === "failed-precondition") {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a time
        // console.log("Multiple tabs open, offline persistence failed");
        console.log("Persistence failed");
    } else if (err.code === "unimplemented") {
        // The current browser does not support all of the
        // features required to enable persistence
        // console.log("Browser does not support offline persistence");
        console.log("Persistence is not valid");
    }
});

const unsub = onSnapshot(collection(db, "movies"), (doc) => {
    doc.docChanges().forEach((change) => {
        if (change.type === "added") {
            //Call render function in UI
            renderMovie(change.doc.data(), change.doc.id);
        }
        if (change.type === "removed") {
            //do something
            removeMovie(change.doc.id);
        }
    });
});


/* Dynamic Content - CRUD operations */
// ADD new movie
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    // const movie = {
    //     title: form.title.value,
    //     description: form.description.value,
    // };
    // console.log(movie);
    // addMovie(movie);
    // form.reset();
    addDoc(collection(db, "movies"), {
        title: form.title.value,
        description: form.description.value
    }).catch((error) => {
        console.log(error);
    });
    form.title.value = "";
    form.description.value = "";
});

// DELETE movie
const movieContainer = document.querySelector(".movies");
movieContainer.addEventListener("click", (event) => {
    // console.log(event);
    if (event.target.tagName === "I") {
        const id = event.target.getAttribute("data-id");
        // console.log(id);
        // deleteMovie(id);
        deleteDoc(doc(db, "movies", id));
    }
});