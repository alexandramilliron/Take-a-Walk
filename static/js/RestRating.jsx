"use state";


function RestRating(props) {

    const history = useHistory();

    const [comment, setComment] = useState('');


    function addRating(event) {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user_id: props.user.user_id, rest_id: props.rest_id, rest_comment: comment})
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

                <input type="textarea" placeholder="What were your thoughts about this restaurant?"
                onChange={(event) => {setComment(event.target.value)}}/>

                <button type="submit">Submit Review</button>

            </form>
        </div>
    );
}