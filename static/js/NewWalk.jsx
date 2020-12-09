'use strict';


function NewWalk(props) {
    
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [compRest, setCompRest] = useState(false);
    const [zipcode, setZipcode] = useState('');
    const [date, setDate] = useState('');
    const [compTrail, setCompTrail] = useState(false);
    const [walk, setWalk] = useState(null); 
    const [open, setOpen] = useState(false); 


    function newWalk() {

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: props.user, date: date})
            };

        fetch('/api/new-walk', requestOptions)
            .then(response => response.json())
            .then(data => {
              setWalk(data); 
            });
    }

  
    function getLocation(event) {
      event.preventDefault();

      fetch(`/api/get-location?zipcode=${zipcode}`)
        .then(response => response.json())
        .then(data => {
          if (data['Error']) {
            alert('Unable to get user location.') 
          } else {
            setLatitude(data['latitude']);
            setLongitude(data['longitude']); 
            setCompRest(true);
            setOpen(true);
            newWalk();
          };
        });
    }
    
    
    return (
      <div>
        <Container fluid>
          <Collapse in={!open}>
          <Form onSubmit={getLocation}>
          <Row>
            <Col></Col>

            <Col md='auto' className='border rounded-lg' 
              style={{ padding: 12 + 'em', background: "transparent url('/static/img/newwalkbg.jpeg') no-repeat center center /cover" }}>

              <div className='center'>
                <h2>Start a New Walk</h2>
              </div>
              <br/>

            <Form.Group controlId='zipcode'>
              <Form.Label className='center'>Where would you like to walk?</Form.Label>
                <Form.Control type='text' placeholder='zipcode' onChange={(event) => {setZipcode(event.target.value)}}/>
            </Form.Group>

            <Form.Group>
              <Form.Label className='center'>When would you like to go?</Form.Label>  
                <Form.Control type='date' onChange={(event) => {setDate(event.target.value)}}/>
            </Form.Group>

            <div className='center'>
              <Button className='roboto-button' variant='outline-secondary' type='submit'>Submit</Button> 
            </div>

            </Col> 

            <Col></Col>
          </Row>  
          </Form>
          </Collapse>
        
        {compRest ? <ChooseRestaurants latitude={latitude} longitude={longitude} setCompTrail={setCompTrail} 
                                        setCompRest={setCompRest} walk={walk} user={props.user}/> : ''}
        {compTrail ? <ChooseTrails latitude={latitude} longitude={longitude} walk={walk} date={date} setCompTrail={setCompTrail}
                                    user={props.user}/> : ''}
        
        </Container>
      </div>
    );
}