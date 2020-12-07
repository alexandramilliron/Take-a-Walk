'use strict';


function Restaurant() {

    const { rest_id, name } = useParams();

    const [d, setD] = useState(''); 


    useEffect(() => {
        fetchRestaurantDetails();
    }, []);


    function fetchRestaurantDetails() {

        fetch(`/api/restaurant-details?rest_id=${rest_id}`)
        .then(response => {
            return response.json();
        })
        .then(data => {

            const rest = data;

            function display_rest() {

                return (
                <div>
                    {rest.name}
                </div>
                )}
        
            setD(display_rest)
        });
    }


    return (
        <div>
            <Container fluid>
                <Row>
                    <Col></Col>
                    <Col md='auto'>{name}</Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>{d}</Col>
                    <Col></Col>
                </Row>
            </Container>
            <Link className='btn btn-outline-secondary' to={`/rest-rating/${rest_id}/${name}`}>Leave a Review</Link>
        </div>
    );
}