// script.js

// Helper function to format numbers to a maximum of two decimal places without trailing zeros
function formatNumber(num, decimals) {
    return parseFloat(num.toFixed(decimals));
}

// Conversion Logic
document.getElementById('convertBtn').addEventListener('click', performConversion);

// Trigger conversion on Enter key press in the input field
document.getElementById('inputValue').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performConversion();
    }
});

// Function to perform the conversion
function performConversion() {
    const inputValue = parseFloat(document.getElementById('inputValue').value);
    const inputUnit = document.getElementById('inputUnit').value;

    if (isNaN(inputValue)) {
        alert("Please enter a valid number.");
        return;
    }

    // Constants
    const densityLiquidHydrogen = 70.85; // kg/m³
    const litersPerGallon = 3.78541; // liters in a US gallon
    const energyBTUPerKg = 121; // thousand BTU per kg
    const energyJoulesPerKg = 33.6 * 3.6e6; // J per kg

    let massKgHr, volumeNm3Hr;

    if (inputUnit === 'kg_per_hr') {
        massKgHr = inputValue;
        volumeNm3Hr = (massKgHr / densityLiquidHydrogen) * 1e-9; // nm³/hr
    } else if (inputUnit === 'nm3_per_hr') {
        volumeNm3Hr = inputValue;
        massKgHr = volumeNm3Hr * densityLiquidHydrogen * 1e9; // kg/hr
    }

    // Gallons per day
    const densityKgPerLiter = 0.07085; // kg/liter
    const gallonsPerDay = (massKgHr / densityKgPerLiter) * 24 * 0.264172;

    // Energy calculations
    const energyMillionBTU = (massKgHr * energyBTUPerKg) / 1000; // million BTU
    const energyMillionJoules = (massKgHr * energyJoulesPerKg) / 1e6; // million Joules

    // Display results with formatting
    document.getElementById('resultVolume').innerText = `Volume: ${formatNumber(volumeNm3Hr, 2)} nm³/hr`;
    document.getElementById('resultGallons').innerText = `Gallons per Day: ${formatNumber(gallonsPerDay, 2)} gallons/day`;
    document.getElementById('resultEnergyBTU').innerText = `Energy: ${formatNumber(energyMillionBTU, 2)} million BTU`;
    document.getElementById('resultEnergyJoules').innerText = `Energy: ${formatNumber(energyMillionJoules, 2)} million Joules`;
}

// Theme Toggle Logic
const toggleSwitch = document.getElementById('checkbox');
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

// Apply saved theme on load
if (currentTheme) {
    document.body.classList.add(currentTheme);

    if (currentTheme === 'dark-mode') {
        toggleSwitch.checked = true;
    }
} else {
    // Detect system preference
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDarkScheme.matches) {
        document.body.classList.add("dark-mode");
        toggleSwitch.checked = true;
        localStorage.setItem("theme", "dark-mode");
    } else {
        localStorage.setItem("theme", "light-mode");
    }
}

// Listen for toggle changes
toggleSwitch.addEventListener('change', function(event) {
    if (event.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
    }
});
