/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
      document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
};

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
};
///End of sidebar


// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDqGyKa7lIqnwaOk_oa83xXebTOC40Cbq4",
    authDomain: "trainschedule-c04fd.firebaseapp.com",
    databaseURL: "https://trainschedule-c04fd.firebaseio.com",
    projectId: "trainschedule-c04fd",
    storageBucket: "trainschedule-c04fd.appspot.com",
    messagingSenderId: "747142750622"
  };
  firebase.initializeApp(config);

var trainData = firebase.database();


$("#add-train-btn").on("click", function() {

  // User input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  // Temp object for train data
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // Uploads train data to bd
  trainData.ref().push(newTrain);

  // console log
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
  return false;
});

//Firebase event to add train to db

trainData.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

// Store into var
  var timeName = childSnapshot.val().name;
  var timeDestination = childSnapshot.val().destination;
  var timeFrequency = childSnapshot.val().frequency;
  var tFirstTrain = childSnapshot.val().firstTrain;

  var timeArr = tFirstTrain.split(":");
  var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
  var maxMoment = moment.max(moment(), trainTime);
  var timeMinutes;
  var timeArrival;

  // If the first train is later than the current time, sent arrival to the first train time
  if (maxMoment === trainTime) {
    timeArrival = trainTime.format("hh:mm A");
    timeMinutes = trainTime.diff(moment(), "minutes");
  } else {

    var deltaTimes = moment().diff(trainTime, "minutes");
    var timeRemaining = deltaTimes % timeFrequency;
    timeMinutes = timeFrequency - timeRemaining;
    //Arrival time to current time
    timeArrival = moment().add(timeMinutes, "m").format("hh:mm A");
  }
  console.log("timeMinutes:", timeMinutes);
  console.log("timeArrival:", timeArrival);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + timeName + "</td><td>" + timeDestination + "</td><td>" +
          timeFrequency + "</td><td>" + timeArrival + "</td><td>" + timeMinutes + "</td></tr>");


  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(firstTrain),
    $("<td>").text(timeArrival),
    $("<td>").text(timeMinutes),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);

});
