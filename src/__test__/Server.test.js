const app = require("../server/index");
const req = require("supertest");
const dotenv = require("dotenv");
dotenv.config();
const fetch = require("node-fetch");

describe("Home page should be loaded", () => {
  test("the responed should be successfully ", async () => {
    const res = await req(app).get("/");
    expect(res.statusCode).toBe(200);
  });
});

describe("Route /all should be running", () => {
  test("the responed should be successfully", async () => {
    const res = await req(app).get("/all");
    expect(res.statusCode).toBe(200);
  });
});

describe("Test Weatherbi API", () => {
  test("It should be defined", async () => {
    const WeatherbitAPI = "7e80dfbccd044415b706155a9d58c0af";
    const WeatherbiURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
    const lat = 45.46427;
    const long = 9.18951;

    const city = "London";
    const response = await fetch(
      WeatherbiURL + "lat=" + lat + "&lon=" + long + "&key=" + WeatherbitAPI
    );
    expect(response).toBeDefined();
    console.log(response);
  });
});

describe("Test Weatherbi API", () => {
  test("It should be defined", async () => {
    const pixabayKEY = "18188680-f0aeacaeef1d75970f6967ec0";
    const pixabayURL = "https://pixabay.com/api/?";
    const location = "London";
    const response = await fetch(
      pixabayURL +
        "key=" +
        pixabayKEY +
        "&q=" +
        encodeURIComponent(location) +
        "&image_type=photo" +
        "&category=places"
    );
    expect(response).toBeDefined();
    console.log(response);
  });
});
