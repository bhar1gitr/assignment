import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {Api} from '../../../urlConfig';
import './index.css';

const ForgetPassword = () => {

  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const handleOnSubmit = async () => {
    const user = { email };
    if (email === "") {
      return;
    }
    localStorage.setItem('email', email);
    const res = await axios.post(`${Api}/generate-otp`, user);
    console.log(res);
    localStorage.setItem('trueOtp', res.data.otp);
    navigate('/otp');
  }
  return (
    <div className="container-forgetPass">
      <div className="forgetPass-auth form-forgetPass">
        <header>Foget Password</header>
        <form action="#">
          <input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <input type="button" className="button-forgetPass" onClick={handleOnSubmit} value="Submit" />
        </form>
        <div className="forgetPass-auth">
          <span className="forgetPass-auth">Back to
            <label><Link to={'/auth'}> Login</Link></label>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword;