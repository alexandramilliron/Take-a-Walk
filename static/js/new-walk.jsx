"use strict";


function NewWalk(props) {
    
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [compRest, setCompRest] = useState(false);
    const [zipcode, setZipcode] = useState('');
    const [compTrail, setCompTrail] = useState(false);
    const [walk, setWalk] = useState(null);

    //adding a form to ask for user's location
    //something in that form on submit switches the setCompRest to true 

    useEffect(() => {
      newWalk();
    }, []); 

    function newWalk() {

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

  
    function getLocation(event) {
      event.preventDefault();

      fetch(`/api/get-location?zipcode=${zipcode}`)
        .then(response => response.json())
        .then(data => {
          if (data['Error']) {
            alert('Invalid username or password.')
          } else {
            setLatitude(data['latitude']);
            setLongitude(data['longitude']); 
            setCompRest(true);
          };
        });
    }
    
    
    return (
      <div>
        <h2>Where would you like to take a walk?</h2>
          <form onSubmit={getLocation}>
            <label>Please enter your zipcode:</label>
            <input type="text" placeholder="zipcode"
                onChange={(event) => {setZipcode(event.target.value)}}/>
            <input type="submit" value="Submit"/>
          </form>


        
        {(compRest == true) ? <Restaurants latitude={latitude} longitude={longitude} setCompTrail={setCompTrail} 
                                setCompRest={setCompRest} walk={walk}/> : ''}
        {(compTrail == true) ? <Trails latitude={latitude} longitude={longitude} walk={walk}/> : ''}
        <Weather latitude={latitude} longitude={longitude}/>
      </div>
    );
}