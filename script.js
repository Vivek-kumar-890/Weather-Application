const apiKey = "da96d4c8c62f49e2aa7161201252905"; 

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const temp = data.current.temp_c;
    const desc = data.current.condition.text;
    const icon = data.current.condition.icon;
    const feelsLike = data.current.feelslike_c;
    const wind = data.current.wind_kph;
    const humidity = data.current.humidity;

    resultDiv.innerHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <img src="https:${icon}" alt="${desc}" />
      <p><strong>Temperature:</strong> ${temp}°C</p>
      <p><strong>Feels Like:</strong> ${feelsLike}°C</p>
      <p><strong>Condition:</strong> ${desc}</p>
      <p><strong>Humidity:</strong> ${humidity}%</p>
      <p><strong>Wind Speed:</strong> ${wind} km/h</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

