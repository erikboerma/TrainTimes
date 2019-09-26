var firebaseConfig = {
    apiKey: "AIzaSyATmp3DDnTHYyMdV58efeWPmRk15_snISY",
    authDomain: "traintimes-4be9d.firebaseapp.com",
    databaseURL: "https://traintimes-4be9d.firebaseio.com",
    projectId: "traintimes-4be9d",
    storageBucket: "",
    messagingSenderId: "569603803376",
    appId: "1:569603803376:web:cd460b12473c934f579a35"
};



firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    // need to add moment to first train time
    var firstTrainTime = $("#firstTrain-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        destination: trainDest,
        firstTrain: firstTrainTime,
        frequency: trainFreq
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrain;
    var trainFreq = childSnapshot.val().frequency;

    var newTrain = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td>").text(firstTrainTime),
        // $("<td>").text(minsAway)
    );

    $("#train-schedule> tbody").append(newTrain);
});

var currentTime = moment().format('LT');
$("#currentTime").text(currentTime);
console.log(currentTime);

// add current time to the page, update CSS formatting, add math for time till train.