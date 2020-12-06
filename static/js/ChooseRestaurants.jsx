'use strict';

  
function ChooseRestaurants(props) {
    
    const [restList, setRestList] = useState([]);
    const [open, setOpen] = useState(false);
    const [chosenRests, setChosenRests] = useState([]); 

    
    useEffect(() => {
        fetchRestaurants();
    }, []);


    function prettyAddress(location) {
        return `${location.address1}, ${location.city}, ${location.state } ${location.zip_code}`;
    }


    function getDetails(rest) {
        
        const rest_obj = {
            'name': rest.name,
            'price': rest.price,
            'display_phone': rest.display_phone,
            'location': prettyAddress(rest.location),
            'image': rest.image_url
        };

        let restArray = chosenRests.concat(rest_obj);
        setChosenRests(restArray);

    }
      

    function fetchRestaurants() {

        fetch(`/api/choose-restaurants?latitude=${props.latitude}&longitude=${props.longitude}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const rest_objects = data['businesses']

            const display_rests = rest_objects.map((rest) => { 
                return (
                <div>
                <Card key={rest.name} className='choose-card' onClick={() => getDetails(rest)}>
                    <Card.Title style={{ margin: 10, padding: 0 }}>
                        <div>{rest.name ? rest.name : ''}</div>
                    </Card.Title>
          
                    <Card.Body style={{margin: 7, padding: 0}}>
                        <div>{rest.price ? rest.price : ''}</div>
                        <div>{rest.display_phone ? rest.display_phone : ''}</div>
                        <div>{rest.location ? prettyAddress(rest.location) : ''}</div>
                    </Card.Body>
                </Card>
                <br/>
                <br/>
                </div>
                );
            });
        setOpen(true); 
        setRestList(display_rests);
        });
    }


    function sendRestaurants(event) {
        event.preventDefault();
  
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({restaurants: chosenRests, latitude: props.latitude, longitude: props.longitude, walk: props.walk.walk_id})
          };
  
          fetch('/api/add-restaurants', requestOptions)
              .then(response => response.json())
              .then(data => {
                console.log(data);
                props.setCompTrail(true); 
                props.setCompRest(false);
              });
    }


    return (
        <Collapse in={open}>
        <div className='choose-rest-bg'>
            <Container fluid>
                <Row>
                    <Col></Col>

                    <Col md={8}>
                        <Form onSubmit={sendRestaurants}>

                            <h2 className='center choose-rest-h2'>Choose your restaurants:</h2>          
                            
                            {restList}

                            <div className='center'>
                                <Button type='submit' className='roboto-button' variant='outline-secondary'>Add Restaurants</Button>    
                            </div>

                        </Form>
                    </Col>

                    <Col></Col>
                </Row>
            </Container>
        </div>
        </Collapse>

    );
}