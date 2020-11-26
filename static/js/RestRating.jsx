"use strict";


function RestRating(props) {

    const history = useHistory();

    const [comment, setComment] = useState('');
    const [starRating, setStarRating] = useState(0);
    
    const {rest_id} = useParams();


    const Star = ({starID, marked}) => {
      return (
        <span star_id={starID}>{marked ? '\u2605' : '\u2606'}</span>
      );
    };

    const StarRating = () => {
      return (
        <div onClick={event => setStarRating(event.target.getAttribute('star_id'))}>
            <Star
              starID={1}
              key={'star_1'}
              marked={starRating >= 1}
            />
            <Star
              starID={2}
              key={'star_2'}
              marked={starRating >= 2}
            />
            <Star
              starID={3}
              key={'star_3'}
              marked={starRating >= 3}
            />
            <Star
              starID={4}
              key={'star_4'}
              marked={starRating >= 4}
            />
            <Star
              starID={5}
              key={'star_5'}
              marked={starRating >= 5}
            />
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
                <input type="textarea" placeholder="What were your thoughts about this restaurant?"
                onChange={(event) => {setComment(event.target.value)}}/>

                {/* star rating */}
                {StarRating()}



                <button type="submit">Submit Review</button>

            </form>
        </div>
    );
}