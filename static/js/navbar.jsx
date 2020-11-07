function Navbar({title}) {
    return (
    <BrowserRouter>
    <nav className="navbar">
        <h1>
            {title}
        </h1>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
        <div className="content">
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>  
        </div>
    </nav>
    </BrowserRouter>
    );
}

Navbar.defaultProps = {
    title:'Take a Walk'
};