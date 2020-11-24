"use strict";


function Itinerary() {

    const [walkDetails, setWalkDetails] = useState([]);

    const { walk_id } = useParams();
    
    function fetchWalkDetails() {

        fetch(`/api/walk-details/${walk_id}`) 
        .then(response => {
        return response.json();
        })
        .then(data => {
            const walk = data

            if (walk.trails.length !== 0) {
                const latitude = walk.trails[0].latitude // TODO: get latitude and longitude to pass to Weather component
                const longitude = walk.trails[0].longitude
            } else {
                const latitude = walk.restaurants[0].latitude
                const longitude = walk.restaurants[0].longitude
            }

            const display_walk = 
                (
                <div key={walk.walk_id}>
                <ul>
                    <li>{walk.walk_date.slice(0, 16)}</li>
                    {walk.restaurants.map(rest => {
                        return (
                            <li key={rest.rest_id}>{rest.name}</li>
                        );
                    })}
                    {walk.trails.map(trail => {
                        return (
                            <li key={trail.trail_id}>{trail.name}</li>
                        );
                    })}
                </ul>
                </div>);
            setWalkDetails(display_walk);
        }); 
    };


    useEffect(() => {
        fetchWalkDetails();
    }, []);


    return (
        <div>
            {walkDetails}
            <Weather latitude={latitude} longitude={longitude}/>
        </div>
    )
}