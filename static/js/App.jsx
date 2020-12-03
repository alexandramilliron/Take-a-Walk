"use strict";


function App() {


  function getUser() {
    return JSON.parse(localStorage.getItem('user')); //opposite of JSON.stringify - turning back into JavaScript object 
  }

  const [user, setUser] = useState(getUser);


  return (

      <div>
        <h2>Take a Walk</h2>
          <Nav user={user} setUser={setUser}/>
        <hr/>
        <Switch>
          <Route exact path="/">
            <Home user={user}/>
          </Route>
          <Route exact path="/new-walk">
            <NewWalk user={user}/>
          </Route>
          <Route exact path="/login">
            <Login setUser={setUser}/>
          </Route>
          <Route exact path="/register">
            <Register setUser={setUser}/> 
          </Route>
          <Route exact path="/saved-walks">
            <SavedWalks user={user}/> 
          </Route>
          <Route exact path="/itinerary/:walk_id"> 
            <Itinerary user={user}/>
          </Route>
          <Route exact path="/ratings/:username">
            <UserRatings user={user}/>
          </Route>
          <Route exact path="/rest-rating/:rest_id">
            <RestRating user={user}/>
          </Route>
          <Route exact path="/trail-rating/:trail_id">
            <TrailRating user={user}/>
          </Route>
          <Route exact path="/trails">
            <Trails user={user}/>
          </Route>
          {/* <Route exact path="/trails/:trail_id">
            <Trails user={user}/>
          </Route> */}
          <Route exact path="/restaurants">
            <Restaurants user={user}/>
          </Route>
          <Route path="*">
            <PageNotFound user={user}/>
          </Route>
        </Switch>
      </div>

  );
}

// on backend, handle not found if it's an API 


