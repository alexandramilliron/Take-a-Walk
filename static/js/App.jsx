'use strict';


function App() {


  function getUser() {
    return JSON.parse(localStorage.getItem('user')); 
  }

  const [user, setUser] = useState(getUser);


  return (

      <div>
        <Navigation user={user} setUser={setUser}/>
        <Switch>
          <Route exact path='/'>
            <Home user={user}/>
          </Route>
          <Route exact path='/new-walk'>
            <NewWalk user={user}/>
          </Route>
          <Route exact path='/login'>
            <Login setUser={setUser}/>
          </Route>
          <Route exact path='/register'>
            <Register setUser={setUser}/> 
          </Route>
          <Route exact path='/saved-walks'>
            <SavedWalks user={user}/> 
          </Route>
          <Route exact path='/itinerary/:walk_id'> 
            <Itinerary user={user}/>
          </Route>
          <Route exact path='/ratings/:username'>
            <UserRatings user={user}/>
          </Route>
          <Route exact path='/rest-rating/:rest_id/:name'>
            <RestRating user={user}/>
          </Route>
          <Route exact path='/trail-rating/:trail_id/:name'>
            <TrailRating user={user}/>
          </Route>
          <Route exact path='/trails'>
            <Trails user={user}/>
          </Route>
          <Route exact path='/trail/:trail_id/:name'>
            <Trail user={user}/>
          </Route>
          <Route exact path='/restaurants'>
            <Restaurants user={user}/>
          </Route>
          <Route exact path='/restaurant/:rest_id/:name'>
            <Restaurant user={user}/>
          </Route>
          <Route path='*'>
            <PageNotFound user={user}/>
          </Route>
        </Switch>
      </div>

  );
}




