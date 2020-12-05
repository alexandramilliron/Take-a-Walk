'use strict';

function Restaurant() {

    const { rest_id, name } = useParams();

    // fetch data based on business ID
    //

    return (
        <div>
            <Container>
                <Row>
                    <Col>This is the page for {name}</Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
            <Link className='btn btn-outline-secondary' to={`/rest-rating/${rest_id}/${name}`}>Leave a Review</Link>
        </div>
    );
}