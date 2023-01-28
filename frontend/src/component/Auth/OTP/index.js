import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Api} from '../../../urlConfig';
import './index.css';

const OTP = () => {

  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const navigate = useNavigate();

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otp = otp1+otp2+otp3+otp4;
    const trueOtp = localStorage.getItem('trueOtp');
    const user = {otp, trueOtp};
    console.log(user);
    const res = await axios.post(`${Api}/verify-otp`, user);
    console.log(res);
    navigate('/reset');
  }


  // iterate over all inputs
  useEffect(() => {
    const inputs = document.querySelectorAll("input"),
    button = document.querySelector("button");
    inputs.forEach((input, index1) => {
      input.addEventListener("keyup", (e) => {
        // This code gets the current input element and stores it in the currentInput variable
        // This code gets the next sibling element of the current input element and stores it in the nextInput variable
        // This code gets the previous sibling element of the current input element and stores it in the prevInput variable
        const currentInput = input,
          nextInput = input.nextElementSibling,
          prevInput = input.previousElementSibling;

        // if the value has more than one character then clear it
        if (currentInput.value.length > 1) {
          currentInput.value = "";
          return;
        }
        // if the next input is disabled and the current value is not empty
        //  enable the next input and focus on it
        if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
          nextInput.removeAttribute("disabled");
          nextInput.focus();
        }

        // if the backspace key is pressed
        if (e.key === "Backspace") {
          // iterate over all inputs again
          inputs.forEach((input, index2) => {
            // if the index1 of the current input is less than or equal to the index2 of the input in the outer loop
            // and the previous element exists, set the disabled attribute on the input and focus on the previous element
            if (index1 <= index2 && prevInput) {
              input.setAttribute("disabled", true);
              input.value = "";
              prevInput.focus();
            }
          });
        }
        //if the fourth input( which index number is 3) is not empty and has not disable attribute then
        //add active class if not then remove the active class.
        if (!inputs[3].disabled && inputs[3].value !== "") {
          button.classList.add("active-otp");
          return;
        }
        button.classList.remove("active-otp");
      });
    });
    //focus the first input which index is 0 on window load
    window.addEventListener("load", () => inputs[0].focus());
  }, []);

  return (
    <div className="container-otp">
      <header>
        <i className="bx bxs-check-shield"></i>
      </header>
      <h4>Enter OTP Code</h4>
      <form action="#">
        <div className="input-field-otp">
          <input type="number" onChange={(e)=>setOtp1(e.target.value)} value={otp1} />
          <input type="number" onChange={(e)=>setOtp2(e.target.value)} value={otp2} disabled />
          <input type="number" onChange={(e)=>setOtp3(e.target.value)} value={otp3} disabled />
          <input type="number" onChange={(e)=>setOtp4(e.target.value)} value={otp4} disabled />
        </div>
        <button onClick={handleOtpSubmit}>Verify OTP</button>
      </form>
    </div>
  )
}

export default OTP;