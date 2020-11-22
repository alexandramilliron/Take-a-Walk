"use strict";


function NewWalk(props) {
    
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [compRest, setCompRest] = useState(false);
    const [zipcode, setZipcode] = useState('');
    const [date, setDate] = useState('');
    const [compTrail, setCompTrail] = useState(false);
    const [walk, setWalk] = useState(null); 


    function newWalk() {

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: props.user, date: date})
            };

        fetch('/api/new-walk', requestOptions)
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
            newWalk();
          };
        });
    }
    
    
    return (
      <div>
        <h2>Make a New Walk</h2>
          <form onSubmit={getLocation}>
            <label>Where would you like to walk?</label>
            <input type="text" placeholder="zipcode"
                onChange={(event) => {setZipcode(event.target.value)}}/>
                <br/>
            <label>When would you like to go?</label>  
            <input type="date" 
                onChange={(event) => {setDate(event.target.value)}}/>
            <input type="submit" value="Submit"/>
          </form>


        
        {compRest ? <Restaurants latitude={latitude} longitude={longitude} setCompTrail={setCompTrail} 
                                setCompRest={setCompRest} walk={walk}/> : ''}
        {compTrail ? <Trails latitude={latitude} longitude={longitude} walk={walk} date={date} setCompTrail={setCompTrail}/> : ''}
        {/* <Weather latitude={latitude} longitude={longitude}/> */}
      </div>
    );
}