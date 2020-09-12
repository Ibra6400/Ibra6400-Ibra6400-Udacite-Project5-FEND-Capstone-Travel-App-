// geonamesURL and personal key for  geonames API
const geonamesURL = "http://api.geonames.org/searchJSON?q=";
const userName = "&username=ibra6400";

function handleSubmit(event) {
  event.preventDefault();
    let city = document.getElementById("city").value;
  let departingDate = document.getElementById("departingDate").value;
  let returnDate = document.getElementById("returnDate").value;
  // check the user input
  if (city == "" || departingDate == "" || returnDate == "") {
    alert("Location, Departing or Return dates should be enterned");
    return;
  }
  // Additional Feature

  // Add end date and display length of trip.
  //calculate the length of trip current day and departing day
  const countdown = () => {
    //convert days in milliseconds

    const departing_Date = new Date(departingDate).getTime();
    const returnt_Date = new Date(returnDate).getTime();
    const timesDiff = Math.abs(returnt_Date - departing_Date);
    const DateDiff = Math.ceil(timesDiff / (1000 * 3600 * 24));
    return DateDiff;
  };
  //store countdown functioin
  const tripLength = countdown();
  
  pullData(geonamesURL + city + userName + "&maxRows=1").then(function (data) {
    // console.log(data);
    //Add data
    postData("http://localhost:8081/add", {
      location: data.geonames[0].name,
      latitude: data.geonames[0].lat,
      longitude: data.geonames[0].lng,
      countryName: data.geonames[0].countryName,
      date: date,
      duration: tripLength,
    }).then(() => {
      //post data to the end user
      updateUI();
    });
  });
}
//Helper functions to pull Data.
const pullData = async (url = "") => {
  const response = await fetch(url);

  try {
    const data = response.json();
    return data;
  } catch (err) {
    alert(err);
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
    ).innerHTML = `Trip Length: ${allData[0].duration} `;
  } catch (error) {
    console.log("error", error);
  }
};

export { handleSubmit, postData };
