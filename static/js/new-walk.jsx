"use strict";




function NewWalk() {

  let latitude = ''
  let longitude = '' 

  function getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude; 
        longitude = position.coords.longitude;
        alert('location is working')
      });
    } else {
      alert('Sorry, geolocation is not available.')
    };
  };
  





    
  function fetchWeather() {
    fetch(`/api/weather?latitude=${latitude}&longitude=${longitude}`)
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
        <button onClick={getLocation}>Location Test</button>
      </div>
    );
}