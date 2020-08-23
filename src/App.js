import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GiveAwayPaint from './components/GiveAwayPaint';
import Home from './components/Home';
import BrowsePaint from './components/BrowsePaint';
import ThankYou from './components/ThankYou';
import ThanksForMail from './components/ThanksForMail';
import { ConfirmEmail } from './components/ConfirmEmail';
import PaintChipAdmin from './components/admin/ActivePaints';
import AdminLogin from './components/admin/Login';
import SendMail from './components/SendMail';
import 'normalize.css';
import './App.css';
import RedirectIfNoToken from './components/admin/RedirectIfNoToken';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={BrowsePaint} />
          <Route exact path="/home" component={Home} />
          <Route path="/browsePaint" component={BrowsePaint} />
          <Route exact path="/giveawaypaint" component={GiveAwayPaint} />
          <Route exact path="/sendMail" component={SendMail} />
          <Route exact path="/thankyou" component={ThankYou} />
          <Route exact path="/thanksForMail" component={ThanksForMail} />
          <Route exact path="/confirm_email" component={ConfirmEmail} />
          <RedirectIfNoToken path="/admin/active-paints">
            <PaintChipAdmin />
          </RedirectIfNoToken>
          <Route exact path="/admin/login" component={AdminLogin} />
        </Switch>
      </div>
      <div id="modal-root"></div>
    </Router>
  );
}

export default App;
