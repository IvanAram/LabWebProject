import React from 'react';
import {Link} from 'react-router-dom';

export default class DishShow extends React.Component {
  componentDidMount(){
    document.getElementById("nav-title").innerHTML = "Platillos";
  }

  constructor(props){
    super(props);
    this.state = {
      dish: this.props.location.query.dish
    }
  }

  render(){
    return(
      <div className="container">
        <button type="button" className="btn btn-primary back-button">
          <i className="fas fa-chevron-left"></i>
          <small><Link to="/dishes">  Regresar</Link></small>
        </button>
        <h1>Bebida #{this.state.dish.id}</h1><hr/>
        <div className="text-center">
          <h3>Nombre:</h3>
          {this.state.dish.name}
          <h3>Descripción:</h3>
          {this.state.dish.description}
        </div>
      </div>
    );
  }
}
