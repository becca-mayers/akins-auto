// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();
//  course section owl carousel


// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        }
    }
});

// Contact Form
var fields =  {}
document.addEventListener("DOMContentLoaded", function() {
 fields.FullName = document.getElementById('FullName');
 fields.Email = document.getElementById('Email');
 fields.PhoneNumber = document.getElementById('PhoneNumber');
 fields.Message = document.getElementById('Message');
 })

//isNotEmpty
function isNotEmpty(value) {
 if (value == null || typeof value == 'undefined' ) return false;
 return (value.length > 0);
}

//isNumber
function isNumber(num) {
 return (num.length > 0) && !isNaN(num);
}

//isEmail
function isEmail(email) {
 let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
 return regex.test(String(email).toLowerCase());
}

function fieldValidation(field, validationFunction) {
 if (field == null) return false;

 let isFieldValid = validationFunction(field.value)
 if (!isFieldValid) {
 field.className = 'placeholderRed';
 } else {
 field.className = '';
 }

 return isFieldValid;
}

//isValid
function isValid() {
 var valid = true;
 
 valid &= fieldValidation(fields.firstName, isNotEmpty);
 valid &= fieldValidation(fields.lastName, isNotEmpty);
 valid &= fieldValidation(fields.gender, isNotEmpty);
 valid &= fieldValidation(fields.address, isNotEmpty);
 valid &= fieldValidation(fields.country, isNotEmpty);
 valid &= fieldValidation(fields.email, isEmail);
 valid &= fieldValidation(fields.houseNumber, isNumber);
 valid &= fieldValidation(fields.password, isPasswordValid);
 valid &= fieldValidation(fields.passwordCheck, isPasswordValid);
 valid &= fieldValidation(fields.question, isNotEmpty);
 valid &= arePasswordsEqual();

 return valid;
}

//User Class
class User {
 constructor(firstName, lastName, gender, address, country, email, newsletter, question) {
 this.firstName = firstName;
 this.lastName = lastName;
 this.gender = gender;
 this.address = address;
 this.country = country;
 this.email = email;
 this.newsletter = newsletter;
 this.question = question;
 }
}

//Send Contact
function sendContact() {
 if (isValid()) {
     let usr = new User(fields.FullName.value, fields.Email.value, fields.PhoneNumber.value, fields.Message.value);
     
     alert('${usr.FullName}, thank you for registering.')
     
  } else {
    alert('Error in sending. Please try again later.')
    }
  }
  

/** google_map js
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(33.27911408293202, -96.98808430071257),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}
**/

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function myMap() {
  const map = new google.maps.Map(document.getElementById("googleMap"), {
    center: { lat: 33.27911408293202, lng: -96.98808430071257 },
    zoom: 15,
  });
  const request = {
    placeId: "ChIJ1U5QAplJTIYR77nybNSwOLk",
    fields: ["name", "formatted_address", "place_id", "geometry"],
  };
  const infowindow = new google.maps.InfoWindow();
  const service = new google.maps.places.PlacesService(map);

  service.getDetails(request, (place, status) => {
    if (
      status === google.maps.places.PlacesServiceStatus.OK &&
      place &&
      place.geometry &&
      place.geometry.location
    ) {
      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
      });

      google.maps.event.addListener(marker, "click", () => {
        const content = document.createElement("div");
        const nameElement = document.createElement("h2");

        nameElement.textContent = place.name;
        content.appendChild(nameElement);

        const placeIdElement = document.createElement("p");

        placeIdElement.textContent = place.place_id;
        content.appendChild(placeIdElement);

        const placeAddressElement = document.createElement("p");

        placeAddressElement.textContent = place.formatted_address;
        content.appendChild(placeAddressElement);
        infowindow.setContent(content);
        infowindow.open(map, marker);
      });
    }
  });
}

window.myMap = myMap;

