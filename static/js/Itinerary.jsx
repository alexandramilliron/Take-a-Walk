"use strict";


function Itinerary() {

    const [walkDetails, setWalkDetails] = useState([]);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState(''); 
    const [walkDate, setWalkDate] = useState(''); 

    const { walk_id } = useParams();
    
    function fetchWalkDetails() {

        fetch(`/api/walk-details/${walk_id}`) 
        .then(response => {
        return response.json();
        })
        .then(data => {
            const walk = data

            if (walk.trails.length !== 0) {
                setLatitude(walk.trails[0].latitude);
                setLongitude(walk.trails[0].longitude);
            } else {
                setLatitude(walk.restaurants[0].latitude);
                setLongitude(walk.restaurants[0].longitude);
            }

            setWalkDate(walk.walk_date.slice(0, 16)); 

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
            <Weather latitude={latitude} longitude={longitude} walk_date = {walkDate}/>
        </div>
    )
}