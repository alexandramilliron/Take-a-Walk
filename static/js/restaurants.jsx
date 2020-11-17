"use strict"; 

  
function Restaurants(props) {
    
    const [restList, setRestList] = useState([]);

    
    useEffect(() => {
        fetchRestaurants();
    }, []);


    function fetchRestaurants() {

        fetch(`/api/restaurants?latitude=${props.latitude}&longitude=${props.longitude}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const rest_objects = data['businesses'] // an array of 'restaurant' objects based on user's lat/long

            const display_rests = rest_objects.map((rest) => { // rest is a single object
                return (
                <div key={rest.name}>
                <input type="checkbox" value={rest.name}/>
                <ul>
                    <li>{rest.name}</li>
                    <li>{rest.price}</li>
                    <li>{rest.display_phone}</li>
                    <li>{`${rest['location'].address1}, ${rest['location'].city}, ${rest['location'].state } ${rest['location'].zip_code}`}</li>
                </ul>
                </div>);
            });

        setRestList(display_rests);
        });
    }


    function sendRestaurants(event) {
        event.preventDefault();

        const chosen_rests = Array.from(document.querySelectorAll('input:checked')); 

        let rest_names = chosen_rests.map((element) => {
            return element.value;
        });
  
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({restaurants: rest_names, latitude: props.latitude, longitude: props.longitude, walk: props.walk.walk_id})
          };
  
          fetch('/add-restaurants', requestOptions)
              .then(response => response.json())
              .then(data => {
                console.log(data);
                props.setCompTrail(true); 
                props.setCompRest(false);
              });
    }


    return (
        <div className="">
            <h2>Choose your restaurants:</h2>
            <form onSubmit={sendRestaurants}>
                {restList}
            <button type="submit">Add Restaurants</button>        
            </form>
        </div>
    );
}