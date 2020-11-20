"use strict";


function SavedWalks(props) {

    const [walks, setWalks] = useState([]); 
    

    function fetchWalks() {

        fetch(`/saved-walks?username=${props.user.username}`) 
        .then(response => {
        return response.json();
        })
        .then(data => {
            const user_walks = data 
            const display_walks = []

            for (const [index, walk] of user_walks.entries()) {
                display_walks.push(
                    <div key={index}>
                        <ul>
                            <li><Link to={`/itinerary/${walk.walk_id}`}>{`Walk #${index + 1}`}</Link></li>
                            <li>{`Walk Date: ${walk.walk_date}`}</li>
                        </ul>
                    </div>);
            }
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

// this can stay the same along with its endpoint in the server 
// useParams need to be reimplemented here and on Itinerary 
// useHistory as well 