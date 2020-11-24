"use strict"; 

  
function ChooseRestaurants(props) {
    
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
            const rest_objects = data['businesses']

            const display_rests = rest_objects.map((rest) => { 
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