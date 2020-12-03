"use strict"; 

function UserRatings(props) {

    const [ratingCard, setRatingCard] = useState('');


    useEffect(() => {
        fetchRatings();
    }, []);


    function fetchRatings() {

        fetch(`/api/ratings/${props.user.username}`) 
        .then(response => {
            return response.json(); 
        })
        .then(data => {
            const ratings = data 

            const ratingCards = 
            (
            <div>
                {ratings.trail_ratings.map((rating, index) => {
                    return (
                        <Card key={index} style={{ width: '25rem' }}>
                            <Card.Header>
                                <Link to={`/trails/${rating.trail_id}`}>{rating.trail_name}</Link>
                                <span className="float-right">
                                    {Array.from({length: rating.trail_star}, (value, index) =>
                                    <span key={index}><i className={'fa fa-star checked'}></i></span>)}
                                </span>
                            </Card.Header>
                                <Card.Body>
                                    
                                    <Card.Text>
                                        {rating.rated_at}
                                        {rating.trail_comment}
                                    </Card.Text>

                                </Card.Body>
                        </Card>
                    );
                })};
            </div>
            );
            setRatingCard(ratingCards);
        });
    };

    return (
        <div>
            {props.user.username}'s Ratings
            {ratingCard}
        </div>
    );
}