import React, { useState } from 'react';
import './App.css';
import UserPosts from './components/UserPosts';
import CountdownTimer from './components/CountdownTimer';
import WindowSize from './components/WindowSize';
import ValidatedInput from './components/ValidatedInput';

function App() {
  const [activeTab, setActiveTab] = useState('all');

  // State for Exercise 1: UserPosts
  const [userId, setUserId] = useState(1);

  // State for Exercise 2: CountdownTimer
  const [timerInitialValue, setTimerInitialValue] = useState(10);
  const [timerKey, setTimerKey] = useState(0); // key trick to easily re-mount/restart timer
  const [showTimer, setShowTimer] = useState(true);

  // State for Exercise 3: WindowSize
  const [showWindowSize, setShowWindowSize] = useState(true);

  // Validation functions for Exercise 4
  const validateEmail = (val) => {
    if (!val) return true; // allow empty initially or require non-empty: email regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(val);
  };

  const validateMinLength = (val) => {
    if (!val) return true;
    return val.length >= 6;
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Exercise 13: React Hook (useEffect)</h1>
        <p className="subtitle">
          Demonstrating Data Fetching, Timers & Cleanup, Event Listeners, and Form Validation
        </p>

        <nav className="tab-navigation">
          <button
            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Exercises
          </button>
          <button
            className={`tab-button ${activeTab === 'ex1' ? 'active' : ''}`}
            onClick={() => setActiveTab('ex1')}
          >
            1. UserPosts (API Fetch)
          </button>
          <button
            className={`tab-button ${activeTab === 'ex2' ? 'active' : ''}`}
            onClick={() => setActiveTab('ex2')}
          >
            2. CountdownTimer
          </button>
          <button
            className={`tab-button ${activeTab === 'ex3' ? 'active' : ''}`}
            onClick={() => setActiveTab('ex3')}
          >
            3. WindowSize (Resize)
          </button>
          <button
            className={`tab-button ${activeTab === 'ex4' ? 'active' : ''}`}
            onClick={() => setActiveTab('ex4')}
          >
            4. ValidatedInput
          </button>
        </nav>
      </header>

      <main className="exercises-grid">
        {/* EXERCISE 1 */}
        {(activeTab === 'all' || activeTab === 'ex1') && (
          <section className="exercise-card">
            <div className="card-header">
              <span className="badge">Exercise 1</span>
              <h2>Data Fetching with useEffect (UserPosts)</h2>
              <p className="card-desc">
                Fetches posts from JSONPlaceholder API when the component mounts and refetches when <code>userId</code> changes.
              </p>
            </div>

            <div className="controls-panel">
              <label>Select User ID:</label>
              <div className="btn-group">
                {[1, 2, 3, 4, 5].map((id) => (
                  <button
                    key={id}
                    className={`btn ${userId === id ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setUserId(id)}
                  >
                    User {id}
                  </button>
                ))}
              </div>
              <div className="custom-input-group">
                <label>Or enter ID: </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={userId}
                  onChange={(e) => setUserId(Number(e.target.value) || 1)}
                  className="number-input"
                />
              </div>
            </div>

            <div className="demo-output">
              <UserPosts userId={userId} />
            </div>
          </section>
        )}

        {/* EXERCISE 2 */}
        {(activeTab === 'all' || activeTab === 'ex2') && (
          <section className="exercise-card">
            <div className="card-header">
              <span className="badge">Exercise 2</span>
              <h2>Countdown Timer with useEffect</h2>
              <p className="card-desc">
                Counts down every second using <code>setInterval</code> inside <code>useEffect</code>, stops at 0, and clears interval on unmount.
              </p>
            </div>

            <div className="controls-panel">
              <div className="control-row">
                <label>Initial Value (seconds):</label>
                <input
                  type="number"
                  min="1"
                  max="300"
                  value={timerInitialValue}
                  onChange={(e) => setTimerInitialValue(Number(e.target.value) || 0)}
                  className="number-input"
                />
                <button
                  className="btn btn-primary"
                  onClick={() => setTimerKey((prev) => prev + 1)}
                >
                  Restart / Reset
                </button>
              </div>

              <div className="control-row">
                <button
                  className={`btn ${showTimer ? 'btn-danger' : 'btn-success'}`}
                  onClick={() => setShowTimer(!showTimer)}
                >
                  {showTimer ? 'Unmount Timer (Test Cleanup)' : 'Mount Timer'}
                </button>
                <span className="status-note">
                  {showTimer ? 'Timer is active' : 'Timer component unmounted (interval cleared)'}
                </span>
              </div>
            </div>

            <div className="demo-output">
              {showTimer ? (
                <CountdownTimer key={timerKey} initialValue={timerInitialValue} />
              ) : (
                <div className="placeholder-box">Component is currently unmounted.</div>
              )}
            </div>
          </section>
        )}

        {/* EXERCISE 3 */}
        {(activeTab === 'all' || activeTab === 'ex3') && (
          <section className="exercise-card">
            <div className="card-header">
              <span className="badge">Exercise 3</span>
              <h2>Window Resize Listener with useEffect</h2>
              <p className="card-desc">
                Subscribes to the window's <code>resize</code> event on mount and removes the listener on unmount.
              </p>
            </div>

            <div className="controls-panel">
              <div className="control-row">
                <button
                  className={`btn ${showWindowSize ? 'btn-danger' : 'btn-success'}`}
                  onClick={() => setShowWindowSize(!showWindowSize)}
                >
                  {showWindowSize ? 'Unmount WindowSize (Test Cleanup)' : 'Mount WindowSize'}
                </button>
                <span className="status-note">
                  {showWindowSize ? 'Listening for resize events' : 'Listener removed via cleanup function'}
                </span>
              </div>
              <p className="hint-text">
                Tip: Try resizing your browser window or opening DevTools (F12) to see dimensions update live!
              </p>
            </div>

            <div className="demo-output">
              {showWindowSize ? (
                <WindowSize />
              ) : (
                <div className="placeholder-box">WindowSize component is unmounted.</div>
              )}
            </div>
          </section>
        )}

        {/* EXERCISE 4 */}
        {(activeTab === 'all' || activeTab === 'ex4') && (
          <section className="exercise-card">
            <div className="card-header">
              <span className="badge">Exercise 4</span>
              <h2>Form Input Validation with useEffect</h2>
              <p className="card-desc">
                Validates user input on change using <code>useEffect</code> with dependency array <code>[value, validationFunction]</code>.
              </p>
            </div>

            <div className="form-demo-container">
              <div className="form-example">
                <h4>1. Email Validation</h4>
                <p className="hint-text">Must be a valid email format (e.g. user@domain.com)</p>
                <ValidatedInput
                  label="Email Address:"
                  placeholder="Enter email..."
                  validationFunction={validateEmail}
                  errorMessage="Please enter a valid email address containing '@' and domain."
                />
              </div>

              <div className="form-example">
                <h4>2. Minimum Length Validation</h4>
                <p className="hint-text">Password/text must be at least 6 characters</p>
                <ValidatedInput
                  label="Password / Secret Code:"
                  placeholder="Enter at least 6 characters..."
                  validationFunction={validateMinLength}
                  errorMessage="Input must be at least 6 characters long."
                />
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
