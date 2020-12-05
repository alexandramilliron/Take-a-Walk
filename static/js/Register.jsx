'use strict';

function Register(props) {

    const history = useHistory();

    const [emailReg, setEmailReg] = useState('');
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');


    function Login() {
        history.push('/login')
    }


    function handleRegistration(event) {
        event.preventDefault();
  
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username: usernameReg, password: passwordReg, email: emailReg})
          };
  
          fetch('/api/register', requestOptions)
              .then(response => response.json())
              .then(data => {
                if (data['Error']) {
                    alert('This email or username already exists.')
                  } else {
                    props.setUser(data); 
                    localStorage.setItem('user', JSON.stringify(data));
                    history.push('/');
                  };
              });
    }


    return (
        <div>
            <Container>
                <Form onSubmit={handleRegistration}>    
                <Row>
                    <Col></Col>
                    <Col md='auto'>

                    <div className='center'>
                        <h1>Register</h1>
                    </div>
                    <br/>
    
                        <Form.Group controlId='email'>
                            <Form.Label>email</Form.Label>
                                <Form.Control placeholder='email' onChange={(event) => {setEmailReg(event.target.value)}}/>
                        </Form.Group>

                        <Form.Group controlId='username'>
                            <Form.Label>username</Form.Label>
                                <Form.Control placeholder='username' onChange={(event) => {setUsernameReg(event.target.value)}}/>
                        </Form.Group>
        
                        <Form.Group controlId='password'>
                            <Form.Label>password</Form.Label>
                                <Form.Control type='password' placeholder='password' onChange={(event) => {setPasswordReg(event.target.value)}}/>
                        </Form.Group>

                        <div className='center'>
                            <ButtonGroup vertical>
                                <Button id='registerButton' type='submit'>Register</Button>
                                <br/>
                                <Button variant='link' onClick={() => Login()}>Already have an account? Login</Button>
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