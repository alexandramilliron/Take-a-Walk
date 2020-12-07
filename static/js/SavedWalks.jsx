'use strict';


function SavedWalks(props) {

    const [walks, setWalks] = useState([]); 
    
    function fetchWalks() {

        fetch(`/api/saved-walks/${props.user.username}`) 
        .then(response => {
        return response.json();
        })
        .then(data => { 
            const userWalks = data 

            const display_walks = userWalks.map((walk, index) => {

                let latitude = ''
                let longitude = ''

                if (walk.trails.length !== 0) {
                    latitude = (walk.trails[0].latitude);
                    longitude = (walk.trails[0].longitude);
                } else {
                    latitude = (walk.restaurants[0].latitude);
                    longitude = (walk.restaurants[0].longitude);
                }
      
                return (
                    <div key={index}>
                        <Card className='walk-card'>
                        <Card.Body style={{ margin: 5, padding: 30, wordSpacing: .08 + 'em' }}>
                            <Card.Title>
                            <div><i className='fa fa-calendar' aria-hidden='true'></i>{'  '}
                                {walk.walk_date}
                            </div>
                            </Card.Title>
                            <Card.Subtitle className='center'>Click on a restaurant or trail to leave a rating.</Card.Subtitle>
                            <br/>
                            {walk.restaurants.map(rest => {
                                return (
                                    <div key={rest.rest_id}><i className='fa fa-cutlery' aria-hidden='true'></i>{'  '}                                       
                                        <Link className='walk-link' title='review this restaurant' to={`/rest-rating/${rest.rest_id}/${rest.name}`}>{rest.name}</Link>
                                    </div> 
                                );
                            })}
                            {walk.trails.map(trail => {
                                return (
                                    <div key={trail.trail_id}><i className='fa fa-tree' aria-hidden='true'></i>{'  '}
                                        <Link className='walk-link' title='review this trail' to={`/trail-rating/${trail.trail_id}/${trail.name}`}>{trail.name}</Link>
                                    </div>
                                );
                            })}
                            <br/>
                            <div className='center'><Weather latitude={latitude} longitude={longitude} walk_date={walk.walk_date}/></div>
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
                    <Col md={3}>
                        <h2 className='choose-h2'>{props.user.username}'s walks:</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}></Col>
                    <Col md={8}>
                        {walks}
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
}

