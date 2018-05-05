import React from 'react';
import Routes from './Routes.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import TopBar from './ui/Navbar.jsx';
import Sidebar from './ui/Sidebar.jsx';

import style from '../master.scss';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          {/* <TopBar /> */}
          <Sidebar />
          <Routes />
        </div>
      </Router>
    );
  }
}
