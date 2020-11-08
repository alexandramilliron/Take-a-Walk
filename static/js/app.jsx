"use strict";

function App() {
  return (
    <HashRouter>
      <div>
        <h2>Welcome to Take a Walk!</h2>
        <nav className="">
          <ul className="">
            <li><Link to={"/"} className="nav-link">Home</Link></li>
            <li><Link to={"/new-walk"} className="nav-link">New Walk</Link></li>
            <li><Link to={"/login"} className="nav-link">Login</Link></li>
          </ul>
        </nav>
        <hr/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/new-walk" component={NewWalk}/>
          <Route exact path="/login" component={Login}/>
        </Switch>
      </div>
    </HashRouter>
  );
}
