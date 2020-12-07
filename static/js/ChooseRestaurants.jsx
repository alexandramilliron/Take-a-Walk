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


    function getDetails(rest, event) {
     
        event.currentTarget.classList.toggle('chosen'); 

        const rest_obj = {
            'name': rest.name,
            'price': rest.price ? rest.price : null,
            'display_phone': rest.display_phone ? rest.display_phone : null,
            'location': prettyAddress(rest.location),
            'image': rest.image_url ? rest.image_url : null,
            'yelp_id': rest.id
        };

        let chosenIndex = null;
        
        chosenRests.forEach((value, index) => {
            if(value.yelp_id == rest_obj.yelp_id) {
                chosenIndex = index;
            }
        });

        if(chosenIndex !== null) {
            chosenRests.splice(chosenIndex, 1);
        } else {
            chosenRests.push(rest_obj);
        };
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
                <div key={rest.name}>
                <Card className='choose-card' onClick={(event) => getDetails(rest, event)}>
                    <Card.Title className='center' style={{ margin: 10, padding: 0 }}>
                        <div>{rest.name ? rest.name : ''}</div>
                    </Card.Title>
                    <Card.Body style={{ margin: 7, padding: 25 }}>
                        <div>{rest.location ? prettyAddress(rest.location) : ''}<span className='float-right'>{rest.price ? rest.price : ''}</span></div>
                        <div>{rest.display_phone ? rest.display_phone : ''}<span className='float-right'>{rest.categories[0].title ? rest.categories[0].title : ''}</span></div>
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

                            <h2 className='center choose-h2'>Choose your restaurants:</h2>          
                            
                            {restList}

                            <div className='center'>
                                <Button type='submit' className='roboto-button' variant='secondary'>Add Restaurants</Button>    
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