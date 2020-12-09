'use strict';


function Restaurant() {

    const [price, setPrice] = useState('');
    const [website, setWebsite] = useState('');
    const [hours, setHours] = useState([]);
    const [yelpRating, setYelpRating] = useState('');
    const [phone, setPhone] = useState('');
    const [category, setCategory] = useState('');
    const [address, setAddress] = useState('');
    const [photos, setPhotos] = useState([]); 


    const { rest_id, name } = useParams();


    useEffect(() => {
        fetchRestaurantDetails();
    }, []);


    function prettyAddress(location) {
        return `${location.address1}, ${location.city}, ${location.state } ${location.zip_code}`;
    }


    function convertTime(time) {
        return moment(time, 'HHmm').format('hh:mm a');
    }


    function prettyHours(hours) {

        const openHours = hours[0]['open']

        let numberToDay = {
            0: 'Monday',
            1: 'Tuesday',
            2: 'Wednesday',
            3: 'Thursday',
            4: 'Friday',
            5: 'Saturday',
            6: 'Sunday'
        }

        const convertHours = openHours.map(sched => {
            return {              
                'open': convertTime(sched.start),
                'close': convertTime(sched.end),
                'day': numberToDay[sched.day]
            }
        })

        return convertHours
    }


    function fetchRestaurantDetails() {

        fetch(`/api/restaurant-details?rest_id=${rest_id}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setWebsite(data['url']);
            setHours(prettyHours(data['hours']));
            setYelpRating(data['rating']);
            setPhone(data['display_phone']);
            setPrice(data['price']);
            setCategory(data['categories'][0].title);
            setAddress(prettyAddress(data['location']));
            setPhotos(data['photos']);
        });
    }


    return (
        <div className='rest-detail-bg'>
            <Container fluid>
                <Row>
                    <Col></Col>
                    <Col><h2 md='auto' className='center'>{name}</h2></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col md={4}>  
                    <div>
                        <Carousel className='rest-carousel'>
                            <Carousel.Item>
                                <Image
                                className='d-block w-200'
                                src={photos[0]}
                                alt='first slide'
                                fluid
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <Image
                                className='d-block w-200'
                                src={photos[1]}
                                alt='second slide'
                                fluid
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <Image
                                className='d-block w-200'
                                src={photos[2]}
                                alt='third slide'
                                fluid
                                />
                            </Carousel.Item>
                        </Carousel>
                        <br/>
                        <Card className='detail-card'>
                            <Card.Title>
                                <h5 className='center'><span>Contact Information</span></h5>
                            </Card.Title>
                            <Card.Body>
                                <div>
                                    <span>
                                        <i className='fa fa-map-marker fa-2x' aria-hidden='true'></i>{'  '}
                                        {address}
                                    </span>
                                    <br/><br/>
                                    <span>
                                        <i className='fa fa-phone fa-2x' aria-hidden='true'></i>{'  '}
                                        {phone}
                                    </span>
                                    <br/><br/>
                                    <span>
                                        <i className='fa fa-yelp fa-2x' aria-hidden='true'></i>{'  '}
                                        <a href={website} className='yelp-link'>Check this restaurant out on Yelp</a>
                                    </span>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>    
                    </Col>
                    <Col md={4}>
                        <div>
                        <Card className='detail-card'>
                            <Card.Title> 
                                <span>                             
                                    <h5 className='center'><i className='fa fa-clock-o fa-lg' aria-hidden='true'></i>{'  '}Hours</h5>
                                </span>
                            </Card.Title>
                            <div>
                            <div >
                                {hours.map( (day, index) =>
                                    <div key={index}>
                                        <div className='center'>{day['day']}: {day['open']} - {day['close']}</div>
                                        <br/>
                                    </div>
                                )}
                            </div>
                        </div>
                        </Card>
                        <br/>
                        <Card className='detail-card'>
                            <Card.Title>
                                <h5 className='center'><span>Restaurant Details</span></h5>
                            </Card.Title>
                            <Card.Body>
                                <div>
                                    <div className='center'>
                                        <div style={{ fontSize: 1.8 + 'em' }}>{price}</div>
                                    </div>
                                    <br/>
                                    <br/>
                                    <div className='center'>
                                        <i className='fa fa-cutlery fa-2x' aria-hidden='true'></i>
                                    </div>
                                    <div className='center'>
                                        {category}
                                    </div>
                                    <br/>
                                    <br/>
                                    <div className='center'>
                                        <div>Yelp Rating</div>
                                    </div>
                                    <div className='center'>
                                        {Array.from({length: yelpRating}, (value, index) => 
                                            <i key={index} className='fa fa-star checked fa-2x' aria-hidden='true'></i>
                                        )}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        </div>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
}