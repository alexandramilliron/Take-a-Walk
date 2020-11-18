"use strict";


function SavedWalks(props) {

    const [walks, setWalks] = useState([]); 


    function fetchWalks() {
        fetch(`/saved-walks?username=${props.user.username}`)
        .then(response => {
        return response.json();
        })
        .then(data => {
            const user_walks = data // a list of walk objects 

            const display_walks = user_walks.map((walk) => { // walk is a single walk object in the list 
                return (
                <div key={walk.walk_id}>
                <ul>
                    <li>{walk.walk_id}</li>
                    <li>{walk.walk_date}</li>
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