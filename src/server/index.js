var path = require("path");
// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// const mockAPIResponse = require('./mockAPI.js')

const dotenv = require("dotenv");
dotenv.config();

const fetch = require("node-fetch");

// API key and url.
const WeatherbitAPI = process.env.WeatherbitAPI;
const WeatherbiURL = "https://api.weatherbit.io/v2.0/forecast/daily?";

const pixabayKEY = process.env.pixabayKEY;
const pixabayURL = "https://pixabay.com/api/?";

// console.log(`Your API key is ${process.env.WeatherbitAPI}`);
// console.log(`Your API key is ${process.env.pixabayKEY}`);

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("Example app listening on port 8081!");
});

// Setup empty JS object to act as endpoint for all routes
const projectData = [];

//Initialize all route
app.get("/all", function (req, res) {
  res.send(projectData);
});

//Post Route
// Setup empty to store all data
let data = {};
app.post("/add", addData);

function addData(req, res) {
  console.log(req.body);

  data.location = req.body.location;
  data.countryName = req.body.countryName;
  data.latitude = req.body.latitude;
  data.longitude = req.body.longitude;
  data.date = req.body.date;
  data.duration = req.body.duration;
  // store variable to get information from WeatherbitAPI and pixabay APIs
  const lat = data.latitude;
  const lon = data.longitude;
  const location = data.location;

  //represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
  const promise_weather = new Promise((resolutionFunc, rejectionFunc) => {
    getWeather(lat, lon).then(function (res) {
      resolutionFunc(res);
    });
  });

  const promise_photo = new Promise((resolutionFunc, rejectionFunc) => {
    getpixabay(location).then(function (res) {
      resolutionFunc(res);
    });
  });
  //Promise.all() method takes promise_weather and promise_photo as an input, and returns a single Promise that resolves to an array of the results of the input promises
  Promise.all([promise_weather, promise_photo]).then(function (allData) {
    const weatherData = allData[0];
    const photoData = allData[1];
    // WehterAPI is only return 16 days from current day
    data.datetime = weatherData.data[1].datetime;
    if (data.date == data.datetime) {
      data.low_temp = weatherData.data[1].low_temp;
      data.max_temp = weatherData.data[1].max_temp;
      data.description = weatherData.data[0].weather.description;
    } else if (data.duration <= 16 && data.date != data.datetime) {
      data.low_temp = weatherData.data[data.duration].low_temp;
      data.max_temp = weatherData.data[data.duration].max_temp;
      data.description = weatherData.data[data.duration].weather.description;
    } else {
      console.log(
        "the different betwen today and your Departing day should be less than 16 days to get the weather"
      );
    }

    if (photoData.totalHits <= 0) {
      data.imageUrl = "";
    } else {
      const random = Math.floor(Math.random() * photoData.hits.length);
      data.imageUrl = photoData.hits[random].webformatURL;
    }
    // push all data to the projectData obj
    projectData.push(data);
    res.send({
      messsage: "the data is added",
      success: true,
    });
  });
}

// Fetch Weatherbi to get wheather data
const getWeather = async (lat, lon) => {
  const requestURL =
    WeatherbiURL + "lat=" + lat + "&lon=" + lon + "&key=" + WeatherbitAPI;
  const res = await fetch(requestURL);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// Fetch pixabay to get location photo data
const getpixabay = async (loc) => {
  const requestURL =
    pixabayURL +
    "key=" +
    pixabayKEY +
    "&q=" +
    encodeURIComponent(loc) +
    "&image_type=photo" +
    "&category=places";

  const res = await fetch(requestURL);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = app;
