"use strict";


function Itinerary(props) {

    const [walkDetails, setWalkDetails] = useState([]);

    
    // through useParams, taking out the walk_id, and now the fetch request is based on walk_id 

    function fetchWalkDetails() {

        fetch(`/walk-details?username=${props.user.username}`)
        .then(response => {
        return response.json();
        })
        .then(data => {
            const user_walks = data 

            const display_walks = user_walks.map((walk) => { 
                return (
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
            });
            setWalkDetails(display_walks);
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