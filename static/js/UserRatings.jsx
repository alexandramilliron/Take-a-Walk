"use strict"; 

function UserRatings(props) {

    const [ratingCard, setRatingCard] = useState('');


    useEffect(() => {
        fetchRatings();
    }, []);


    function fetchRatings() {

        fetch(`/api/ratings/${props.user.username}`) 
        .then(response => {
            return response.json(); 
        })
        .then(data => {
            const ratings = data 

            const ratingCards = 
            (
            <div>
                {ratings.trail_ratings.map(rating => {
                    return (
                        <Accordion defaultActiveKey="0" key={rating.trail_rating_id}>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} eventKey="0">
                                    {rating.trail_name}, {rating.rated_at}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    You had this to say about this trail: {rating.trail_comment}
                                    You gave this trail a {rating.trail_star}-star rating.
                                    You thought the trail was a difficulty level {rating.difficulty_level}.
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Accordion>
                    );
                })};
            </div>
            );
            setRatingCard(ratingCards);
        });
    };

    return (
        <div>
            {ratingCard}
        </div>
    );
}