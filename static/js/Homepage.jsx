'use strict';


function Home(props) {

    const history = useHistory(); 

    function newWalk() {
        history.push('/new-walk')
    }

    return (
        <div>
            <Carousel className>
            <Carousel.Item>
                <Image
                className='d-block w-100'
                src='/static/img/background1.jpg'
                alt='first slide'
                width='400px'
                fluid
                />
                <Carousel.Caption>
                    <h3>Welcome to Take a Walk!</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                className='d-block w-100'
                src='/static/img/background2.jpg'
                alt='second slide'
                fluid
                />
                <Carousel.Caption>
                    <h3></h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                className='d-block w-100'
                src='/static/img/background3.jpg'
                alt='third slide'
                fluid
                />
                <Carousel.Caption>
                    <h3></h3>
                </Carousel.Caption>
            </Carousel.Item>
            </Carousel>
        <Container fluid>
            <Row>
                <Col></Col>
                <Col xs={10}>
                <div>   
                    <p className='home-p'>
                        Welcome to Take a Walk, the site that encourages you to go outside and eat things - safely! With Take a Walk, you can 
                        generate an outing near you that includes restaurants and trails. Then, you leave a rating based on their COVID safety
                        and read what others have had to say so you can venture out with confidence.
                    </p>
                </div>
                <div>
                    <p className='center'>
                    Ready to get started? 
                    Let's take a walk! 
                    </p>
                <div className='center'>
                    <Button className='roboto-button' variant='outline-secondary' onClick={newWalk}>Start a New Walk</Button>
                </div>
                </div>
                </Col>
                <Col></Col>
            </Row>
        </Container>  
        </div>
    );
}
  
