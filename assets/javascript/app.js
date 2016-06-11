var url = "https://trainhomework.firebaseio.com/";
var dataTrain = new Firebase(url);

var tName;
var destination;
var frequency;
var firstTime;

//======================================

function addTrain() {
    $("#addTrain").on('click', function() {
        var time = $("#time-input").val().trim().split(":");
        var hours = time[0];
        var minutes = time[1];
        tName = $("#tName-input").val().trim();
        destination = $("#destination-input").val().trim();
        frequency = $("#frequency-input").val().trim();
        firstTime = moment({
            hours: hours,
            minutes: minutes
        }).format("hh:mm");
        dataTrain.push({
            trainName: tName,
            destination: destination,
            frequency: frequency,
            firstTime: firstTime,
            dateAdded: Firebase.ServerValue.TIMESTAMP
        })
        $(".form-control").val("");
        return false;
    })
}

function myTime(frequency, firstTime) {

    var difference = moment().diff(moment(firstTime, "hh:mm"), "minutes");
    var x = difference % frequency;
    var minutesAway = frequency - x;
    var nextArrival = moment().add(minutesAway, "minutes");

    return {
        next: nextArrival.format("hh:mm"),
        away: minutesAway,
    };

}
//=======================================




//=======================================

$(document).ready(function() {
    var newTime = {};
    addTrain();
    dataTrain.on("child_added", function(childSnapshot) {
        var tName = childSnapshot.val().trainName;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency;
        var firstTime = childSnapshot.val().firstTime;

        newTime = myTime(frequency, firstTime);

        $("#trainTable > tbody").append('<tr><td>' +
            tName + '</td><td>' +
            destination + '</td><td>' +
            frequency + '</td><td data-first-time=' + firstTime + '>' +
            newTime.next + '</td><td>' +
            newTime.away + '</td></tr>');



    });
});