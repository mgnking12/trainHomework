// Steps to complete:
/*
1. Create Firebase link
2. Create button for adding new employees - then update the html + update the database
3. Create a way to retrieve employees from the employee database.
4. Create a way to calculate the months worked. Using difference between start and current time. Then use moment.js formatting to set difference in months.
5. Calculate Total billed

*/
// 1. Link to Firebase
var url = "https://trainhomework.firebaseio.com/"
var trainData = new Firebase(url);

// 2. Button for adding Employees
$("#addTrainBtn").on("click", function(){

	// Grabs user input
	var trainName = $("#trainNameInput").val().trim();
	var trainDestination = $("#destinationInput").val().trim();
	var trainFirstTime = $("#firstTimeInput").val().trim();
	var trainFrequency = $("#frequencyInput").val().trim();

	// Creates local "temporary" object for holding employee data
	var newTrain = {
		name:  trainName,
		destination: trainDestination,
		firstTime: trainFirstTime,
		frequency: trainFrequency
	}

	// Uploads employee data to the database
	trainData.push(newTrain);

	// Logs everything to console
	console.log(newEmp.name);
	console.log(newEmp.destination);
	console.log(newEmp.firstTime);
	console.log(newEmp.frequency)

	// Alert
	alert("Train successfully added");

	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTimeInput").val("");
	$("#frequencyInput").val("");

	// Prevents moving to new page
	return false;
});


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry 
trainData.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var trainFirstTime = childSnapshot.val().firstTime;
	var trainFrequency = childSnapshot.val().frequency;

	// Employee Info
	console.log(trainName);
	console.log(trainDestination);
	console.log(trainFirstTime);
	console.log(trainFrequency);

	// Prettify the employee start
	//var trainFirstTimePretty = moment.unix(trainFirstTime).format("LLLL");

	// Calculate the months worked using hardcore math
	// To calculate the months worked
	//var empMonths = moment().diff(moment.unix(empStart, 'X'), "months");
	//console.log(empMonths);

	// Calculate the total billed rate
	//var empBilled = empMonths * empRate;
	//console.log(empBilled);

	// Add each train's data into the table
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td> " + trainFrequency + "</td><td> + Next Arrival + </td><td> + Minutes Away + </td></tr>");

});


// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case