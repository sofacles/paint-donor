import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GiveAwayPaint from './components/GiveAwayPaint';
import Home from './components/Home';
import BrowsePaint from './components/BrowsePaint';
import ThankYou from './components/ThankYou';
import ThanksForMail from './components/ThanksForMail';
import { ConfirmEmail } from './components/ConfirmEmail';
import SendMail from './components/SendMail';
import 'normalize.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={BrowsePaint} />
        <Route exact path="/home" component={Home} />
        <Route path="/browsePaint" component={BrowsePaint} />
        <Route exact path="/giveawaypaint" component={GiveAwayPaint} />
        <Route exact path="/sendMail" component={SendMail} />
        <Route exact path="/thankyou" component={ThankYou} />
        <Route exact path="/thanksForMail" component={ThanksForMail} />
        <Route exact path="/confirm_email" component={ConfirmEmail} />
      </div>
      <div id="modal-root"></div>
    </Router>
  );
}

export default App;
