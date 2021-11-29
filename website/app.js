/* Global Variables */
const apiKey = `3b6981dd64ed3257e9b39ad46feb5f1f`;
const generateButton = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// create a function that makes a post request to the server via (/postRoute) route
const postData = async (url = "", data = {}) => {
  const res2 = await fetch("/postRoute", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// create a function that makes a get request to the server via (/results) route
const getData = async () => {
  const data = await fetch("/results");
  const newData = await data.json();
  console.log(newData);
};

// function that updates the UI using get requsest via (/results) route
const updateUI = async () => {
  const data = await fetch("/results");
  try {
    const newData = await data.json();
    document.getElementById(
      "temp"
    ).innerHTML = `Temprature now is  <strong>${newData.temp}</strong> Degrees`;
    document.getElementById(
      "date"
    ).innerHTML = `Today is <strong>${newData.date}</strong>`;
    document.getElementById(
      "content"
    ).innerHTML = `It feels <strong>${newData.feelings}</strong>`;
    document.getElementById('city').innerHTML = `You are in <strong>${newData.city}</strong>` 
  } catch (error) {
    console.log("error", error);
  }
};

// add event listener to the generate button
generateButton.addEventListener("click", async () => {
  // getting zipcode and feelings values (user inputs)
  const zipCode = document.querySelector("#zip").value;
  const feelings = document.querySelector("#feelings").value;

  try {
    // Recieving data via get request to the openWeathermap server
    const furl = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=metric`;
    const res = await fetch(furl);
    const recivedData = await res.json();
    // print recived data on the console after transforming it json data type
    console.log(recivedData);
    // calling the post request function
    postData("/postRoute", {
      temp: recivedData.main.temp,
      date: newDate,
      feelings: feelings,
      city: recivedData.name
    });
    // calling get data function
    getData();
    // calling update UI function
    updateUI();
  } catch (error) {
    console.log("erorr ", error);
  }
});
