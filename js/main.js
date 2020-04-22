const url =
  "https://randomuser.me/api/?results=12&nat=us&inc=name,picture,email,location,phone,dob";
const container = document.getElementById("container");
const popup = document.getElementById("popupBox");
let personIndex;

// Pull in random user data
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    makeEmployeeCard(data.results);
    makePopup(data.results);
  })
  .catch((error) => console.log("Something isn't right, try again.", error));

// Create html for employee card
function makeEmployeeCard(data) {
  for (i = 0; i < data.length; i++) {
    let html = `
          <div class="card" id= "${i}">
            <img class="profile-image" src= ${data[i].picture.medium} alt= ${data[i].name.first} ${data[i].name.last} />
          <div class="profile-text">
            <h3>${data[i].name.first} ${data[i].name.last}</h3>
            <p class="profile-email">${data[i].email}</p>
            <p class="profile-location">${data[i].location.city}</p>
          </div>
          </div>
          `;
    container.innerHTML += html;
  }
}

// Create html for popup card
function makePopup(data) {
  for (i = 0; i < data.length; i++) {
    let html = `
        <div class="popup-card" id= "person${i}">
            <span class="close">&times;</span>
            <img class="popup-image" src=${data[i].picture.large} alt= ${data[i].name.first} ${data[i].name.last} />
            <div class="popup-profile-text">
              <h3>${data[i].name.first} ${data[i].name.last}</h3>
              <p class="popup=email">${data[i].email}</p>
              <p class="popup-location">${data[i].location.city}</p>
            </div>
            <div class="popup-info">
              <p class="phone">${data[i].phone}</p>
              <p class="address">${data[i].location.street.number} ${data[i].location.street.name} ${data[i].location.city}, ${data[i].location.state} ${data[i].location.postcode}</p>
              <p class="birthday">Birthday: ${data[i].dob.date}</p>
            </div>
        </div>
        `;
    popup.innerHTML += html;
  }
}

//Event listener that shows popup card upon clicking card
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("card") ||
    e.target.parentElement.classList.contains("card") ||
    e.target.parentElement.parentElement.classList.contains("card")
  ) {
    if (e.target.id !== "") {
      personIndex = e.target.id;
      popup.style.display = "block";
      popup.children[personIndex].style.display = "block";
      return personIndex;
    } else if (e.target.parentElement.id !== "") {
      personIndex = e.target.parentElement.id;
      popup.style.display = "block";
      popup.children[personIndex].style.display = "block";
      return personIndex;
    } else if (e.target.parentElement.parentElement.id !== "") {
      personIndex = e.target.parentElement.parentElement.id;
      popup.style.display = "block";
      popup.children[personIndex].style.display = "block";
      return personIndex;
    }
  }
});

// Function for closing popup card
function closePopup() {
  popup.style.display = "none";
  popup.children[personIndex].style.display = "none";
}

// Event listener to close popup card
popup.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    closePopup();
  }
});

// Event listener that closes or changes popup when clicking the x or arrows
popup.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    closePopup();
  } else if (e.target === popup) {
    closePopup();
  }
});
