"use strict";

// navigation bar at top of page 
    // Login/Logout embedded      
        // if logged in: 
        // "My Ratings"
        // "My Saved Walks"
// brief introduction to site
// "New Walk" button 

function Home(props) {

    const history = useHistory(); 

    function newWalk() {
        history.push('/new-walk')
    }


    return (
        <div>
            <h2>Welcome to Take a Walk!</h2>
            <p>
                It's been (read: continues to be) a tough year. Though it's important to do everything you can to stay safe,
                you also have to find ways to stay sane. That's where Take a Walk comes in. With Take a Walk, you can 
                generate an outing near you that includes local walking trails and restaurants so you can get outside. Here's 
                the thing: the trails and restaurants are reviewed by people who've recently visited, based on how COVID-safe 
                the trails and restaurants were to help you feel more confident before venturing outside. 
            </p>
            <p>
                Ready to get started? 
                Let's take a walk! 
            </p>
            <button onClick={newWalk}>Start a New Walk</button>
        </div>
    );
}
  
