"use strict";




function NewWalk(props) {

  const [restList, setRestList] = useState([]);
  

  function fetchRestaurants() {

    fetch(`/api/restaurants?latitude=${props.latitude}&longitude=${props.longitude}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const rest_objects = data['businesses']
      const user_rests = []

      for (const rest of rest_objects) {
        user_rests.push(
          <ul>
            <li>{rest.name}</li>
            <li>{rest.display_phone}</li>
            <li>{rest['location'].display_address}</li>
          </ul>
        );
      }
      setRestList(user_rest);
    });
  }






    
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
        <button onClick={fetchRestaurants}>restaurants</button>
          {restList}
      </div>
    );
}