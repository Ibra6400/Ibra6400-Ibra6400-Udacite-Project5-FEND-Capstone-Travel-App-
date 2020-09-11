// geonamesURL and personal key for  geonames API
const geonamesURL = "http://api.geonames.org/searchJSON?q=";
const userName = "&username=ibra6400";

function handleSubmit(event) {
  event.preventDefault();
  let city = document.getElementById("city").value;
  let date = document.getElementById("date").value;
  // check the user input
  if (city == "" || date == "") {
    alert("Location or Departing date should be enterned");
    return;
  }
  // Get duration
  //convert days in milliseconds
  const currentDay = new Date().getTime();
  const departingDay = new Date(date).getTime();

  // calculate the duraion (Dur) between current day and departing day
  let timesDur = Math.abs(departingDay - currentDay);
  let DurDays = Math.ceil(timesDur / (1000 * 3600 * 24));

  //get data from geonames API
  getData(geonamesURL, city, userName).then(function (data) {
    // console.log(data);
    //Add data
    postData("http://localhost:8081/add", {
      location: data.geonames[0].name,
      latitude: data.geonames[0].lat,
      longitude: data.geonames[0].lng,
      countryName: data.geonames[0].countryName,
      date: date,
      duration: DurDays,
    }).then(() => {
      //post data to the end user
      updateUI();
    });
  });
}
//fetch geonames to get and post data
const getData = async (url, city, userName) => {
  const res = await fetch(url + city + userName + "&maxRows=1");
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
//fetch to post data to the server
const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
//Get data from the server
const updateUI = async () => {
  const request = await fetch("http://localhost:8081/all");
  try {
    const allData = await request.json();

    console.log(allData);

    const trip_information = document.querySelector(".trip-informtion-box");
    trip_information.classList.remove("unactive");

    const wether = `High - ${allData[0].max_temp}, Low - ${allData[0].low_temp}`;
    document.querySelector(".city-image").src = allData[0].imageUrl;
    document.getElementById(
      "trip-to"
    ).innerHTML = `Trip To: ${allData[0].location}, ${allData[0].countryName}`;
    document.getElementById(
      "departing"
    ).innerHTML = `Departing:${allData[0].date}`;
    document.getElementById("Temp").innerHTML = wether;
    document.getElementById(
      "duration"
    ).innerHTML = `${allData[0].location}, ${allData[0].countryName} is ${allData[0].duration}  days away `;
  } catch (error) {
    console.log("error", error);
  }
};

export { handleSubmit, postData };
