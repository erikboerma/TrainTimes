setInterval(() => {
    var currentTime = moment().format('hh:mm');
    $("#currentTime").html(currentTime);
}, 1000);





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
    var name = childSnapshot.val().name;
    var dest = childSnapshot.val().destination;
    var freq = childSnapshot.val().firstTrain;
    var first = childSnapshot.val().frequency;



    var timeTill = first.split(":");
    var trainTime = moment()
        .hours(timeTill[0])
        .minutes(timeTill[1]);

    var maxMoment = moment.max(moment(), trainTime);
    var minsAway;
    var arrival;

    if (maxMoment === trainTime) {
        arrival = trainTime.format("hh:mm A");
        minsAway = trainTime.diff(moment(), "minutes");
    } else {

        var differenceTimes = moment().diff(trainTime, "minutes");
        var tRemainder = differenceTimes % freq;
        minsAway = freq - tRemainder;

        arrival = moment()
            .add(minsAway, "m")
            .format("hh:mm A");
    }




    $("#train-schedule> tbody").append(
        $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(dest),
            $("<td>").text(freq),
            $("<td>").text(arrival),
            $("<td>").text(minsAway)
        )
    );
});

