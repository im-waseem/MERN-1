import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './mix.css'

const Login = () => {
  const [passShow, setPassShow] = useState(false);
  const history = useHistory();
  const [inpval, setInpval] = useState({
    email: '',
    password: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval((prevInpval) => ({
      ...prevInpval,
      [name]: value,
    }));
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const loginuser = async (e) => {
    e.preventDefault();
    const { email, password } = inpval;

    if (email === '' || !email.includes('@')) {
      displaySnackbar('Enter a valid email address', 'error');
      return;
    }

    if (password === '' || password.length < 6) {
      displaySnackbar('Password must have at least 6 characters', 'error');
      return;
    }

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (response.status === 201) {
        const data = await response.json();
        // Save the user's token to local storage
        localStorage.setItem("userdatatoken", data.token);
        setInpval({ ...inpval, email: "", password: "" });
        displaySnackbar('Login successful!', 'success');
        history.push('/dash');
      } else {
        displaySnackbar('Invalid email or password. Please try again.', 'error');
      }
    } catch (error) {
      console.error("Login error:", error);
      displaySnackbar('An error occurred while logging in.', 'error');
    }
  }

  const displaySnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }

  return (
    <>
      <section>
        <div className='form_data'>
          <div className='form_heading'>
            <h1>Welcome Back to Login</h1>
            <p>Hi, we are glad you are back. Kindly Login</p>
          </div>
          <form>
            <div className='form_input'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                value={inpval.email}
                onChange={setVal}
                id='email'
                placeholder='Enter your Email Address'
              />
            </div>
            <div className='form_input'>
              <label htmlFor='password'>Password</label>
              <div className='two'>
                <input
                  type={passShow ? 'text' : 'password'}
                  value={inpval.password}
                  onChange={setVal}
                  name='password'
                  id='password'
                  placeholder='Enter your Password'
                />
                <div className='showpass' onClick={() => setPassShow(!passShow)}>
                  {!passShow ? 'show' : 'hide'}
                </div>
              </div>
            </div>
            <button className='btn' onClick={loginuser}>
              Login
            </button>
            <p>
              Don't have an Account? <NavLink to='/register'>Sign up</NavLink>
            </p>
          </form>
        </div>
      </section>

      {/* Success or Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
