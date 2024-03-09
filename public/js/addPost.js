// Function to make AJAX GET request
function ajaxGET(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);
        } else {
            console.error('Failed to load:', xhr.status, xhr.statusText);
        }
    }
    xhr.open("GET", url);
    xhr.send();
}

// Load navbar when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    ajaxGET("/navbar", function (data) {
        document.getElementById("navbarPlaceholder").innerHTML = data;
    });
});


//To handle user interactions and update the rating value
$(document).ready(function () {
    getUserInfoFromAuth()
});

var userName;
firebase.auth().onAuthStateChanged(user => {
    // Check if a user is signed in:
    if (user) {
        currentUser = db.collection("users").doc(user.uid)
        currentUser.get()
            .then(() => {
                userName = user.displayName
            })
    }
})

// Submit a thought
function submitThought() {
    console.log('Submitted');
    // Define a variable for the collection you want to create in Firestore to populate data
    var thought = db.collection("thoughts");

    thought.add({   
        image: 'url', // place holder for a url
        // thought: document.getElementById('thought').value,   // the text box should include id="comment"
        user: userName,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(function () {
            // Provide feedback to the user
            swal("Thought submitted successfully!");
        })
}

// event listener for the submit button
document.getElementById('share').addEventListener('click', function () {
    submitThought();
});

// Obtain the current user name
function getUserInfoFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            currentUser.get()
                .then(() => {
                    userName = user.displayName
                })
            console.log(user.uid)
        }
    })
}
