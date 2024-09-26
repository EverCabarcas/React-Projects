import { useRef, useState } from "react";

export default function Login() {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredPassword, setEnteredPassword] = useState('');
  const [emailIsInValid, setEmailIsInValid] = useState(false)
  const emailRef = useRef();
  const passRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    console.log('submit')

    const enteredEmail = emailRef.current.value
    const enteredPass = passRef.current.value

    const emailIsValid = enteredEmail.includes('@')

    if(!emailIsValid){
      setEmailIsInValid(true)
      return;
    }

    setEmailIsInValid(false);

    // emailRef.current.value = '' // DO with careee
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input ref={emailRef} id="email" type="text" name="email" />
          {emailIsInValid && <div className="control-error">
            <p>Please enter a valid email address </p>
          </div>}
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input ref={passRef} id="password" type="password" name="password" />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">
          Login
        </button>
      </p>
    </form>
  );
}
