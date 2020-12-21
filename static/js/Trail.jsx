'use strict';


function Trail() {

    const [ascent, setAscent] = useState('');
    const [descent, setDescent] = useState('');
    const [condition, setCondition] = useState('');
    const [conditionDate, setConditionDate] = useState(''); 
    const [url, setURL] = useState('');
    const [summary, setSummary] = useState('');
    const [length, setLength] = useState('');
    const [location, setLocation] = useState('');
    const [photo, setPhoto] = useState(''); 


    const { trail_id, name } = useParams();


    useEffect(() => {
        fetchTrailDetails();
    }, []);


    function convertDate(date) {
        return moment().format('MM-DD-YYYY');
    }


    function fetchTrailDetails() {

        fetch(`/api/trail-details?trail_id=${trail_id}`)
        .then(response => {
            return response.json();
        })
        .then(data => {

            const trail = data['trails'][0];

            setAscent(trail.ascent);
            setDescent(trail.descent);
            setCondition(trail.conditionStatus);
            setConditionDate(convertDate(trail.conditionDate)); 
            setURL(trail.url);
            setSummary(trail.summary);
            setLength(trail.length);
            setLocation(trail.location);
            setPhoto(trail.imgMedium); 

        });
    }



    return (
        <div className='trail-detail-bg'>
            <Container fluid>
                <Row>
                    <Col></Col>
                    <Col>
                        <h2 md='auto' className='center choose-h2'>{decodeURIComponent(name)}</h2>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col md={5}>
                        <div>
                            <Image src={photo} fluid/> 
                        </div>
                    </Col>
                    <Col md={5}>
                        <div>
                            <Card className='detail-card'>
                                <Card.Title>
                                    <h5 className='center'><span>Trail Information</span></h5>
                                </Card.Title>
                                <Card.Body>
                                    <div>
                                        <span>
                                            <i className='fa fa-map-marker fa-lg' aria-hidden='true'></i>{'  '}
                                            {location}
                                        </span>
                                        <br/><br/>
                                        <span>
                                            <i className='fa fa-arrows-h fa-lg' aria-hidden='true'></i>{'  '}
                                            {`Length: ${length} miles`}
                                        </span>
                                        <br/><br/>
                                        <span>
                                            <i className='fa fa-arrow-circle-up fa-lg' aria-hidden='true'></i>{'  '}
                                            {`Ascent: ${ascent} feet`}
                                        </span>
                                        <br/><br/>
                                        <span>
                                            <i className='fa fa-arrow-circle-down fa-lg' aria-hidden='true'></i>{'  '}
                                            {`Descent: ${descent} feet`}
                                        </span>
                                        <br/><br/>
                                        <span>
                                            <i className='fa fa-binoculars fa-lg' aria-hidden='true'></i>{'  '}
                                            {`Condition as of ${conditionDate}: ${condition}`}
                                        </span>
                                        <br/><br/>
                                        <span>
                                            <i className='fa fa-comment fa-lg' aria-hidden='true'></i>{'  '}
                                            {`Summary: ${summary}`}
                                        </span>
                                        <br/><br/>
                                        <span>
                                            <i className='fa fa-tree fa-lg' aria-hidden='true'></i>{'  '}
                                            <a href={url} className='trail-link'>Check this trail out on All Trails</a>
                                        </span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
}