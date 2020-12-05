'use strict';

function Restaurant() {

    const { rest_id } = useParams();

    // fetch data based on business ID
    //

    return (
        <div>
            <Container>
                <Row>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
            <Link className='btn btn-outline-secondary' to={`/rest-rating/${rest_id}`}>Leave a Review</Link>
        </div>
    );
}