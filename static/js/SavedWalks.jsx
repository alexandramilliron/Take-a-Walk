'use strict';


function SavedWalks(props) {

    const [walks, setWalks] = useState([]); 
    const history = useHistory(); 
    
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
                        <Card className='walk-card' onClick={() => history.push(`/itinerary/${walk.walk_id}`)}>
                        <Card.Body>
                            <div><i class="fa fa-street-view" aria-hidden="true"></i>{'  '}
                            <Link to={`/itinerary/${walk.walk_id}`} className='rating-link'>{`Walk Date: ${walk.walk_date}`}</Link></div>
                            {/* <div>{`Walk Date: ${walk.walk_date}`}</div>
                            {`Walk ${index + 1}`} */}

                        </Card.Body>
                        </Card>
                        <br/>
                        <br/>
                    </div>
                );
            });
            setWalks(display_walks);
        }); 
    };


    useEffect(() => {
        fetchWalks();
    }, []);

    
    return (
        <div className='saved-walks-bg'>
            <Container fluid>
                <Row>
                    <Col md={2}>
                        <h2 className='center choose-h2'>{props.user.username}'s walks:</h2>
                    </Col>
                    <Col md={4}>
                        {walks}
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
}

