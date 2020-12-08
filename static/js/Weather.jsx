'use strict';


function Weather(props) {


    const [weather, setWeather] = useState('');
    const [open, setOpen] = useState(false); 


    function fetchWeather() {
        fetch(`/api/weather?latitude=${props.latitude}&longitude=${props.longitude}&walk_date=${props.walk_date}`) 
        .then(response => {
        return response.json();
        })
        .then(data => {
          setWeather(`The temperature will be ${data['temp']['day'].toFixed(0)}\u00B0 but will feel like ${data['feels_like']['day'].toFixed(0)}\u00B0.
                      The weather description is "${data['weather'][0]['description']}."`)
          setOpen(true);
        });
    }

    
    return (
        <div>

            {!open ? 
              <div className='center'><br/> <Button className='roboto-button' variant='outline-secondary' onClick={fetchWeather}>Get the Weather</Button></div> 
              : ''}

          {weather}

        </div>
    );
}