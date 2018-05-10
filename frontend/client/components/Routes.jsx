import React from 'react';
import { Switch, Route, Router, BrowserRouter } from 'react-router-dom'

import Sidebar from './Sidebar.jsx';
import Login from './Login.jsx';
import Index from './dashboard/Index.jsx';

import BeverageList from './dashboard/beverages/BeverageList.jsx';
import BeverageShow from './dashboard/beverages/BeverageShow.jsx';
import BeverageCreate from './dashboard/beverages/BeverageCreate.jsx';
import BeverageUpdate from './dashboard/beverages/BeverageUpdate.jsx';

import DishList from './dashboard/dishes/DishList.jsx';
import DishShow from './dashboard/dishes/DishShow.jsx';
import DishCreate from './dashboard/dishes/DishCreate.jsx';
import DishUpdate from './dashboard/dishes/DishUpdate.jsx';

import CategoryList from './dashboard/categories/CategoryList.jsx';
import CategoryShow from './dashboard/categories/CategoryShow.jsx';
import CategoryCreate from './dashboard/categories/CategoryCreate.jsx';
import CategoryUpdate from './dashboard/categories/CategoryUpdate.jsx';

import WaiterList from './dashboard/waiters/WaiterList.jsx';
import WaiterShow from './dashboard/waiters/WaiterShow.jsx';
import WaiterCreate from './dashboard/waiters/WaiterCreate.jsx';
import WaiterUpdate from './dashboard/waiters/WaiterUpdate.jsx';

import TableList from './dashboard/tables/TableList.jsx';
import TableShow from './dashboard/tables/TableShow.jsx';
import TableCreate from './dashboard/tables/TableCreate.jsx';
import TableUpdate from './dashboard/tables/TableUpdate.jsx';

import MenuList from './dashboard/menus/MenuList.jsx';
import MenuShow from './dashboard/menus/MenuShow.jsx';
import MenuCreate from './dashboard/menus/MenuCreate.jsx';
import MenuUpdate from './dashboard/menus/MenuUpdate.jsx';

export default class Routes extends React.Component {

  userAuth() {
    let session = localStorage.getItem('session');
    if (session) return true;
    return false;
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Sidebar />
          <div className="bm-container">
            <Route exact path="/" component={Login} />
            <Route path="/dashboard" component={Index} />

            <Route exact path="/beverages" component={BeverageList} />
            <Route exact path="/new-beverage" component={BeverageCreate} />
            <Route exact path="/edit-beverage/:id" component={BeverageUpdate} />
            <Route path="/beverages/:id" component={BeverageShow} />

            <Route exact path="/dishes" component={DishList} />
            <Route exact path="/new-dish" component={DishCreate} />
            <Route exact path="/edit-dish/:id" component={DishUpdate} />
            <Route path="/dish/:id" component={DishShow} />

            <Route exact path="/categories" component={CategoryList} />
            <Route exact path="/new-category" component={CategoryCreate} />
            <Route exact path="/edit-category/:id" component={CategoryUpdate} />
            <Route path="/category/:id" component={CategoryShow} />

            <Route exact path="/waiters" component={WaiterList} />
            <Route exact path="/new-waiter" component={WaiterCreate} />
            <Route exact path="/edit-waiter/:id" component={WaiterUpdate} />
            <Route path="/waiter/:id" component={WaiterShow} />

            <Route exact path="/tables" component={TableList} />
            <Route exact path="/new-table" component={TableCreate} />
            <Route exact path="/edit-table/:id" component={TableUpdate} />
            <Route path="/table/:id" component={TableShow} />

            <Route exact path="/menus" component={MenuList} />
            <Route exact path="/new-menu" component={MenuCreate} />
            <Route exact path="/edit-menu/:id" component={MenuUpdate} />
            <Route path="/menu/:id" component={MenuShow} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
