import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Login from './Login.jsx';
import Index from './dashboard/Index.jsx';


export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Login} />
        <Route path="dashboard/" component={Index} />
      </Switch>
    );
  }
}
