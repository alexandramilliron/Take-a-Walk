"use strict";

function Login(props) {

    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validUsername, setValidUsername] = useState('');


    useEffect(() => {
      const loggedInUser = localStorage.getItem('username');
      if (loggedInUser) {
        const foundUser = loggedInUser;
        setValidUsername(foundUser);
      }
    }, []);


    function handleLogout() {
      console.log('logging out');
      setValidUsername('');
      setUsername('');
      setPassword('');
      props.setUser(false);
      localStorage.clear();
    };


    if (validUsername) {
      return (
        <div>
          {username} is logged in <br/>
          <button onClick={handleLogout}>Logout</button>
        </div>
      );
    }
  

    function handleLogin(event) {
      event.preventDefault();

      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, password: password})
        };

        fetch('/login', requestOptions)
            .then(response => response.text())
            .then((data) => {
              setValidUsername(data);
              history.push('/');
              props.setUser(true); //info about logged in user 
              localStorage.setItem('username', (data));
            });
    }
  

    return (
      <div className="login">
        <h1>Login</h1>
            <form onSubmit={handleLogin}>
            
            <input type="text" placeholder="username"
            onChange={(event) => {setUsername(event.target.value)}}/>

            <input type="text" placeholder="password" 
            onChange={(event) => {setPassword(event.target.value)}}/>

            <button type="submit">Login</button>
            
            </form>
      </div>
    );
}

