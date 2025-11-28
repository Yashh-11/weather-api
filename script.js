document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const API_KEY = "9c9ad430b5b5e3fc27b1c46b05fc9718";

  getWeatherBtn.addEventListener("click", async () => {
    const enteredCity = cityInput.value.trim();
    if (!enteredCity) return;

    try {
      const receivedData = await fetchWeatherData(enteredCity);
      if (!receivedData || receivedData.cod === "404") {
        showError();
        weatherInfo.classList.add("hidden");
        return;
      }
      displayWeatherData(receivedData);
    } catch (error) {
      console.log("Error Fetching Data");
    }
  });

  cityInput.addEventListener("input", () => {
    if (!cityInput.value.trim()) {
      errorMessage.classList.add("hidden");
      weatherInfo.classList.add("hidden");
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) return;
    const actualFetchedData = await response.json();
    return actualFetchedData;
  }

  function displayWeatherData(data) {
    console.log("Full API response:", data);
    const { main, name, weather } = data;
    cityName.textContent = name;
    temperature.textContent = `Temperature: ${main.temp}`;
    description.textContent = `Weather: ${weather[0].description}`;
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    errorMessage.classList.remove("hidden");
  }
});
