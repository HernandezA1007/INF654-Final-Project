import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
const auth = getAuth(app);

// listen for auth status changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User logged in: ", user.email);
        getMovies(db).then((snapshot) => {
            setupMovies(snapshot)
        })
        setupUI(user);
        const form = document.querySelector("form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            addDoc(collection(db, "movies"), {
                title: form.title.value,
                description: form.description.value
            }).catch((error) => {
                console.log(error);
            });
            form.title.value = "";
            form.description.value = "";
        });
    } else {
        console.log("User logged out");
        setupUI();
        setupMovies([]);
    }
});

/* User Authentication */
// signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;

    // sign up the user
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => { // cred
        const user = userCredential.user;
        console.log(user);
        const modal = document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
});

// logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
        console.log("user signed out");
    }).catch((error) => { 
        // an error happened
    });
});

// login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;

    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        const modal = document.querySelector("#modal-login");
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        // ...
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
});