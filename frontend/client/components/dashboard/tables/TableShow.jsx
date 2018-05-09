import React from 'react';
import {Link} from 'react-router-dom';

export default class TableShow extends React.Component {
  componentDidMount(){
    document.getElementById("nav-title").innerHTML = "Tables";
  }

  constructor(props){
    super(props);
    this.state = {
      table: this.props.location.query.table
    }
  }

  render(){
    return(
      <div className="container">
        <button type="button" className="btn btn-primary back-button">
          <i className="fas fa-chevron-left"></i>
          <small><Link to="/tables">  Regresar</Link></small>
        </button>
        <h1>Bebida #{this.state.table.id}</h1><hr/>
        <div className="text-center">
          <h3>Asientos:</h3>
          {this.state.table.seats}
        </div>
      </div>
    );
  }
}
