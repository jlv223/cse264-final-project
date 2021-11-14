/*
 * This files holds all the code to test you REST API
 */

//Run once broswer has loaded everything
window.onload = function () {



// Button send POST to /films creating
// a film with title "Deadpool"
// with body "Marvel's anti-hero"
document.getElementById("create1")
.addEventListener("click",function(e){
  fetch('/films',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: "Deadpool",
      body: "Marvel's anti-hero"
    })
  }
);
},false);

// Button send POST to /films creating
// a film with title "Forrest Gump"
// with body "Run Forrest, run!"
document.getElementById("create2")
.addEventListener("click",function(e){
  fetch('/films',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: "Forrest Gump",
      body: "Run Forrest, run!"
    })
  }
);
},false);

// Gets all the films
document.getElementById("read")
.addEventListener("click",function(e){
    fetch('/films');
},false);

// Gets filmID 2
document.getElementById("read2")
.addEventListener("click",function(e){
    fetch('/films/2');
},false);

// PUT request for filmID = 2
document.getElementById("update")
.addEventListener("click",function(e){
  fetch('/films/2',{
    method: 'PUT',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: "The Avengers",
      body: "Assemble!"
    })
  }
  );
},false);

// Update film at filmID = 2
document.getElementById("update2")
.addEventListener("click",function(e){
  fetch('/films/2',{
    method: 'PUT',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: "The Avengers 2",
      body: "Assemble again!"
    })
  }
  );
},false);

// Delete film 2
document.getElementById("destroy")
.addEventListener("click",function(e){
  // Fetch for a DELETE request at the username "name"
  fetch('/films/2',{
      method: 'DELETE'
    }
  );
},false);

// Button send POST to /films/0/reviews creating
// a review
document.getElementById("create3")
.addEventListener("click",function(e){
  fetch('/films/0/reviews',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: "Shmeadpool",
      body: "Terrible movie!"
    })
  }
);
},false);

// Grab reviews on /films/0/reviews
document.getElementById("read3")
.addEventListener("click",function(e){
    fetch('/films/0/reviews');
},false);

// Grab reviews on /films/0/reviews/0
document.getElementById("read4")
.addEventListener("click",function(e){
    fetch('/films/0/reviews/0');
},false);

// PUT request of review at filmID = 0, reviewID = 0
document.getElementById("update3")
.addEventListener("click",function(e){
  fetch('/films/0/reviews/0',{
    method: 'PUT',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: "Greatpool!",
      body: "Do another!"
    })
  }
  );
},false);

// PUT request of review at filmID = 0, reviewID = 1
document.getElementById("update4")
.addEventListener("click",function(e){
  fetch('/films/0/reviews/1',{
    method: 'PUT',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: "Well",
      body: "They did another!"
    })
  }
  );
},false);

// Delete review at filmID = 0, reviewID = 0
document.getElementById("destroy2")
.addEventListener("click",function(e){
  // Fetch for a DELETE request at the username "name"
  fetch('/films/0/reviews/0',{
      method: 'DELETE'
    }
  );
},false);

// Grab reviews on /films?search=Deadpool
document.getElementById("read5")
.addEventListener("click",function(e){
    fetch('/films?search=Deadpool');
},false);

// Grab reviews on /films/0/reviews?search=another
document.getElementById("read6")
.addEventListener("click",function(e){
    fetch('/films/0/reviews?search=another');
},false);

};
