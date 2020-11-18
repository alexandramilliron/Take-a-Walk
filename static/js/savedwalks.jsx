"use strict";


function SavedWalks(props) {

    // 'walk_id': walk_id is what's returned from the new-walk route in the server 
    //     walks = crud.get_user_walks(username)

    function fetchWalks() {
        fetch(`/saved-walks?username=${props.user.username}`)
        .then(response => {
        return response.json();
        })
        .then(data => {
            console.log(data);
        });
    }


    useEffect(() => {
        fetchWalks();
    }, []);

    return (
        <h2>Here are your walks!</h2>


    );
}