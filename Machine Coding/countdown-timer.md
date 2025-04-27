
```js
import React, { useEffect, useState } from 'react';

import './CTimer.css';

  

const CTimer = () => {

  

    const [isStarted, setIsStarted] = useState(false);

    const [isPaused, setIsPaused] = useState(false);

    const [hours, setHours] = useState(0);

    const [minutes, setMinutes] = useState(0);

    const [seconds, setSeconds] = useState(0);

    const [timerId, setTimerId] = useState(0);

  

    const handleStart = () => {

        if (hours < 0 || minutes < 0 || seconds < 0) {

            alert("Please enter positive time values.");

            return;

        }

        if (hours === 0 && minutes === 0 && seconds === 0) {

            alert("Please set a non-zero time to start the countdown.");

  

            return;

        }

        setIsStarted(true);

    };

  
  

    const handleReset = () => {

        setIsStarted(false);  // Reset the timer and show input fields again

        setHours(0);

        setMinutes(0);

        setSeconds(0);

        clearInterval(timerId); // Clear the interval when reset

    }

  

    const handlePause = () => {

        setIsPaused(true);

        clearInterval(timerId); // Clear the interval when paused

    }

  

    const handleResume = () => {

        setIsPaused(false);

        const tid = setInterval(() => {

            runTimer(seconds, minutes, hours, tid);

        }, 1000);

        setTimerId(tid); // Set the new timer ID

    }

  

    const handleInput = (e) => {

        const { value, name } = e.target;

        const parsedValue = parseInt(value, 10) || 0; // Parse the value to an integer or set to 0 if NaN

        console.log(parsedValue, name, typeof parsedValue);

        if (name === 'hours') {

            setHours(parsedValue);

        } else if (name === 'minutes') {

            setMinutes(parsedValue);

        } else if (name === 'seconds') {

            setSeconds(parsedValue);

        }

    }

  

    const runTimer = (sec, min, hr, tid) => {

        if (sec > 0) {

            setSeconds((s) => s - 1);

        } else if (sec === 0 && min > 0) {

            setSeconds(59);

            setMinutes((m) => m - 1);

        } else if (min === 0 && hr > 0) {

            setMinutes(59);

            setHours((h) => h - 1);

            setSeconds(59);

        }

  

        if (sec === 0 && min === 0 && hr === 0) {

            clearInterval(tid); // Stop the timer when it reaches 0

            alert("Time's up!");

            setIsStarted(false); // Reset the timer and show input fields again

            setHours(0);

            setMinutes(0);

            setSeconds(0);

        }

    }

  

    useEffect(() => {

        let tid;

        // Timer should start only if isStarted is true

        if (isStarted) {

            tid = setInterval(() => {

                runTimer(seconds, minutes, hours, tid);

            }, 1000)

            setTimerId(tid);

        }

        return () => {

            // Clear the interval when the component unmounts or isStarted changes

            clearInterval(tid);

        }

  

    }, [isStarted, hours, minutes, seconds])

  

    return (

        <div className="countdown-timer">

            <h1>Countdown Timer</h1>

  

            {!isStarted ? (

                <div className="input-container">

                    <div className="input-box">

                        <input onChange={handleInput} name='hours' type="number" placeholder="HH" />

                        <input onChange={handleInput} name='minutes' type="number" placeholder="MM" />

                        <input onChange={handleInput} name='seconds' type="number" placeholder="SS" />

                    </div>

                    <button onClick={handleStart} className="timer-button">

                        Start

                    </button>

                </div>

            ) : (

                <div className="show-container">

                    <div className="timer-box">

                        <div>{hours < 10 ? `0${hours}` : hours}</div>

                        <span>:</span>

                        <div>{minutes < 10 ? `0${minutes}` : minutes}</div>

                        <span>:</span>

                        <div>{seconds < 10 ? `0${seconds}` : seconds}</div>

                    </div>

  

                    <div className="action-box">

                        <button onClick={isPaused ? handleResume : handlePause} className="timer-button">{isPaused ? "Resume" : "Pause"}</button>

                        <button onClick={handleReset} className="timer-button">Reset</button>

                    </div>

                </div>

            )}

        </div>

    );

};

  

export default CTimer;


```