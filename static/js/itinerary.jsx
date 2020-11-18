"use strict";

function Itinerary() {
    const params = useParams();


    return (
        <div>
            <div>{`Walk ID: ${params.walk_id}`}</div>
            you've made it to the itinerary my guy 
        </div>
    )
}