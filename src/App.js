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
          <Route exact path="/">
            <BrowsePaint />
          </Route>
          <Route exact path="/browsePaint">
            <BrowsePaint />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/giveawaypaint">
            <GiveAwayPaint />
          </Route>
          <Route
            exact
            path="/sendMail"
            render={(props) => <SendMail {...props} />}
          />

          <Route exact path="/thankyou">
            <ThankYou />
          </Route>
          <Route exact path="/thanksForMail">
            <ThanksForMail />
          </Route>
          <Route exact path="/confirm_email">
            <ConfirmEmail />
          </Route>
          <RedirectIfNoToken path="/admin/active-paints">
            <PaintChipAdmin />
          </RedirectIfNoToken>
          <Route exact path="/admin/login">
            <AdminLogin />
          </Route>
        </Switch>
      </div>
      <div id="modal-root"></div>
    </Router>
  );
}

export default App;
