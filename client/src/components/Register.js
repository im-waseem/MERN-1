import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    fname: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const [registrationMessage, setRegistrationMessage] = useState(null);

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const addUserdata = async (e) => {
    e.preventDefault();
    const { fname, email, password, cpassword } = inpval;

    if (fname === '') {
      // Handle validation errors
      setRegistrationMessage('Please enter your name');
      return;
    } else if (email === '') {
      setRegistrationMessage('Please Enter your Email');
      return;
    } else if (!email.includes('@')) {
      setRegistrationMessage('Enter a valid Email');
      return;
    } else if (password === '') {
      setRegistrationMessage('Enter your password');
      return;
    } else if (password.length < 6) {
      setRegistrationMessage('Password must have at least 6 characters');
      return;
    } else if (cpassword === '') {
      setRegistrationMessage('Enter your Confirm password');
      return;
    } else if (cpassword.length < 6) {
      setRegistrationMessage('Confirm password must have at least 6 characters');
      return;
    } else if (password !== cpassword) {
      setRegistrationMessage('Password and Confirm password do not match');
      return;
    } else {
      // Registration is successful
      const data = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fname, email, password, cpassword
        })
      });

      const res = await data.json();

      if (res.status === 201) {
        setInpval({ fname: "", email: "", password: "", cpassword: "" });
        setRegistrationMessage('User registered successfully');
      }
    }
  }

  return (
    <div>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: 'center' }}>
              We are glad that you will be using Project Cloud to manage <br />
              your tasks! We hope that you will get to like it.
            </p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                onChange={setVal}
                value={inpval.fname}
                name="fname"
                id="fname"
                placeholder="Enter Your Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={setVal}
                value={inpval.email}
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? 'password' : 'text'}
                  value={inpval.password}
                  onChange={setVal}
                  name="password"
                  id="password"
                  placeholder="Enter Your password"
                />
                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                  {!passShow ? 'Show' : 'Hide'}
                </div>
              </div>
            </div>

            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? 'password' : 'text'}
                  value={inpval.cpassword}
                  onChange={setVal}
                  name="cpassword"
                  id="cpassword"
                  placeholder="Confirm password"
                />
                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                  {!cpassShow ? 'Show' : 'Hide'}
                </div>
              </div>
            </div>

            {registrationMessage && <p className="registration-message">{registrationMessage}</p>}

            <button className="btn" onClick={addUserdata}>
              Sign Up
            </button>
            <p>
              Already have an account? <NavLink to="/">Log In</NavLink>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Register;
