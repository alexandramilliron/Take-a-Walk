"use strict";


function Trails() {

    const [trails, setTrails] = useState([]);

    useEffect(() => {
        fetchTrails();
    }, []);


    function fetchTrails() {
        fetch(`/api/trails`) 
        .then(response => {
            return response.json(); 
        })
        .then(data => {
            console.log(data);
        });
    };


    return (
        <div>
        {trails}
        </div>
    );
}