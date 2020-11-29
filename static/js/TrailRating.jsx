"use strict";


function TrailRating(props) {
    
    const history = useHistory();

    const [comment, setComment] = useState('');
    const [starRating, setStarRating] = useState(0);
    const [difficulty, setDifficulty] = useState(''); 
    
    const {trail_id} = useParams();

    function Star({starID, marked}) {
        return (
            <span star-id={starID}>{marked ? '\u2605' : '\u2606'}</span>
        );
    };

    // function updateStarRating(event) {
    //     setStarRating(event.target.getAttribute('span-ID'));
    // }

    function StarRating() {
        return (
            <div onClick={event => setStarRating(event.target.getAttribute('star-id'))}>
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
                <Form.Label>On a scale of 1-5, how difficult was the trail? 1 = Easy, 5 = Hard</Form.Label>
                <Form.Control as="select" onChange={(event) => setDifficulty(event.target.value)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </Form.Control>
          </Form.Group>
          </div>
    )};


    function addRating(event) {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: props.user.username, trail_id: trail_id, trail_comment: comment, 
                                  trail_star: starRating, difficulty: difficulty})
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
            <form onSubmit={addRating}>

                {/* comment box */}
                <input type="textarea" placeholder="What were your thoughts about this trail?"
                onChange={(event) => {setComment(event.target.value)}}/>

                {/* star rating */}
                {StarRating()}

                {/* difficulty rating */}
                {DifficultyRating()}



                <button type="submit">Submit Review</button>

            </form>
        </div>
    );
}