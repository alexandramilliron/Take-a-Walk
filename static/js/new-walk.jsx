"use strict";

function NewWalk() {
    
    function fetchWeather() {
        fetch('/api/weather')
        .then(response => {
          return response.json();
        })
        .then(data => {
          alert(`The temperature will be ${data.temp}`);
        });
      }
      return (
        <button onClick={fetchWeather}>
            get the temperature
        </button>
        );
}