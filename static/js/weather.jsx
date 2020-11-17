"use strict";


function Weather(props) {

    function fetchWeather() {
        fetch(`/api/weather?latitude=${props.latitude}&longitude=${props.longitude}`)
        .then(response => {
        return response.json();
        })
        .then(data => {
          alert(`Temperature: ${data.temp}. Feels like: ${data.feels_like}. Description: ${data['weather'][0].description}.`);
        });
    }

        
    return (
        <div>
          <button onClick={fetchWeather}>get the temperature</button>
        </div>
    );
}