const form = document.querySelector("form");
const searchText = form.querySelector("input");
const submitBtn = form.querySelector(".submitBtn");

// inputs to manipulate
const errorText = document.querySelector(".error-message"),
    locationName = document.querySelector(".location-name"),
    locationTemp = document.querySelector(".location-temp"),
    locationCountry = document.querySelector(".location-country"),
    latitude = document.querySelector(".location-latitude"),
    longitude = document.querySelector(".location-longitude"),
    humidity = document.querySelector(".location-humidity"),
    timezone = document.querySelector(".location-timezone"),
    weatherDescription = document.querySelector(".location-weatherDescription"),
    uvIndex = document.querySelector(".location-uvIndex"),
    windDirection = document.querySelector(".location-windDirection"),
    windSpeed = document.querySelector(".location-windSpeed");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = searchText.value;

    fetch(`/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.err) {
                errorText.textContent = data.err;
            } else {
                //this is where you add values to elements using data ( data(app.js) = weatherData(express.js) = res.body(weather.js) )
                locationName.textContent = `Name: ${data.locationName}`;
                locationCountry.textContent = `Country: ${data.country}`;
                latitude.textContent = `Lat: ${data.latitude}`;
                longitude.textContent = `Long: ${data.longitude}`;
                humidity.textContent = `Humidity: ${data.humidity}`;
                timezone.textContent = `Timezone: ${data.timezone}`; 
                weatherDescription.textContent = `Description: ${data.weatherDescription}`;
                uvIndex.textContent = `uvIndex: ${data.uvIndex}`;
                windDirection.textContent = `Wind Direction: ${data.windDirection}`;
                windSpeed.textContent = `Wind Speed ${data.windSpeed}`;

                switch (data.unit) {
                    case (data.unit = "m"):
                        locationTemp.innerHTML = `Temp: ${data.temp}&#8451;`;
                        break;
                    case (data.unit = "f"):
                        locationTemp.innerHTML = `Temp: ${data.temp}&#8457;`;
                        break;
                }
            }
        });
    });

    form.reset();
});
