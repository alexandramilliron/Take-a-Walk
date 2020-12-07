'use strict';


function Trails() {

    const [trails, setTrails] = useState([]);

    useEffect(() => {
        fetchTrails();
    }, []);


    function fetchTrails() {
        fetch('/api/trails') 
        .then(response => {
            return response.json(); 
        })
        .then(data => {
            console.log(data);

            const trails = data;

            const trailCards = 
            (
                <div>
                    {trails.map((trail, index) => {
                        return (
                            <div key={index}>
                            <Card className='all-card'>
                                <Card.Body>
                                    <Image
                                        width={200}
                                        height={200}
                                        className='mr-3 float-left'
                                        src={trail.image}
                                    />
                                    <Card.Title>
                                    <h5>
                                        <Link className='all-link' to={`/trail/${trail.trail_id}/${trail.name}`}>{trail.name}</Link>{'  '}
                                        <h6>{trail.location}</h6>
                                        
                                        {trail.avg_star ? Array.from({length: trail.avg_star}, (value, index) =>
                                        <span key={index}><i className={'fa fa-star checked'}></i></span>) : ''} 
                                    </h5>
                                    </Card.Title>
                                    <div>
                                        <div>{trail.avg_crowd ? `${trail.avg_crowd}% of users have described this trail as crowded.` : 'No reviews on crowdedness yet.'}</div>
                                        <div>{trail.avg_diff ? `On average, users have given this trail a difficulty level of ${trail.avg_diff}.` : 'No reviews on difficulty yet.'}</div>
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
            setTrails(trailCards); 
        });
    };


    return (
        <div className='trails-bg'>
            <Container fluid>
                <Row>
                    <Col>
                        <h2 className='choose-h2'>Trails</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}></Col>
                    <Col md={8}>
                        {trails}
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
}