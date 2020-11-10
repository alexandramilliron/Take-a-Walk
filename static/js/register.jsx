function Register() {

    const [emailReg, setEmailReg] = useState("");
    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    function handleRegistration(event) {
        event.preventDefault();
  
        const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username: usernameReg, password: passwordReg, email: emailReg})
          };
  
          fetch('/register', requestOptions)
              .then(response => response.json())
              .then(data => console.log(data));
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