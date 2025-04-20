
## Example-1
### How Child-to-Parent Data Flow Works in React (Step-by-Step)

- **Parent component creates state** using `useState` to hold the message (`msg`).
    
- **Parent defines a function** (`handleChange`) to update that state.
    
- **Parent passes the function** to the Child component as a prop (`onInputChange`).
    
- **Child renders an input field** with an `onChange` event handler.
    
- **When user types**, the Child calls the `onInputChange` function (from props) with the new input value.
    
- **This function updates the state** in the Parent component.
    
- **Parent re-renders** and shows the updated message using `{msg}`.


### `Parent.js`

```
import React, { useState } from 'react';
import Child from './Child';

const Parent = () => {
  const [msg, setMsg] = useState('');

  const handleChange = value => {
    setMsg(value); // update state when child sends input
  };

  return (
    <div>
      <h3>Parent Component</h3>
      <p>Input from Child: {msg}</p> {/* display updated message */}
      <Child onInputChange={handleChange} />
    </div>
  );
};

export default Parent;
```


### `Child.js`


```
import React from 'react';

const Child = ({ onInputChange }) => {
  const handleChange = e => {
    onInputChange(e.target.value); // call parent's function with input value
  };

  return (
    <input
      type="text"
      placeholder="Type Here"
      onChange={handleChange}
    />
  );
};

export default Child;

```



## Example-2

```
import React, { useState } from 'react';
import Child from './Child';
const Parent = () => {
  const [msg, setMsg] = useState("");
  const onSubmitClick =(value)=>{
    setMsg(value);
  }
  return (
    <div>
      <h3>Parent Component</h3>
      <p>Data from child : {msg} </p>
      <Child onSubmit={onSubmitClick} />
    </div>
  )
}
export default Parent;
```


```
import React, { useState } from 'react';
const Child = ({onSubmit}) => {
    const [value, setValue] = useState("");
    return (
        <div>
            <h5>Child Component</h5>
            <input
                type="text"
                placeholder="Enter a message"
                value={value}
                onChange={(e)=>{
                    setValue(e.target.value)
                }}
            />
            <button
                type='button'
                onClick={()=>{
                    onSubmit(value)
                }}
            >
                Submit
            </button>
        </div>
    )
}
export default Child;
```


