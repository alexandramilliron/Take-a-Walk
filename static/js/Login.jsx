'use strict';

function Login(props) {


    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    function Register() {
      history.push('/register')
    }


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
      <div>
        <Container fluid>
            <Form onSubmit={handleLogin}>

            <Row>
              <Col></Col>

              <Col md='auto' className='border rounded-lg' 
              style={{ padding: 12 + 'em', background: "transparent url('/static/img/loginbg.jpeg') no-repeat center center /cover" }}>

              <div className='center'>
                <h1 className='choose-h2'>Login</h1>
              </div>
              <br/>
              
              <Form.Group controlId='username'>
                <Form.Label className='choose-h2'><span className='fa fa-user login-icon fa-lg'></span>{' '}username</Form.Label>
                  <Form.Control type='username' placeholder='username' onChange={(event) => {setUsername(event.target.value)}}/> 
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label className='choose-h2'><span className='fa fa-lock login-icon fa-lg'></span>{' '}password</Form.Label>
                  <Form.Control type='password' placeholder='password' onChange={(event) => {setPassword(event.target.value)}}/>
              </Form.Group>

              <div className='center'>
                <ButtonGroup vertical>
                  <Button type='submit' className='roboto-button' variant='secondary'>Login</Button>
                  <br/>
                  <Button className='roboto-button' variant='secondary' onClick={() => Register()}>Want to sign up? Register</Button>
                </ButtonGroup>
              </div>

              </Col>

              <Col></Col>
            </Row>
          
            </Form>
        </Container>
      </div>
    );
}

