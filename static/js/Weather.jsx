"use strict";


function Weather(props) {

    let temperature = '' // figure out variable scoping here 

    function fetchWeather() {
        fetch(`/api/weather?latitude=${props.latitude}&longitude=${props.longitude}`)
        .then(response => {
        return response.json();
        })
        .then(data => {
          const temperature = data['current'].temp;
          const feels_like =  data['current'].feels_like;
          const description = data['current']['weather'][0].description; 
        });
    }

        
    return (
        <div>
          <button onClick={fetchWeather}>Click to get the weather for this walk!</button>
            <span>The temperature is {temperature}</span>
        </div>
    );
}