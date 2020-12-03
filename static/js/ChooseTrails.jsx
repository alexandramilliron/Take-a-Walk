"use strict";


function ChooseTrails(props) {

    const [trailList, setTrailList] = useState([]);
    const history = useHistory();


    useEffect(() => {
        fetchTrails();
    }, []);

    
    function fetchTrails() {

        fetch(`/api/choose-trails?latitude=${props.latitude}&longitude=${props.longitude}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const trail_objects = data['trails']

            const display_trails = trail_objects.map((trail) => { 
                return (
                <div key={trail.name}>
                <input type="checkbox" value={`${trail.name}|${trail.location}|${trail.length}`}/>
                <ul>
                    <li>{trail.name}</li>
                    <li>{trail.location}</li>
                    <li>{trail.length}</li>
                </ul>
                </div>);
            });

        setTrailList(display_trails);
        });
    }


    function sendTrails(event) {
        event.preventDefault();

        const chosen_trails = Array.from(document.querySelectorAll('input:checked')); 

        let trails = chosen_trails.map((element) => {
            const trail_info = element.value.split("|");
            return {
                'name': trail_info[0],
                'location': trail_info[1],
                'length': trail_info[2]
            };
        });
  
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({trails: trails, latitude: props.latitude, longitude: props.longitude, walk: props.walk.walk_id})
          };
  
          fetch('/api/add-trails', requestOptions)
              .then(response => response.json())
              .then(data => {
                console.log(data);
                history.push('/saved-walks'); 
              });
    }


    return (
        <div className="">
            <h2>Choose your trails:</h2>
            <form onSubmit={sendTrails}>
                {trailList}
            <button type="submit">Add Trails</button>
            </form>
        </div>
    );
}