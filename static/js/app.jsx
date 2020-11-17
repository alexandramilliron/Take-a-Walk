"use strict";


function App() {


  function getUser() {
    return JSON.parse(localStorage.getItem('user')); //opposite of JSON.stringify - turning back into JavaScript object 
  }

  const [user, setUser] = useState(getUser);


  return (
    <BrowserRouter>
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
        </Switch>
      </div>
    </BrowserRouter>
  );
}
