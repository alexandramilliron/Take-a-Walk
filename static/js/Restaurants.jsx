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
            console.log(data);

            const rests = data;

            const restCards = 
            (
                <div>
                    {rests.map((rest, index) => {
                        return (
                            <Card key={index} style={{ width: '25rem' }}>
                                <Card.Header>{rest.name}</Card.Header>
                                <Card.Body>
                                    {rest.phone} <br/>
                                    {rest.location}
                                </Card.Body>
                            </Card> 
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