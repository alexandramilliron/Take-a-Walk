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
                                        <div>{rest.avg_mask ? `${rest.avg_mask * 100}% of users reported mask usage.` : 'No reviews on masks yet.'}</div>                                       
                                        <div>{rest.avg_out ? `${rest.avg_out * 100}% of users reported outdoor seating was available.` : 'No reviews on outdoor seating yet.'}</div>                                       
                                        <div>{rest.avg_soc ? `${rest.avg_soc * 100}% of users reported they were able to socially distance.` : 'No reviews on social distancing yet.'}</div>
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