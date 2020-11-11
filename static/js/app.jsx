"use strict";


function App() {
  //keep logged in here 

  const [user, setUser] = useState(null);
  

  // function doStuff() {
  //   if (true) {
  //     return (
  //       <div>Hello</div>
  //     )
  //   } else {
  //     return ...
  //   }
  // }


  return (
    <BrowserRouter>
      <div>
        <h2>Welcome to Take a Walk!</h2>
          <Nav user = {user}/>
        <hr/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/new-walk" component={NewWalk}/>
          <Route exact path="/login">
            <Login setUser = {setUser}/>
          </Route>
          <Route exact path="/register">
            <Register setUser = {setUser}/> 
            {/* {doStuff()} */}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
