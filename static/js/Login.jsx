"use strict";

function Login(props) {


    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    function handleLogin(event) {
      event.preventDefault();

      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, password: password})
        };

        fetch('/api/login', requestOptions)
            .then(response => response.json())
            .then(data => {
              if (data['Error']) {
                alert('Invalid username or password.')
              } else {
                props.setUser(data); 
                localStorage.setItem('user', JSON.stringify(data));
                history.push('/');
              };
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

