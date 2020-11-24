"use strict";


function SavedWalks(props) {

    const [walks, setWalks] = useState([]); 
    
    function fetchWalks() {

        fetch(`/api/saved-walks?username=${props.user.username}`) 
        .then(response => {
        return response.json();
        })
        .then(data => {
            const user_walks = data 

            const display_walks = user_walks.map((walk, index) => {
                return (
                    <div key={index}>
                        <ul>
                            <li><Link to={`/itinerary/${walk.walk_id}`}>{`Walk #${index + 1}`}</Link></li>  
                            <li>{`Walk Date: ${walk.walk_date}`}</li>
                        </ul>
                    </div>
                );
            });
            setWalks(display_walks);
        }); 
    };


    useEffect(() => {
        fetchWalks();
    }, []);

    
    return (
        <div>
        <h2>Here are your walks!</h2>
        {walks}
        </div>
    );
}

