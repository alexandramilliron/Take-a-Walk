"use strict";


function UserRatings(props) {

    const [trailCards, setTrailCards] = useState('');
    const [restCards, setRestCards] = useState('');

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

            const trailRatingCards = 
            (
            <div>
                {ratings.trail_ratings.map((rating, index) => {
                    return (
                        <Card key={index} style={{ width: '25rem' }}>
                            <Card.Header>
                                <Link to={`/trails/${rating.trail_id}`}>{rating.trail_name}</Link> <br/>
                                <span>
                                    {Array.from({length: rating.trail_star}, (value, index) =>
                                    <span key={index}><i className={'fa fa-star checked'}></i></span>)}
                                </span>
                                <span className="text-muted">{rating.rated_at}</span>
                            </Card.Header>
                            <Card.Body>    
                                <Card.Text> 
                                    Difficulty: {rating.difficulty_level} <br/>
                                    {rating.crowded ? 'This trail was crowded.' : 'This trail was uncrowded.'} <br/>
                                    "{rating.trail_comment}"
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
            );

            const restRatingCards = 
            (
            <div>
                {ratings.restaurant_ratings.map((rating, index) => {
                    return (
                        <Card key={index} style={{ width: '25rem' }}>
                            <Card.Header>
                                <Link to={`/restaurants/${rating.rest_id}`}>{rating.rest_name}</Link> <br/>
                                <span>
                                    {Array.from({length: rating.rest_star}, (value, index) =>
                                    <span key={index}><i className={'fa fa-star checked'}></i></span>)}
                                </span>
                                <span className="text-muted">{rating.rated_at}</span>
                            </Card.Header>
                            <Card.Body>    
                                <Card.Text> 
                                    {rating.masks_worn ? 'Masks were worn.' : 'Masks weren\'t worn.'} <br/>
                                    {rating.socially_distanced ? 'Social distancing was enforced.' : 'Social distancing wasn\'t enforced.'} <br/>
                                    {rating.outdoor_seating ? 'Outdoor seating was available.' : 'There wasn\'t outdoor seating.'} <br/>
                                    "{rating.rest_comment}"
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
            );

            setTrailCards(trailRatingCards);
            setRestCards(restRatingCards); 
        });
    };

    return (
        <div>
            <h2 className="float-left">{props.user.username}'s Ratings</h2>
            <Container>
                <Row>
                    <Col md="auto">{trailCards}</Col>
                    <Col md="auto">{restCards}</Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
}