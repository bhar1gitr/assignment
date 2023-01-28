import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {Api} from '../../urlConfig';
import './index.css';

const Login = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async () => {
    const user = { email, password };
    if (
      email === "" ||
      password === ""
    ) {
      return;
    }
    const res = await axios.post(`${Api}/login`, user);
    console.log(res);
    navigate('/');
  }

  const handleSignupSubmit = async () => {
    const user = { firstName, lastName, phoneNumber, email, password,address };
    if (
      firstName === "" ||
      lastName === "" ||
      phoneNumber === "" ||
      email === "" ||
      password === "" ||
      address ===""
    ) {
      return;
    }
    const res = await axios.post(`${Api}/register`, user);
    console.log(res);
    navigate('/');
  }

  return (
    <div className="container-auth">
      <input type="checkbox" id="check-auth" />
      <div className="login-auth form-auth">
        <header>Login</header>
        <form>
          <input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} value={password} />
          <Link to={"/forget"}>Forgot password?</Link>
          <input type="button" className="button-auth" onClick={handleLoginSubmit} value="Login" />
        </form>
        <div className="signup-auth">
          <span className="signup-auth">Don't have an account?
            <label htmlFor="check-auth">Signup</label>
          </span>
        </div>
      </div>
      <div className="registration-auth form-auth">
        <header>Signup</header>
        <form action="/">
          <input type="text" placeholder="FirstName" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
          <input type="text" placeholder="LastName" onChange={(e) => setLastName(e.target.value)} value={lastName} />
          <input type="tel" placeholder="Phone Number" pattern="[0-9]{10}" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
          <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <input type="text" placeholder="Enter your address" onChange={(e) => setAddress(e.target.value)} value={address} />
          <input type="password" placeholder="Create a password" onChange={(e) => setPassword(e.target.value)} value={password} />
          <input type="button" className="button-auth" onClick={handleSignupSubmit} value="Signup" />
        </form>
        <div className="signup-auth">
          <span className="signup-auth">Already have an account?
            <label htmlFor="check-auth">Login</label>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login;