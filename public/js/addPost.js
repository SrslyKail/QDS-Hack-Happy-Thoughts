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


$(document).ready(function () {
    ajaxGET("/navbar", function (data) {
        document.getElementById("navbarPlaceholder").innerHTML = data;
    });
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
$("#thoughtForm").submit(function (event) {
    event.preventDefault();
    submitThought();
});

// Submit a thought
function submitThought() {
    var thought = $("#thought").val();
    console.log('Submitted:', thought);
    db.collection("thoughts").add({
        image: "https://firebasestorage.googleapis.com/v0/b/hack-happy-thoughts.appspot.com/o/images%2Ffff.png?alt=media&token=a7e13e0d-6079-470f-97fc-e6366e8c1bc6", // place holder for a url
        text: thought,
        // user: userName,  // not sure why i cannot include userName at the moment
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(function (docRef) {
            console.log("Thought submitted with ID: ", docRef.id);
            // Reset form after submission
            $("#thought").val('');
            // Provide feedback to the user
            //     swal("Thought submitted successfully!");
        })
        .catch(function (error) {
            console.error("Error adding thought: ", error);
        });
}

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

