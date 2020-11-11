"use strict";

function App() {
  
  const [isAuth, setIsAuth] = useState(True);

  return (
    <BrowserRouter>
      <div>
        <h2>Welcome to Take a Walk!</h2>
        <nav className="">
          <ul className="">
            <li><Link to={"/"} className="nav-link">Home</Link></li>
            <li><Link to={"/new-walk"} className="nav-link">New Walk</Link></li>
            <li><Link to={"/login"} className="nav-link">Login</Link></li>
            <li><Link to={"/register"} className="nav-link">Register</Link></li>
          </ul>
        </nav>
        <hr/>
        <Switch>
          {/* <Route exact path="/" render={() => {
          return (
            isAuth ? <Redirect to="/"/> : <Redirect to="/login" /> 
          )}} /> */}
          <Route exact path="/" component={Home}/>
          <Route exact path="/new-walk" component={NewWalk}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
