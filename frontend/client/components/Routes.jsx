import React from 'react';
import { Switch, Route, Router, BrowserRouter } from 'react-router-dom'
import Sidebar from './Sidebar.jsx';
import Login from './Login.jsx';
import Index from './dashboard/Index.jsx';

import BeverageList from './dashboard/beverages/BeverageList.jsx';
import BeverageShow from './dashboard/beverages/BeverageShow.jsx';
import BeverageCreate from './dashboard/beverages/BeverageCreate.jsx';

const Routes = (props) => {
  return (
    <BrowserRouter>
      <div>
        <Sidebar />
        <div className="bm-container">
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Index} />
          <Route exact path="/beverages" component={BeverageList} />
          <Route exact path="/new-beverage" component={BeverageCreate} />
          <Route path="/beverages/:id" component={BeverageShow} />
        </div>
      </div>
    </BrowserRouter>
  );
};
export default Routes;
