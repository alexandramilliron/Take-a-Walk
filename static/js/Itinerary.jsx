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

            const display_walk = 
                (
                <div key={walk.walk_id}>
                <ul>
                    <li>{walk.walk_date}</li>
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
        </div>
    )
}