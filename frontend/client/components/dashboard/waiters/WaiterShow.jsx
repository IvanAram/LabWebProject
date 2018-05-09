import React from 'react';
import {Link} from 'react-router-dom';

export default class WaiterShow extends React.Component {
  componentDidMount(){
    document.getElementById("nav-title").innerHTML = "Meseros";
  }

  constructor(props){
    super(props);
    this.state = {
      waiter: this.props.location.query.waiter
    }
  }

  render(){
    return(
      <div className="container">
        <button type="button" className="btn btn-primary back-button">
          <i className="fas fa-chevron-left"></i>
          <small><Link to="/waiters">  Regresar</Link></small>
        </button>
        <h1>Bebida #{this.state.waiter.id}</h1><hr/>
        <div className="text-center">
          <h3>Nombre:</h3>
          {this.state.waiter.name}
        </div>
      </div>
    );
  }
}
