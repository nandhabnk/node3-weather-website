console.log("Client side JS file is loaded");

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const getWeatherData = async (address) => {
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  const response = await fetch(
    `http://localhost:3000/weather?address=${address}`
  );
  const data = await response.json();
  if (data.error) {
    messageOne.textContent = data.error;
    messageTwo.textContent = "";
  } else {
    messageOne.textContent = data.forecastData.location;
    messageTwo.textContent = data.forecastData.weather;
  }
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherData(searchElement.value);
});
