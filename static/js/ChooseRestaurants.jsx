"use strict"; 

  
function ChooseRestaurants(props) {
    
    const [restList, setRestList] = useState([]);

    
    useEffect(() => {
        fetchRestaurants();
    }, []);


    function prettyAddress(location) {
        return `${location.address1}, ${location.city}, ${location.state } ${location.zip_code}`;
    }


    function fetchRestaurants() {

        fetch(`/api/choose-restaurants?latitude=${props.latitude}&longitude=${props.longitude}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const rest_objects = data['businesses']

            const display_rests = rest_objects.map((rest) => { 
                return (
                <div key={rest.name}>
                <input type="checkbox" value={`${rest.name}|${rest.price}|${rest.display_phone}|${prettyAddress(rest.location)}`}/>
                <ul>
                    <li>{rest.name}</li>
                    <li>{rest.price}</li>
                    <li>{rest.display_phone}</li>
                    <li>{prettyAddress(rest.location)}</li>
                </ul>
                </div>);
            });

        setRestList(display_rests);
        });
    }


    function sendRestaurants(event) {
        event.preventDefault();

        const chosen_rests = Array.from(document.querySelectorAll('input:checked')); 

        let restaurants = chosen_rests.map((element) => {
            const rest_info = element.value.split("|");
            return {
                'name': rest_info[0],
                'price': rest_info[1],
                'display_phone': rest_info[2],
                'location': rest_info[3]
            }
        });
  
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({restaurants: restaurants, latitude: props.latitude, longitude: props.longitude, walk: props.walk.walk_id})
          };
  
          fetch('/api/add-restaurants', requestOptions)
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