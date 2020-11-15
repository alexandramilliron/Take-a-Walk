"use strict"; 

  
function Restaurants(props) {
    
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
                <div key={rest.name}>
                <input type="checkbox" value={rest.name}/>
                    <ul>
                    <li>{rest.name}</li>
                    <li>{rest.display_phone}</li>
                    <li>{rest['location'].display_address}</li>
                    </ul>
                </div>
            );
        }
        setRestList(user_rests);
        });
    }


    useEffect(() => {
        fetchRestaurants();
    }, []);


    function sendRestaurants(event) {
        event.preventDefault();

        const chosen_rests = Array.from(document.querySelectorAll('input:checked')); 

        let rest_names = chosen_rests.map((element) => {
            return element.value;
        });
  
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({restaurants: rest_names, latitude: props.latitude, longitude: props.longitude})
          };
  
          fetch('/add-restaurants', requestOptions)
              .then(response => response.json())
              .then(data => {
                if (data['Error']) {
                  alert('Invalid username or password.')
                } else {
                  props.setUser(data); 
                  localStorage.setItem('user', (data));
                  history.push('/new-walk');
                };
              });
    }

    return (
        <div className="">
            <h1>Choose your restaurants:</h1>
            <form onSubmit={sendRestaurants}>

                {restList}

            <button type="submit">Add Restaurants</button>
            
            </form>
        </div>
    );
}