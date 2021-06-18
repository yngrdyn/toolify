import React from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';

const Popup: React.FC<{}> = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Toolify</h1>
      </header>
    </div>
  );
};

export default Popup;
