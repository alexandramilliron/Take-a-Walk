"use strict";


function RestRating(props) {

    const history = useHistory();

    const [comment, setComment] = useState('');
    const [starRating, setStarRating] = useState(0);
    
    const {rest_id} = useParams();


    function TextArea() {
      return (
      <Form.Group controlId="">
          <Form.Label>What did you think about this restaurant?</Form.Label>
          <Form.Control as="textarea" rows={3} onChange={(event) => {setComment(event.target.value)}}/>
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


    function addRating(event) {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: props.user.username, rest_id: rest_id, rest_comment: comment, 
                                  rest_star: starRating})
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
            <form onSubmit={addRating}>

                {/* comment box */}
                {TextArea()}

                {/* star rating */}
                {StarRating()}



                <button type="submit">Submit Review</button>

            </form>
        </div>
    );
}