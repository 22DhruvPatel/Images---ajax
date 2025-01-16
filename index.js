/* Author: Dhruv Patel- 000919050 */

// Functionality for the first button
var firstButton = document.getElementById("first");

function buttonHandler() {
  firstButton.removeEventListener("click", buttonHandler); // Remove event listener to prevent multiple clicks
  let url = "https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php";
  fetch(url)
    .then((response) => response.text())
    .then((text) => {
      var h1 = document.createElement("h1");
      h1.innerHTML = text + "- My AJAX Assignment- Sutdent #000919050"; // Insert response text with student ID into h1 tag
      h1.style.color = "blue";
      document.getElementById("number").appendChild(h1); // Append h1 to container
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
firstButton.addEventListener("click", buttonHandler);

// Functionality for the second button
var secondButton = document.getElementById("second");

secondButton.addEventListener("click", function () {
  let conference = document.querySelector('input[name="conference"]:checked').value;
  let url = "https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php?choice=" + conference;
  console.log(url);

  fetch(url, { credentials: "include" })
    .then((response) => response.json())
    .then(success);

  function success(a) {
    let image = document.getElementById("image");
    image.style.display = "flex";
    image.style.flexWrap = "wrap";
    image.style.justifyContent = "center";
    image.innerHTML = "";

    // Dynamically create elements for each item in the response
    a.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.style.width = `${100 / a.length}%`;
      itemDiv.style.padding = "10px";

      const h2 = document.createElement("h2");
      h2.textContent = item.series;
      itemDiv.appendChild(h2);

      const image1 = document.createElement("img");
      image1.src = item.url;
      image1.style.maxWidth = "100%";
      image1.style.height = "300px";
      itemDiv.appendChild(image1);

      const p = document.createElement("p");
      p.textContent = item.name;
      itemDiv.appendChild(p);

      image.appendChild(itemDiv);
    });
  }
});

// Functionality for the third button
var thirdButton = document.getElementById("third");

thirdButton.addEventListener("click", function (event) {
  let conference = document.querySelector('input[name="conference"]:checked').value;
  let url = "https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php?choice=" + conference;
  console.log(url);

  let choice = "conference=" + conference;
  fetch(url, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: choice,
  })
    .then((response) => response.json())
    .then(success);

  function success(a) {
    let target = document.getElementById("target");
    let data = '<thead id="targethead" class="thead-light"><tr><th>Series</th><th>Name</th><th>Link</th></tr></thead>';

    // Iterate through response data and create table rows
    for (let i = 0; i < a.length; i++) {
      let row = "<td>" + a[i].series + "</td>" + "<td>" + a[i].name + "</td>" + "<td>" + "<a href = '" + a[i].url + "'>" + a[i].url + "</a>" + "</td>";
      data += "<tr>" + row + "</tr>";
    }
    target.innerHTML = data; // Insert table data into target element
  }
});
