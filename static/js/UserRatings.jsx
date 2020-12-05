'use strict';


function UserRatings(props) {

    const [trailCards, setTrailCards] = useState('');
    const [restCards, setRestCards] = useState('');

    const history = useHistory(); 
    

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
                        <Card key={index} border='info' onClick={() => history.push(`/trail/${rating.trail_id}`)}>
                            <Card.Img variant='top' src={`/static/img/trailrating${(index % 5) + 1}.jpeg`}/>
                            <Card.Title style={{ margin: 10, padding: 0 }}>
                                <i className='fa fa-tree'></i>{'   '}
                                <Link to={`/trail/${rating.trail_id}`} className='rating-link'>{rating.trail_name}</Link><br/>
                                <span>
                                    {Array.from({length: rating.trail_star}, (value, index) =>
                                    <span key={index}><i className={'fa fa-star checked rating-star'}></i></span>)}
                                </span>
                                <span className='text-muted float-right card-date'>{rating.rated_at}</span>
                            </Card.Title>
                            <Card.Body style={{margin: 7, padding: 0}}>    
                                <Card.Text> 
                                    <div>{rating.crowded ? 'This trail was crowded.' : 'This trail was uncrowded.'}</div>
                                    <div>{rating.difficulty_level ? `Difficulty: ${rating.difficulty_level}` : ''}</div>
                                    <div>{rating.trail_comment ? `Comment: ${rating.trail_comment}` : ''}</div>
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
                        <Card key={index} border='info' onClick={() => history.push(`/restaurant/${rating.rest_id}`)}>
                            <Card.Img variant='top' src={`/static/img/restrating${(index % 5) + 1}.jpeg`}/>
                            <Card.Title style={{ margin: 10, padding: 0 }}>
                                <i className='fa fa-cutlery'></i>{'   '}
                                <Link to={`/restaurant/${rating.rest_id}`} className='rating-link'>{rating.rest_name}</Link><br/>
                                <span>
                                    {Array.from({length: rating.rest_star}, (value, index) =>
                                    <span key={index}><i className={'fa fa-star checked rating-star'}></i></span>)}
                                </span>
                                <span className='text-muted float-right card-date'>{rating.rated_at}</span>
                            </Card.Title>
                            <Card.Body style={{ margin: 7, padding: 0 }}>    
                                <Card.Text> 
                                    <div>{rating.masks_worn ? 'Masks were worn.' : 'Masks weren\'t worn.'}</div>
                                    <div>{rating.socially_distanced ? 'Social distancing was enforced.' : 'Social distancing wasn\'t enforced.'}</div>
                                    <div>{rating.outdoor_seating ? 'Outdoor seating was available.' : 'There wasn\'t outdoor seating.'}</div>
                                    <div>{rating.rest_comment ? `Comment: ${rating.rest_comment}` : ''}</div>
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
            <h2 className='float-left'>{props.user.username}'s ratings</h2>
            <Container>
                <Row>
                    <Col md='auto'>{trailCards}</Col>
                    <Col md='auto'>{restCards}</Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
}