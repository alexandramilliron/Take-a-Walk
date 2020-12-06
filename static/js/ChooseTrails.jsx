'use strict';


function ChooseTrails(props) {

    const [trailList, setTrailList] = useState([]);
    const [open, setOpen] = useState(false);
    const [chosenTrails, setChosenTrails] = useState([]);

    const history = useHistory();


    useEffect(() => {
        fetchTrails();
    }, []);


    function getDetails(trail, event) {

        event.currentTarget.classList.toggle('chosen'); 

        const trail_obj = {
            'name': trail.name,
            'location': trail.location,
            'length': trail.length,
            'image': trail.imgSmallMed,
            'hiking_id': trail.id
        };

        let chosenIndex = null;
        
        chosenTrails.forEach((value, index) => {
            if(value.hiking_id == trail_obj.hiking_id) {
                chosenIndex = index;
            }
        });

        if(chosenIndex !== null) {
            chosenTrails.splice(chosenIndex, 1);
        } else {
            chosenTrails.push(trail_obj);
        };
    }


    function fetchTrails() {

        fetch(`/api/choose-trails?latitude=${props.latitude}&longitude=${props.longitude}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const trail_objects = data['trails']

            const display_trails = trail_objects.map((trail) => { 
                return (
                <div key={trail.name}>
                <Card className='choose-card' onClick={(event) => getDetails(trail, event)}>
                    <Card.Title className='center' style={{ margin: 10, padding: 0 }}>
                        <div>{trail.name ? trail.name : ''}</div>
                    </Card.Title>
                    <Card.Body style={{margin: 7, padding: 0}}>
                        <div>{trail.name ? trail.name : ''}</div>
                        <div>{trail.location ? trail.location : ''}</div>
                        <div>{trail.length ? trail.length : ''} miles</div>
                    </Card.Body>
                </Card>
                <br/>
                <br/>
                </div>
                );
            });
        setOpen(true); 
        setTrailList(display_trails);
        });
    }


    function sendTrails(event) {
        event.preventDefault();
  
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({trails: chosenTrails, latitude: props.latitude, longitude: props.longitude, walk: props.walk.walk_id})
          };
  
          fetch('/api/add-trails', requestOptions)
              .then(response => response.json())
              .then(data => {
                console.log(data);
                history.push('/saved-walks'); 
              });
    }


    return (
        <Collapse in={open}>
        <div className='choose-trail-bg'>
            <Container fluid>
                <Row>
                    <Col></Col>

                    <Col md={8}>
                        <Form onSubmit={sendTrails}>

                        <h2 className='center choose-h2'>Choose your trails:</h2>

                            {trailList}
                            
                            <div className='center'>
                                <Button type='submit' className='roboto-button' variant='secondary'>Add Trails</Button>
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