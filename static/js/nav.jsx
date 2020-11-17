function Nav(props) {

    const history = useHistory(); 

    // const links = [
    //     (<li><Link key={1} to={"/"} className="nav-link">Home</Link></li>),
    //     (<li><Link key={2} to={"/new-walk"} className="nav-link">New Walk</Link></li>),
       
    // ];    
    
    // if (!props.user) {
    //     links.push(<li><Link key={3} to={"/login"} className="nav-link">Login</Link></li>);
    //     links.push(<li><Link key={4} to={"ß/register"} className="nav-link">Register</Link></li>);
    // };
    function handleLogout() {
          props.setUser(null);
          localStorage.clear();
          history.push('/');
    };
    
    return (
    <nav className="">
    <ul className="">
        <li><Link to={"/"} className="nav-link">Home</Link></li>
        <li><Link to={"/new-walk"} className="nav-link">New Walk</Link></li>
        {props.user ? <li><a href="#" onClick={handleLogout}>Logout</a></li> : <li><Link to={"/login"} className="nav-link">Login</Link></li>}
        {props.user ? "" : <li><Link to={"/register"} className="nav-link">Register</Link></li>}
    </ul>
    </nav>
    );
}