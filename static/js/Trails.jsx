"use strict";


function Trails() {

    const [trails, setTrails] = useState([]);

    useEffect(() => {
        fetchTrails();
    }, []);


    function fetchTrails() {
        fetch("/api/trails") 
        .then(response => {
            return response.json(); 
        })
        .then(data => {
            console.log(data);

            const trails = data;

            const trailCards = 
            (
                <div>
                    {trails.map((trail, index) => {
                        return (
                            <Card key={index} style={{ width: '25rem' }}>
                                <Card.Header><Link to={`/trail/${trail.trail_id}`}>{trail.name}</Link></Card.Header>
                                <Card.Body>
                                    {trail.location}, {trail.length} miles
                                </Card.Body>
                            </Card> 
                        );
                    })
                    }
                </div>
            );
            
            setTrails(trailCards); 
        });
    };


    return (
        <div>
        {trails}
        </div>
    );
}