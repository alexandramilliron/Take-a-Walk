"use strict";

function Restaurants() {
    
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetchRestaurants();
    }, []);


    function fetchRestaurants() {
        fetch("/api/restaurants") 
        .then(response => {
            return response.json(); 
        })
        .then(data => {
            
            const rests = data;

            const restCards = 
            (
                <div>
                    {rests.map((rest, index) => {
                        return (
                            <div key={index}>
                            <Media as='li'>
                                <Image
                                    width={64}
                                    height={64}
                                    className='mr-3'
                                    src={rest.image}
                                />
                                <Media.Body>
                                    <h5><Link to={`/restaurant/${rest.rest_id}`}>{rest.name}</Link>{'  '} 
                                        {rest.avg_star ? Array.from({length: rest.avg_star}, (value, index) =>
                                        <span key={index}><i className={'fa fa-star checked'}></i></span>) : ''} 
                                    </h5>
                                    <div>
                                        <div>{(rest.avg_mask == null) ? 'No reviews on masks yet.' : `${rest.avg_mask}% of users reported mask usage.`}</div>                                       
                                        <div>{(rest.avg_out == null) ? 'No reviews on outdoor seating yet.' : `${rest.avg_out}% of users reported outdoor seating was available.`}</div>                                       
                                        <div>{(rest.avg_soc == null) ? 'No reviews on social distancing yet.' : `${rest.avg_soc}% of users reported they were able to socially distance.`}</div>
                                    </div>
                                </Media.Body>
                            </Media>
                            <br/>
                            </div>
                        );
                    })
                    }
                </div>
            );
            
            setRestaurants(restCards); 

        });
    };

    return (
        <div>
            {restaurants}
        </div>
    );
}