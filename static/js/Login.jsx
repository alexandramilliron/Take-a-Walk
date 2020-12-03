'use strict';

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
      <div className='login'>
        <h1>Login</h1>
            <Form onSubmit={handleLogin}>

              <Form.Group controlId='username'>
                <Form.Label>username</Form.Label>
                  <Form.Control type='username' placeholder='username' onChange={(event) => {setUsername(event.target.value)}}/> 
              </Form.Group>
              <Form.Group controlId='password'>
                <Form.Label>password</Form.Label>
                  <Form.Control type='password' placeholder='password' onChange={(event) => {setPassword(event.target.value)}}/>
              </Form.Group>

            <Button id='loginButton' type='submit'>Login</Button>
            
            </Form>
      </div>
    );
}

