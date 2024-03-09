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

// Submit a review
function submitReview() {
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
            swal("Review submitted successfully!");
        })
}

// event listener for the submit button
document.getElementById('submit').addEventListener('click', function () {
    submitReview();
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
        }
    })
}


