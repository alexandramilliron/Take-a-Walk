function Nav(props) {


    // const links = [
    //     (<li><Link key={1} to={"/"} className="nav-link">Home</Link></li>),
    //     (<li><Link key={2} to={"/new-walk"} className="nav-link">New Walk</Link></li>),
       
    // ];    
    
    // if (!props.user) {
    //     links.push(<li><Link key={3} to={"/login"} className="nav-link">Login</Link></li>);
    //     links.push(<li><Link key={4} to={"/register"} className="nav-link">Register</Link></li>);
    // };
    
    return (
    <nav className="">
    <ul className="">
        <li><Link to={"/"} className="nav-link">Home</Link></li>
        <li><Link to={"/new-walk"} className="nav-link">New Walk</Link></li>
        <li><Link to={"/login"} className="nav-link"> {props.user ? 'Logout' : 'Login'}</Link></li>
        {props.user ? "" : <li><Link to={"/register"} className="nav-link">Register</Link></li>}
    </ul>
    </nav>
    );
}