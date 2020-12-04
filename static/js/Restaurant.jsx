'use strict';

function Restaurant() {

    const { rest_id } = useParams();



    return (
        <div>
            Add a review to this restaurant: 
            <Link to={`/rest-rating/${rest_id}`}>Review</Link>
        </div>
    );
}