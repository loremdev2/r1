
```js
import React, {useState }from 'react';

import './index.css';

const MultiStepForm = () => {

    const data=[{

        id: "name",

        label: "Name",

        inputType: "text",

        placeholder: "Enter your name",

        buttonName: "Next",

    },{

        id: "email",

        label: "Email",

        inputType: "email",

        placeholder: "Enter your email",

        buttonName: "Next",

    },{

        id: "dob",

        label: "Date of Birth",

        inputType: "date",

        placeholder: "Enter your date of birth",

        buttonName: "Next",

    },{

        id: "password",

        label: "Password",

        inputType: "password",

        placeholder: "Enter your password",

        buttonName: "Submit",

    }]

  

    const [index, setIndex]= useState(0);

    const [forms, setForms]= useState(data);

    const [formData, setFormData]= useState({

        name: "",

        email: "",

        dob: "",

        password: "",

    });

  
  

    const handleSubmit=(e)=>{

        e.preventDefault();

        if(index=== forms.length-1){

            alert("Form submitted successfully!");

            setFormData({

                name: "",

                email: "",

                dob: "",

                password: "",

            })

            setIndex(0); // Reset to the first step after submission

            return;

        }

        setIndex((idx)=> idx + 1);

  

    }

  

    const handleBack=()=>{

        if(index>0){

            setIndex((idx)=> idx - 1);

        }

    }

  

    const handleInputChange = (e) => {

        const { id, value } = e.target;

        console.log(id, value); // This will now print properly!

        setFormData((prevData) => ({

            ...prevData,

            [id]: value,

        }));

    }

    return (

        <div className='form-container'>

                <h2>{forms[index].label}</h2>

                <form className='form' onSubmit={handleSubmit}>

                <input

                    id={forms[index].id}

                    type={forms[index].inputType}

                    placeholder={forms[index].placeholder}

                    onChange={handleInputChange}

                    value= {formData[forms[index].id]}

                    required

  

                />

                <div className="button-group">

                    {index>0 && <button type='button' className='btn back-btn' onClick={handleBack}>Back</button>}

                    <button className='btn'>{forms[index].buttonName}</button>

                </div>

            </form>

  

            <div className="form-preview">

                <h3>Live Form Preview</h3>

                <pre>{JSON.stringify(formData, null, 2)}</pre>

            </div>

        </div>

    )

}

  

export default MultiStepForm;
```