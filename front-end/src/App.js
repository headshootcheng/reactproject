import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './views/login'
import Register from './views/register'
import Dashboard from './views/dashboard'
export default function App() {
  
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/register" component={Register}/>
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}
