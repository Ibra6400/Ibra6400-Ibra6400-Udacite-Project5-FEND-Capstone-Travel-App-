import { handleSubmit, postData } from "../client/js/formHandler";
const fetch = require("node-fetch");

describe("Testing the handleSubmit() is defined ", () => {
  test("It should be  exisit", async () => {
    expect(handleSubmit).toBeDefined();
  });
});

describe("Testing the postData() functionality", () => {
  test("It should be exisit ", async () => {
    expect(postData).toBeDefined();
  });
});

describe("Testing the handleSubmit() functionality", () => {
  test("It should be functionality ", async () => {
    expect(handleSubmit).toBeInstanceOf(Function);
  });
});

describe("Testing the postData() functionality", () => {
  test("It should be functionality ", async () => {
    expect(postData).toBeInstanceOf(Function);
  });
});

describe("Test geonames API", () => {
  test("It should be defined", async () => {
    const geonamesURL = "http://api.geonames.org/searchJSON?q=";
    const userName = "&username=ibra6400";
    const city = "London";
    const response = await fetch(geonamesURL + userName + city);
    expect(response).toBeDefined();
    console.log(response);
  });
});
