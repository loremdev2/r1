```js
import React, { useState } from 'react'

import { OtpInput } from './otp-input.jsx'

  

const PhoneOtpForm = () => {

    const [phoneNumber, setPhoneNumber] = useState('')

    const [showOtpInput, setShowOtpInput] = useState(false);

  

    const handlePhoneNumber = (event) => {

        setPhoneNumber(event.target.value)

    }

  

    const handleSubmit = (event) => {

        event.preventDefault();

  

        // phone validations

        const regex = /[^0-9]/g;

        if (phoneNumber.length !== 10 || regex.test(phoneNumber)) {

            alert('Please enter a valid phone number')

            return;

        }

  

        // call the API to send OTP

        // show OTP input field

        setShowOtpInput(true);

    }

  

    const onOtpSubmit = (otp) => {

        // call the API to verify OTP

        // handle success or failure

        console.log('OTP submitted:', otp);

  

    }

  

    return (
        <div>
            <h4>Login with OTP</h4>
            {!showOtpInput ? <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={phoneNumber}
                    onChange={handlePhoneNumber}
                />
                <button type='submit'>Send OTP</button>
            </form> :
                <div>
                    <p>OTP sent to {phoneNumber}</p>
                    <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
                </div>

            }
        </div>

    )

}

  

export default PhoneOtpForm;
```



```js
import React, { useState, useRef, useEffect } from 'react';

import './otp.css';

  

export const OtpInput = ({ length, onOtpSubmit }) => {

  const [otp, setOtp] = useState(Array(length).fill(''));

  const inputRefs = useRef([]);

  

  useEffect(() => {

    inputRefs.current[0]?.focus();

  }, []);

  

  const handleChange = (index, event) => {

    const { value } = event.target;

    if (isNaN(value)) return;

  

    const newOtp = [...otp];

    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

  

    const combinedOtp = newOtp.join('');

    if (combinedOtp.length === length) {

      onOtpSubmit(combinedOtp);

    }

  

    if (value && index < length - 1) {

      inputRefs.current[index + 1]?.focus();

    }

  };

  

  const handleKeyDown = (index, event) => {

    const key = event.key;

  

    if (key === 'Backspace') {

      const newOtp = [...otp];

      if (otp[index]) {

        // Clear current box first

        newOtp[index] = '';

        setOtp(newOtp);

      } else if (index > 0) {

        inputRefs.current[index - 1]?.focus();

        newOtp[index - 1] = '';

        setOtp(newOtp);

      }

    }

  

    if (key === 'ArrowLeft' && index > 0) {

      inputRefs.current[index - 1]?.focus();

    }

  

    if (key === 'ArrowRight' && index < length - 1) {

      inputRefs.current[index + 1]?.focus();

    }

  };

  

  const handleClick = (index) => {

    inputRefs.current[index]?.focus();

  };

  

  return (

    <div>

      {otp.map((value, index) => (

        <input

          key={index}

          type="text"

          value={value}

          onChange={(event) => handleChange(index, event)}

          onKeyDown={(event) => handleKeyDown(index, event)}

          onClick={() => handleClick(index)}

          className="otp-input"

          maxLength={1}

          ref={(input) => (inputRefs.current[index] = input)}

        />

      ))}

    </div>

  );

};
```