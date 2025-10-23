// OpenWeather API Key (Replace with your regenerated key before public deployment)
const API_KEY = "a9eb6b8215cb14f345d6f0942b4ff20c";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");
  
  if (!city) {
    resultDiv.innerHTML = `<p class="error">⚠️ Please enter a city name.</p>`;
    resultDiv.classList.add("show");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message === "city not found" ? "City not found" : "Failed to fetch");
    }

    const data = await response.json();

    // Weather icon mapping
    const iconMap = {
      "01d": "☀️", "01n": "🌙",
      "02d": "⛅", "02n": "☁️",
      "03d": "☁️", "03n": "☁️",
      "04d": "☁️", "04n": "☁️",
      "09d": "🌧️", "09n": "🌧️",
      "10d": "🌦️", "10n": "🌧️",
      "11d": "⛈️", "11n": "⛈️",
      "13d": "❄️", "13n": "❄️",
      "50d": "🌫️", "50n": "🌫️"
    };

    const icon = iconMap[data.weather[0].icon] || "🌤️";

    resultDiv.innerHTML = `
      <div class="weather-icon">${icon}</div>
      <h2>${data.name}, ${data.sys.country}</h2>
      <p style="font-size: 2.8rem; margin: 12px 0; font-weight: 700;">${Math.round(data.main.temp)}°C</p>
      <p style="text-transform: capitalize;">${data.weather[0].description}</p>
      <p>Feels like: ${Math.round(data.main.feels_like)}°C</p>
      <p>Humidity: ${data.main.humidity}% • Pressure: ${data.main.pressure} hPa</p>
    `;

    // Trigger fade-in animation
    resultDiv.classList.remove("show");
    void resultDiv.offsetWidth;
    resultDiv.classList.add("show");

  } catch (error) {
    resultDiv.innerHTML = `<p class="error">❌ ${error.message || "Unable to fetch weather"}</p>`;
    resultDiv.classList.add("show");
  }
}

// Allow Enter key to submit
document.getElementById("cityInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") getWeather();
});
