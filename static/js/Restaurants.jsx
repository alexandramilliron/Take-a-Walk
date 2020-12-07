'use strict';

function Restaurants() {
    
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetchRestaurants();
    }, []);


    function fetchRestaurants() {
        fetch('/api/restaurants') 
        .then(response => {
            return response.json(); 
        })
        .then(data => {
            
            const rests = data;

            const restCards = 
            (
                <div>
                    {rests.map((rest, index) => {
                        return (
                            <div key={index}>
                            <Card className='all-card'>
                                <Card.Body>
                                    <Image
                                        width={200}
                                        height={200}
                                        className='mr-3 float-left'
                                        src={rest.image}
                                    />
                                    <Card.Title>
                                    <h5>
                                        <Link className='all-link' to={`/restaurant/${rest.rest_id}/${rest.name}`}>{rest.name}</Link>{'  '} 
                                        <h6>{rest.location}</h6>

                                        {rest.avg_star ? Array.from({length: rest.avg_star}, (value, index) =>
                                        <span key={index}><i className={'fa fa-star checked'}></i></span>) : ''} 
                                    </h5>
                                    </Card.Title>                                    
                                    <div>
                                        <div>{(rest.avg_mask == null) ? 'No reviews on masks yet.' : `${rest.avg_mask}% of users reported mask usage.`}</div>                                       
                                        <div>{(rest.avg_out == null) ? 'No reviews on outdoor seating yet.' : `${rest.avg_out}% of users reported outdoor seating was available.`}</div>                                       
                                        <div>{(rest.avg_soc == null) ? 'No reviews on social distancing yet.' : `${rest.avg_soc}% of users reported they were able to socially distance.`}</div>
                                    </div>
                                    <br/>
                                </Card.Body>
                            </Card>
                            <br/>
                            </div>
                        );
                    })
                    }
                </div>
            );            
            setRestaurants(restCards); 
        });
    };

    return (
        <div className='restaurants-bg'>
            <Container fluid>
                <Row>
                    <Col>
                        <h2 className='choose-h2'>Reviewed Restaurants</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}></Col>
                    <Col md={8}>
                        {restaurants}
                    </Col>
                    <Col></Col>
                </Row>           
            </Container>
        </div>
    );
}