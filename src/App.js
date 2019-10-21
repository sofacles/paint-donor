import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import GiveAwayPaint from './components/GiveAwayPaint';
import Home from './components/Home';
import './App.css';

function App() {
  return (
      <Router>
      <div className="App">
        <nav>
          <ul>
          <li>
              <Link to="/home">Home</Link>
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
      </div>
      <div id="modal-root"></div>
    </Router>
  );
}

export default App;
