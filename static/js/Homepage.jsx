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
                className="d-block w-100"
                src="/static/img/background1.jpg"
                alt="First slide"
                width="400px"
                fluid
                />
                <Carousel.Caption>
                    <h3>Welcome to Take a Walk!</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                className="d-block w-100"
                src="/static/img/background2.jpg"
                alt="Second slide"
                fluid
                />
                <Carousel.Caption>
                    <h3></h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                className="d-block w-100"
                src="/static/img/background3.jpg"
                alt="Third slide"
                fluid
                />
                <Carousel.Caption>
                    <h3></h3>
                </Carousel.Caption>
            </Carousel.Item>
            </Carousel>
         
        <div>   
            <p>
               <i className="fas fa-head-side-mask"></i>
                It's been (read: continues to be) a tough year. Though it's important to do everything you can to stay safe,
                you also have to find ways to stay sane. That's where Take a Walk comes in. With Take a Walk, you can 
                generate an outing near you that includes local walking trails and restaurants with the ADDED BONUS of reviews
                based on how COVID-safe the trails and restaurants were. That way, you can get outside with a little more confidence.
            </p>
            <p>
                Ready to get started? 
                Let's take a walk! 
            </p>
            <Button onClick={newWalk}>Start a New Walk</Button>
        </div>

        </div>
    );
}
  
