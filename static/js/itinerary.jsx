"use strict";


function Itinerary(props) {

    const params = useParams();

    const [walkDetails, setWalkDetails] = useState([]);

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
                    <li>{walk.walk_id}</li>
                    <li>{walk.walk_date}</li>
                    <li>{walk.restaurants[0].name}</li> 
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