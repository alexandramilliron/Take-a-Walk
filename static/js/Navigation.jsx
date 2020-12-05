function Navigation(props) {

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
    <Navbar id="navbar" bg="light" sticky="top" >

    <Navbar.Brand href="/" className='nav-brand'>
        <span 
        style={{ width: 30 + 'em', height: 30 + 'em' }}
        >
        <i className='fa fa-tree'></i><i className='fa fa-cutlery'></i>
        </span> {' '}
      Take a Walk
    </Navbar.Brand>

    <Nav className='ml-auto'>
        <Link to={"/"} className="nav-link">HOME</Link>
        <Link to={"/new-walk"} className="nav-link">NEW WALK</Link>
        <Link to={"/restaurants"} className="nav-link">ALL RESTAURANTS</Link>
        <Link to={"/trails"} className="nav-link">ALL TRAILS</Link>
        {props.user ? "" : <Link to={"/register"} className="nav-link">REGISTER</Link>}
        {props.user ? <Link to={"/saved-walks"} className="nav-link">MY WALKS</Link> : ""}
        {props.user ? <Link to={`/ratings/${props.user.username}`} className="nav-link">MY RATINGS</Link> : ""}
        {props.user ? <Link to="#" className="nav-link" onClick={handleLogout}>LOGOUT</Link> : <Link to={"/login"} className="nav-link">LOGIN</Link>}

        
    </Nav>
    </Navbar>
    );
}