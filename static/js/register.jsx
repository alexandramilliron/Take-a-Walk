"use strict";

function Register(props) {

    const history = useHistory();

    const [emailReg, setEmailReg] = useState('');
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [validUsername, setValidUsername] = useState(''); // added validUsername state to handle data returned from server 


    useEffect(() => {
        const loggedInUser = localStorage.getItem('username');
        if (loggedInUser) {
          const foundUser = loggedInUser;
          setValidUsername(foundUser);
        }
      }, []);


    function handleRegistration(event) {
        event.preventDefault();
  
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username: usernameReg, password: passwordReg, email: emailReg})
          };
  
          fetch('/register', requestOptions)
              .then(response => response.text())
              .then((data) => {
                // TODO: refactor code to include login function  
                setValidUsername(data);
                history.push('/');
                props.setUser(true); //info about logged in user 
                localStorage.setItem('username', (data));
              });
              // added username to localStorage to reflect that they're logged in 
    }


    return (
        <div className="">
            <div className="registration">
            <h1>Register</h1>
                <form onSubmit={handleRegistration}>
                <label>Email</label>
                    <input type="text" 
                    onChange={(event) => {setEmailReg(event.target.value)}}/>
                <label>Username</label>
                    <input type="text" 
                    onChange={(event) => {setUsernameReg(event.target.value)}}/>
                <label>Password</label>
                    <input type="text" 
                    onChange={(event) => {setPasswordReg(event.target.value)}}/>
                <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}