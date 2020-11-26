"use strict";


function Weather(props) {


    useEffect(() => {
      fetchWeather();
    }, []);


    const [weather, setWeather] = useState('');


    function fetchWeather() {
        fetch(`/api/weather?latitude=${props.latitude}&longitude=${props.longitude}&walk_date=${props.walk_date}`) 
        .then(response => {
        return response.json();
        })
        .then(data => {
          setWeather(`The temperature will be ${data['temp']['day']} but will feel like ${data['feels_like']['day']}.
                      The weather description is "${data['weather'][0]['description']}."`)
        });
    }

    
    return (
        <div>
          {weather}
        </div>
    );
}