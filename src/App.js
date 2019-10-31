import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import GiveAwayPaint from './components/GiveAwayPaint';
import Home from './components/Home';
import ThankYou from './components/ThankYou';
import ThanksForMail from './components/ThanksForMail';
import SendMail from './components/SendMail';
import './App.css';

function App() {
  return (
      <Router>
      <div className="App">
        <nav>
          <ul>
          <li>
              <Link to="/home">Get Some Paint</Link>
            </li>
            <li>
              <Link to="/giveawaypaint">Give away paint</Link>
            </li>
          </ul>
        </nav>

        <hr />
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route exact path="/giveawaypaint" component={GiveAwayPaint} />
        <Route exact path="/sendMail" component={ SendMail } />
        <Route exact path="/thankyou" component={ThankYou} />
        <Route exact path="/thanksForMail" component={ThanksForMail} />
      </div>
      <div id="modal-root"></div>
    </Router>
  );
}

export default App;
