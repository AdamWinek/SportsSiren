import React from 'react';
import logo from './logo.svg';
import './App.css';
import Title from './Title';
import Header from './Header.jsx';
function App() {
  return (
    <div className="App">
      <h1>Sports Siren</h1>
      <div style={{clear: 'both'}} >
          <h3 style={{float: 'left'}}><a href="">Current Games</a></h3>
          <h3 style={{float: 'right'}}><a href="">Your Account</a></h3>
          <h3 style={{float: 'center'}}><a href="">Upcoming Games</a></h3>
      </div>
      <br></br>
      <header className="App-header">
        <div>
          <h2>Coming soon!</h2>
        </div>
        <h2>Click <a href="">here</a> to be notified when we launch. </h2>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Sports Siren.
        </p>
      </header>
    </div>
  );
}

export default App;
