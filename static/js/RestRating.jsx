'use strict';


function RestRating(props) {

    const history = useHistory();

    const [comment, setComment] = useState(null);
    const [starRating, setStarRating] = useState(0);
    const [masksWorn, setMasksWorn] = useState(null); 
    const [socialDist, setSocialDist] = useState(null); 
    const [outdoorSeating, setOutdoorSeating] = useState(null); 
    
    const {rest_id, name } = useParams();

    
    function TextArea() {
      return (
      <Form.Group controlId=''>
          <Form.Label>What did you think of {name}?</Form.Label>
          <Form.Control as='textarea' rows={3} onChange={(event) => {setComment(event.target.value)}}/>
      </Form.Group>
      );
    }


    function Star({starID, marked}) {
      return (
          <i star-id={starID} className={`fa fa-star ${marked ? 'checked' : ''}`} onClick={event => setStarRating(event.target.getAttribute('star-id'))}></i>
      );
    };


    function StarRating() {
      return (
          <div>
              {Array.from({length: 5}, (value, index) => 
                  <Star
                      key={index + 1}
                      starID={index + 1}
                      marked={starRating >= (index + 1)}
                  />        
              )}
          </div>
      );
    };


    function MasksWorn() {
      return (
          <Form.Group>
              <Form.Label>Were employees and customers wearing masks?</Form.Label>
                  <Form.Check name='masks_worn' label='Yes' type='radio' onClick={() => setMasksWorn(true)}/>
                  <Form.Check name='masks_worn' label='No' type='radio' onClick={() => setMasksWorn(false)}/>
          </Form.Group>
      ); 
    }


    function SociallyDistanced() {
      return (
          <Form.Group>
              <Form.Label>Were you able to socially distance (i.e., stay at least 6 feet away from other customers)?</Form.Label>
                  <Form.Check name='socially_distanced' label='Yes' type='radio' onClick={() => setSocialDist(true)}/>
                  <Form.Check name='socially_distanced' label='No' type='radio' onClick={() => setSocialDist(false)}/>
          </Form.Group>
      ); 
    }


    function OutdoorSeating() {
      return (
          <Form.Group>
              <Form.Label>Was outdoor seating available?</Form.Label>
                  <Form.Check name='outdoor_seating' label='Yes' type='radio' onClick={() => setOutdoorSeating(true)}/>
                  <Form.Check name='outdoor_seating' label='No' type='radio' onClick={() => setOutdoorSeating(false)}/>
          </Form.Group>
      ); 
    }


    function addRating(event) {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: props.user.username, rest_id: rest_id, rest_comment: comment, 
                                  rest_star: starRating, masks_worn: masksWorn, socially_distanced: socialDist,
                                  outdoor_seating: outdoorSeating})
            };
    
            
            fetch('/api/add-rest-rating', requestOptions)
                .then(response => response.json())
                .then(data => {
                  if (data['Error']) {
                    alert('Unable to add rating.')
                  } else {
                    history.push('/saved-walks');
                  };
                });
    };

    return (
        <div>
            <Form onSubmit={addRating}>

                {/* comment box */}
                {TextArea()}

                {/* star rating */}
                {StarRating()}

                {/* masks worn */}
                {MasksWorn()}

                {/* socially distanced */}
                {SociallyDistanced()}

                {/* outdoor seating */}
                {OutdoorSeating()}

                <Button type='submit'>Submit Review</Button>

            </Form>
        </div>
    );
}