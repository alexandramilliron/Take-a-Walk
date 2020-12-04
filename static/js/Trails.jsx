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
                            <div key={index}>
                            <Media as='li'>
                                <Image
                                    width={64}
                                    height={64}
                                    className='mr-3'
                                    src={trail.image}
                                />
                                <Media.Body>
                                    <h5><Link to={`/trail/${trail.trail_id}`}>{trail.name}</Link>
                                        {trail.avg_star ? Array.from({length: trail.avg_star}, (value, index) =>
                                        <span key={index}><i className={'fa fa-star checked'}></i></span>) : ''} 
                                    </h5>
                                    <div>
                                        <div>{trail.avg_crowd ? `${trail.avg_crowd * 100}% of users have described this trail as crowded.` : 'No reviews on crowdedness yet.'}</div>
                                        <div>{trail.avg_diff ? `On average, users have given this trail a difficulty level of ${trail.avg_diff}.` : 'No reviews on difficulty yet.'}</div>
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
            
            setTrails(trailCards); 
        });
    };


    return (
        <div>
        {trails}
        </div>
    );
}