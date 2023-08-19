// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should use the id in the containing time-block as a key to save the user input in local storage. HINT: What does `this` reference in the click listener function? How can DOM traversal be used to get the "hour-x" id of the time-block containing the button that was clicked? How might the id be useful when saving the description in local storage?
  $('.saveBtn').click(function(event) {
    event.preventDefault();
    var description = $(this).siblings(".description").val();
    var timeBlockId = $(this).parent().attr("id");
    console.log('button clicked!')
    localStorage.setItem(timeBlockId, description);
  })

 
  // TODO: Add code to apply the past, present, or future class to each time block by comparing the id to the current hour. HINTS: How can the id attribute of each time-block be used to conditionally add or remove the past, present, and future classes? How can Day.js be used to get the current hour in 24-hour time?\
  var currentHour = dayjs().hour();
  var timeBlockElements = document.querySelectorAll(".time-block");
hourX
  for (var i = 0; i < timeBlockElements.length; i++) {
    var elementId = timeBlockElements[i].id;
    var hourX = parseInt(elementId.split("-")[1]);

    if (hourX < currentHour) {
      timeBlockElements[i].classList.add("past");
    } else if (hourX === currentHour) {
      timeBlockElements[i].classList.add("present");
    } else {
      timeBlockElements[i].classList.add("future");
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage and set the values of the corresponding textarea elements. HINT: How can the id attribute of each time-block be used to do this?
  function loadDescriptionsFromStorage() {
    var savedDescriptions = localStorage.getItem('descriptions');
    
    if (savedDescriptions) {
      savedDescriptions = JSON.parse(savedDescriptions); 
    
      $(".description").each(function() {
      var containerDivId = $(this).parent().attr("id");
      var savedDescription = savedDescriptions[containerDivId];
           $(this).val(savedDescription);
      });
    } else {
      savedDescriptions = [];
    }
    return savedDescriptions;
  }
    
function displayDescriptionsFromStorage() {
  $('.description').val(''); // remove text from time blocks
  savedDescriptions = loadDescriptionsFromStorage() // add text from local storage
}

displayDescriptionsFromStorage()

  // TODO: Add code to display the current date in the header of the page.
  // DONE: Put dayjs in a variable and used it to fill the element with id #currentDay.
  var today = dayjs();
  $("#currentDay").text(today.format("MMM D, YYYY"));
});
