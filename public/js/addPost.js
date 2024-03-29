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

const thoughtCollection = db.collection('thoughts');
const storage = firebase.storage();
// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();

    // Get form values
    const thoughtText = document.getElementById('thought').value;
    const postImage = document.getElementById('postImage').files[0];

    // Validation checks 
    if (thoughtText === '') {
        Swal.fire("Oops!", "Hey, you forgot to share your happy thought! Let's fill it in.", "warning");
        return;
    } else if (thoughtText.length > 300) {
        Swal.fire("Whoa, slow down!", "Your happy thought is amazing, but let's keep it short and sweet, 300 characters or less.", "error");
        return;
    }

    // Prepare data object
    var data = {
        image: "https://loremflickr.com/640/360",
        text: thoughtText,
        default: 1,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    // If an image is uploaded, upload it to storage and add its URL to data
    if (postImage) {
        console.log('goes into if')
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child('images/' + postImage.name);

        // Upload image to Firebase Storage
        imageRef.put(postImage).then(function (snapshot) {
            console.log('Uploaded a blob or file!');
            // Get download URL of the image
            imageRef.getDownloadURL().then(function (url) {
                // Add image URL to data

                // Add data to Firestore
                var data = {
                    image: url,
                    text: thoughtText,
                    default: 0,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                };
                data.image = url;
                addThoughtToFirestore(data);
            });
        });

    } else {
        // If no image is uploaded, directly add data to Firestore
        addThoughtToFirestore(data);
    }
}

// Function to add data to Firestore
function addThoughtToFirestore(data) {
    thoughtCollection.add(data)
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            // Provide feedback to the user
            Swal.fire("Thought submitted successfully!");
            // Reset form after successful submission
            document.getElementById('thoughtForm').reset();
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

$(document).ready(getUserInfoFromAuth);
// Event listener for form submission
document.getElementById('thoughtForm').addEventListener('submit', handleSubmit);
