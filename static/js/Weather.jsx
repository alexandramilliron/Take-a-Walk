"use strict";


function Weather(props) {

    function fetchWeather() {
        fetch(`/api/weather?latitude=${props.latitude}&longitude=${props.longitude}`)
        .then(response => {
        return response.json();
        })
        .then(data => {
          const temperature = data.temp;
          const feels_like =  data.feels_like;
          const description = data['weather'][0].description; 
        });
    }

        
    return (
        <div>
          
        </div>
    );
}