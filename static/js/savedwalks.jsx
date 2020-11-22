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
                // is there a way to send props with a Link? 
                // options:
                // fetch all info at once for particular walk and pass it from component to component - /walk-details
                // fetch only the info you need when you need it ? take id from url and run fetch to get that info 
                // fetch all info at once and store it in global state? do I need Redux to make that work 
                // depends on goals
                // fetches for smaller pieces of data / getting info exactly when you need it 
                // props for anything it can't get from the parent but otherwise use the data 
                // if you can pass through the URL - persists the page out of context 
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

// this can stay the same along with its endpoint in the server 
// useParams need to be reimplemented here and on Itinerary 
// useHistory as well 