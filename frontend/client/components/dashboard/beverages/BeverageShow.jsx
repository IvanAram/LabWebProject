import React from 'react';
import {Link} from 'react-router-dom';

export default class BeverageShow extends React.Component {
  componentDidMount(){
    document.getElementById("nav-title").innerHTML = "Bebidas";
  }

  constructor(props){
    super(props);
    this.state = {
      beverage: this.props.location.query.beverage
    }
  }

  render(){
    return(
      <div className="container">
        <button type="button" className="btn btn-primary back-button">
          <i className="fas fa-chevron-left"></i>
          <small><Link to="/beverages">  Regresar</Link></small>
        </button>
        <h1>Bebida #{this.state.beverage.id}</h1><hr/>
        <div className="text-center">
          <h3>Nombre:</h3>
          {this.state.beverage.name}
          <h3>Descripción:</h3>
          {this.state.beverage.description}
          <h3>Alcohólica:</h3>
          {this.state.beverage.alcoholic}
        </div>
      </div>
    );
  }
}
