// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDqGyKa7lIqnwaOk_oa83xXebTOC40Cbq4",
    authDomain: "trainschedule-c04fd.firebaseapp.com",
    databaseURL: "https://trainschedule-c04fd.firebaseio.com",
    projectId: "trainschedule-c04fd",
    storageBucket: "",
    messagingSenderId: "747142750622"
  };
  firebase.initializeApp(config);

$(document).ready(function(){
	// 1. Link to Firebase
	var trainData = new Firebase("https://train-database.firebaseio.com/");

// var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrainTime = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    dest: destination,
    firt: firstTrainTime,
    freq: frequency
  };

  // Uploads train data to the database
  trainData.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.first);
  console.log(newTrain.freq);

  alert("Trains successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firstTrainTime-input").val("");
  $("#frequency-input").val("");
  
  // Prevents page from refreshing
		return false;
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
trainData.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrainTime = childSnapshot.val().first;
  var frequency = childSnapshot.val().freq;

  // train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  // assign firebase variables to snapshots.
  var firebaseName = childSnapshot.val().name;
  var firebaseDestination = childSnapshot.val().destination;
  var firebasefirstTrainTime = childSnapshot.val().firstTrainTime;
  var firebaseFrequency = childSnapshot.val().frequency;
  
  var diffTime = moment().diff(moment.unix(firstTrainTime), "minutes");
  var timeRemainder = moment().diff(moment.unix(firstTrainTime), "minutes") % firebaseFrequency ;
  var minutes = firebaseFrequency - timeRemainder;

  var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
  
  // Test for correct times and info
  console.log(minutes);
  console.log(nextTrainArrival);
  console.log(moment().format("hh:mm A"));
  console.log(nextTrainArrival);
  console.log(moment().format("X")); 


// Append train info to table on page
		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseLine + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");


  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(firstTrainTime),
    $("<td>").text(nextTrainArrival),
    $("<td>").text(minutes),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);

});
});

