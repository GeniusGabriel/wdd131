// Footer: Set current year and last modified date
const currentYearSpan = document.querySelector("#current-year");
const lastModifiedSpan = document.querySelector("#last-modified");

if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedSpan) {
    lastModifiedSpan.textContent = `Last Modification: ${document.lastModified}`;
}

// In scripts/place.js:
const temperature = 27; // Match what is visible on your card
const windSpeed = 12;

const calculateWindChill = (temp, speed) =>
    (13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(1);

const windChillElement = document.querySelector("#wind-chill");

if (windChillElement) {
    // Must be <= 10 °C to calculate
    if (temperature <= 10 && windSpeed > 4.8) {
        windChillElement.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
    } else {
        windChillElement.textContent = "N/A"; // At 27°C, this should be "N/A"
    }
}