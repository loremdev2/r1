
```js
import React, { useState } from 'react';

import './index.css';

  

const MultiStepForm = () => {

    const data = [

        { id: "name", label: "Name", inputType: "text", placeholder: "Enter your name", buttonName: "Next" },

        { id: "email", label: "Email", inputType: "email", placeholder: "Enter your email", buttonName: "Next" },

        { id: "dob", label: "Date of Birth", inputType: "date", placeholder: "Enter your date of birth", buttonName: "Next" },

        { id: "password", label: "Password", inputType: "password", placeholder: "Enter your password", buttonName: "Submit" }

    ];

  

    const [index, setIndex] = useState(0);

    const [forms] = useState(data);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        dob: "",

        password: "",

    });

  

    const handleSubmit = (e) => {

        e.preventDefault();

        if (index === forms.length - 1) {

            alert("Form submitted successfully!");

            setIsSubmitted(true);

            return;

        }

        setIndex((idx) => idx + 1);

    };

  

    const handleBack = () => {

        if (index > 0) {

            setIndex((idx) => idx - 1);

        }

    };

  

    const handleInputChange = (e) => {

        const { id, value } = e.target;

        setFormData((prev) => ({

            ...prev,

            [id]: value,

        }));

    };

  

    return (

        <div className='form-container'>

            <h2>{isSubmitted ? "Form Preview" : forms[index].label}</h2>

  

            {!isSubmitted ? (

                <form className='form' onSubmit={handleSubmit}>

                    <input

                        id={forms[index].id}

                        type={forms[index].inputType}

                        placeholder={forms[index].placeholder}

                        onChange={handleInputChange}

                        value={formData[forms[index].id]}

                        required

                    />

                    <div className="button-group">

                        {index > 0 && (

                            <button type='button' className='btn back-btn' onClick={handleBack}>

                                Back

                            </button>

                        )}

                        <button className='btn'>{forms[index].buttonName}</button>

                    </div>

                </form>

            ) : (

                <div className="form-preview">

                    <p><strong>Name:</strong> {formData.name}</p>

                    <p><strong>Email:</strong> {formData.email}</p>

                    <p><strong>Date of Birth:</strong> {formData.dob}</p>

                    <p><strong>Password:</strong> {formData.password}</p>

                </div>

            )}

        </div>

    );

};

  

export default MultiStepForm;
```