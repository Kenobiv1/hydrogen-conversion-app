// script.js

document.getElementById('convertBtn').addEventListener('click', function() {
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

    // Display results
    document.getElementById('resultVolume').innerText = `Volume: ${volumeNm3Hr.toFixed(6)} nm³/hr`;
    document.getElementById('resultGallons').innerText = `Gallons per Day: ${gallonsPerDay.toFixed(2)} gallons/day`;
    document.getElementById('resultEnergyBTU').innerText = `Energy: ${energyMillionBTU.toFixed(2)} million BTU`;
    document.getElementById('resultEnergyJoules').innerText = `Energy: ${energyMillionJoules.toFixed(2)} million Joules`;
});
