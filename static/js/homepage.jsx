// navigation bar at top of page 
    // Login/Logout embedded      
        // if logged in: 
        // "My Ratings"
        // "My Saved Walks"
// brief introduction to site
// "New Walk" button 


function Main() {
    return (
        <HashRouter>
        <div>
         <h1>Simple SPA</h1>
            <ul className="header">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
              <li><NavLink to="/new-walk">New Walk</NavLink></li>
            </ul>
            <div className="content">
                <Route path="/"/>
                <Route path="/login" component={Login}/>  
                <Route path="/new-walk" component={NewWalk}/>  
            </div>
        </div>
        </HashRouter>
    );
}

