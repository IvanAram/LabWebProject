import React from 'react';
import {Link} from 'react-router-dom';

export default class CategoryShow extends React.Component {
  componentDidMount(){
    document.getElementById("nav-title").innerHTML = "Categoria";
  }

  constructor(props){
    super(props);
    this.state = {
      category: this.props.location.query.category
    }
  }

  render(){
    return(
      <div className="container">
        <button type="button" className="btn btn-primary back-button">
          <i className="fas fa-chevron-left"></i>
          <small><Link to="/dishes">  Regresar</Link></small>
        </button>
        <h1>Bebida #{this.state.category.id}</h1><hr/>
        <div className="text-center">
          <h3>Nombre:</h3>
          {this.state.category.label}
        </div>
      </div>
    );
  }
}
