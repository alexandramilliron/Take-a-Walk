"use strict";


function TrailRating(props) {
    
    const history = useHistory();

    const [comment, setComment] = useState(null);
    const [starRating, setStarRating] = useState(0);
    const [difficulty, setDifficulty] = useState(null); 
    const [crowded, setCrowded] = useState(null); 
    
    const {trail_id} = useParams();


    function TextArea() {
        return (
        <Form.Group controlId="">
            <Form.Label>What did you think about this trail?</Form.Label>
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


    function DifficultyRating() {
        return ( 
            <div>
            <Form.Group controlId="">
                <Form.Label>How difficult was the trail?</Form.Label>
                <Form.Control as="select" onChange={(event) => setDifficulty(event.target.value)}> 
                    <option>select a difficulty level</option>
                    <option value={1}>1 - Easy</option>
                    <option value={2}>2</option>
                    <option value={3}>3 - Moderate</option>
                    <option value={4}>4</option>
                    <option value={5}>5 - Hard</option>
                </Form.Control>
          </Form.Group>
          </div>
    )};


    function IsCrowded() {
        return (
            <Form.Group>
                <Form.Label>How busy was it?</Form.Label>
                    <Form.Check name="crowded" label="crowded" type="radio" onClick={() => setCrowded(true)}/>
                    <Form.Check name="crowded" label="uncrowded" type="radio" onClick={() => setCrowded(false)}/>
            </Form.Group>
        ); 
    }


    function addRating(event) {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: props.user.username, trail_id: trail_id, trail_comment: comment, 
                                  trail_star: starRating, difficulty: difficulty, crowded: crowded})
            };
    
            
            fetch('/api/add-trail-rating', requestOptions)
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

                {/* difficulty rating */}
                {DifficultyRating()}

                {/* crowded rating */}
                {IsCrowded()}

                <Button type="submit">Submit Review</Button>

            </Form>
        </div>
    );
}