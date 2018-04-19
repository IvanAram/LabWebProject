import React from 'react';
import Navbar from './Navbar.jsx';
import style from '../master.scss';
export default class App extends React.Component {
  render() {
    return (<div>
      <Navbar />
       <div className="text-center">
          <h1>Hello World</h1>
        </div>
    </div>);
  }
}
