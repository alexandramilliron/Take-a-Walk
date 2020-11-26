"use strict"; 

function UserRatings(props) {

    fetch(`/api/ratings/${props.user.username}`) 
    .then(response => {
        return response.json(); 
    })
    .then(data => {
        console.log(data); 
    });

    return (
        <div>You're on the ratings page.</div>
    );
}