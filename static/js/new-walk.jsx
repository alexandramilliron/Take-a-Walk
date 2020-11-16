"use strict";


function NewWalk(props) {
    
  
    const [comp, setComp] = useState(true);

    const [walk, setWalk] = useState(null);


    function newWalk() {

        console.log(props.user);

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(props.user)
            };

        fetch('/new-walk', requestOptions)
            .then(response => response.json())
            .then(data => {
              setWalk(data); 
            });
    }


    useEffect(() => {
      newWalk();
    }, []); 


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
        {(comp == true) ? <Restaurants latitude={props.latitude} longitude={props.longitude} setComp={setComp} walk={walk}/> : 
        <Trails latitude={props.latitude} longitude={props.longitude} walk={walk}/>}
      </div>
    );
}