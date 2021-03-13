import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GiveAwayPaint from './components/GiveAwayPaint';
import Home from './components/Home';
import BrowsePaint from './components/BrowsePaint';
import ThankYou from './components/ThankYou';
import ThanksForMail from './components/ThanksForMail';
import { ConfirmEmail } from './components/ConfirmEmail';
import { ConfirmEmailResult } from './components/ConfirmEmailResult';
import PaintChipAdmin from './components/admin/ActivePaints';
import AdminLogin from './components/admin/Login';
import SendMail from './components/SendMail';
import 'normalize.css';
import './App.css';
import RedirectIfNoToken from './components/admin/RedirectIfNoToken';

function App() {
  const chickenSwitchOn = false;
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={(routeProps) => (
              <BrowsePaint {...routeProps} readOnlyMode={chickenSwitchOn} />
            )}
          />
          <Route
            exact
            path="/browsePaint"
            render={(routeProps) => (
              <BrowsePaint {...routeProps} readOnlyMode={chickenSwitchOn} />
            )}
          />
          <Route exact path="/home">
            <Home />
          </Route>
          <Route
            exact
            path="/giveawaypaint"
            render={(routeProps) => {
              return (
                <GiveAwayPaint {...routeProps} readOnlyMode={chickenSwitchOn} />
              );
            }}
          />
          <Route
            exact
            path="/sendMail"
            render={(routeProps) => (
              <SendMail {...routeProps} readOnlyMode={chickenSwitchOn} />
            )}
          />

          <Route exact path="/thankyou">
            <ThankYou />
          </Route>
          <Route exact path="/thanksForMail">
            <ThanksForMail />
          </Route>
          <Route
            exact
            path="/confirm_email"
            render={(props) => (
              <ConfirmEmail {...props} readOnlyMode={chickenSwitchOn} />
            )}
          />
          <Route
            exact
            path="/confirmEmailResult"
            render={(props) => <ConfirmEmailResult {...props} />}
          />
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
