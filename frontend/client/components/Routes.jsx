import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Login from './Login.jsx';
import Index from './dashboard/Index.jsx';

// SE PUEDE CAMBIAR A UN const NAMAS QUE NO SE COMO SE HACE EL export DE ESE

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Index} />
      </Switch>
    );
  }
}
