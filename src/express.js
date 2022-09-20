const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocodeLocation = require("./utils/geocode");
const weatherReport = require("./utils/weather");

// Define paths for express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const app = express();
const port = process.env.PORT || 3000; 

// Set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));
app.get("", (req, res) => {
    res.render("index", {
        title: "Elements",
        creator: "David Lee",
    });
});
app.get("/weather", (req, res) => {
    !req.query.address
        ? res.send({
              err: "Please provide an address",
          })
        : geocodeLocation(
              req.query.address,
              (err, { latitude, longitude } = {}) => {
                  if (err) {
                      return res.send({ err });
                  }
                  weatherReport(latitude, longitude, (err, weatherData) => {
                      if (err) {
                          return res.send({ err });
                      }
                      res.send({
                          // name all values relevant names to each element
                          latitude,
                          longitude,
                          unit: weatherData.unit,
                          locationName: weatherData.name,
                          country: weatherData.country,
                          timezone: weatherData.timezone,
                          temp: weatherData.temp,
                          humidity: weatherData.humidity,
                          uvIndex: weatherData.uvIndex,
                          weatherIcon: weatherData.weatherIcon,
                          weatherDescription: weatherData.weatherDescription,
                          windDirection: weatherData.windDirection,
                          windSpeed: weatherData.windSpeed
                      });
                  });
              }
          );
});

app.get("*", (req, res) => {
    res.render("404", {
        message: "You seem to be in the wrong place",
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
