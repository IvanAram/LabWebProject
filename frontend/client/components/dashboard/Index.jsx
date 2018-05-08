import React from 'react';
import { Link } from 'react-router-dom';


export default class Index extends React.Component {
  componentDidMount(){
    document.getElementById("nav-title").innerHTML = "Index";
  }
  render() {
    return (
      <div>
        <h1>Index!</h1>
        <Link to="/beverages">Beverages</Link>
      </div>
    );
  }
}
