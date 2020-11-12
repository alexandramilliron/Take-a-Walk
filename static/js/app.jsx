"use strict";


function App() {

  function getUser() {
    return localStorage.getItem('user');
  }

  const [user, setUser] = useState(getUser);
  console.log(user);
  

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
          <Nav user={user} setUser={setUser}/>
        <hr/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/new-walk" component={NewWalk}/>
          <Route exact path="/login">
            <Login setUser = {setUser}/>
          </Route>
          <Route exact path="/register">
            <Register setUser={setUser}/> 
      
            {/* {doStuff()} */}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
