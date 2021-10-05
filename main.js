/*
 * This files holds all the code for Final
 */

//Run once broswer has loaded everything
window.onload = function () {

 //Function that adds new Divs to the HTML page
 function addHTML(text)
{
  //Grab the container div
  var start_div = document.getElementById('start');
  //make a new Div element
  var newElement = document.createElement('div');
  //add text to that div
  newElement.innerHTML = text;
  //append it to the main 
  start_div.appendChild(newElement);
}

//gran the current form in the HTML document
var form = document.querySelector("form");

//event that listens for form submit
form.addEventListener("submit", function(event) {
  var search_text = form.elements.value.value;
  
  console.log("Saving value", search_text);
  
  //get main DIV
  var start_div = document.getElementById('start');
 
  //Clear main DIV
  start_div.innerHTML = '';

  addHTML("Final App Woohoo");

  
  //uncomment these lines to run your code here
  
  event.preventDefault();
});

};
