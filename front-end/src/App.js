import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from './views/login'
import Register from './views/register'
import Dashboard from './views/dashboard'
export default function App() {
  return (
    <Router>
      <div>
        <Switch>
        <Route path="/dashboard">
            <Dashboard/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/">
            <Login/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
