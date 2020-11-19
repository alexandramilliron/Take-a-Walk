"use strict";


function SavedWalks(props) {

    const [walks, setWalks] = useState([]); 

    const history = useHistory(); 


    function fetchWalks() {

        function handleClick(walk_id) {
            history.push({
                pathname: `/itinerary/${walk_id}`,
            })
        };

        fetch(`/saved-walks?username=${props.user.username}`)
        .then(response => {
        return response.json();
        })
        .then(data => {
            const user_walks = data 

            const display_walks = user_walks.map((walk) => { 
                return (
                <div key={walk.walk_id}>
                <ul>
                    <li><a href='#' onClick={() => handleClick(walk.walk_id)}>{walk.walk_id}</a></li>
                    <li onClick={() => handleClick(walk.walk_id)}>{walk.walk_date}</li> 
                </ul>
                </div>);
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