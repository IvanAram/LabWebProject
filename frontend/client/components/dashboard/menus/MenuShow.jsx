import React from 'react';
import {Link} from 'react-router-dom';

export default class MenuShow extends React.Component {
  componentDidMount(){
    document.getElementById("nav-title").innerHTML = "Menu";
  }

  constructor(props){
    super(props);
    this.state = {
      menu: this.props.location.query.menu
    }
  }

  renderBeverages(){
    let bevs = this.state.menu.beverages.map((b,i) =>{
      return (
        <tr key={`key-${i}`}>
          <td>{b.id}</td>
          <td>{b.name}</td>
          <td>{b.description}</td>
          <td>{b.alcoholic}</td>
        </tr>
      );
    });
    return(
      <div>
        <h3>Bebidas</h3>
        <table className="table table-striped table-responsive">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col">Alcohólica</th>
            </tr>
          </thead>
          <tbody>
            {bevs}
          </tbody>
        </table>
      </div>
    );
  }

  renderDishes() {
    let dis = this.state.menu.dishes.map((b,i) =>{
      return (
        <tr key={`key-${i}`}>
          <td>{b.id}</td>
          <td>{b.name}</td>
          <td>{b.description}</td>
        </tr>
      );
    });
    return(
      <div>
        <h3>Platillos</h3>
        <table className="table table-striped table-responsive">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {dis}
          </tbody>
        </table>
      </div>
    );
  }

  render(){
    return(
      <div className="container">
        <button type="button" className="btn btn-primary back-button">
          <i className="fas fa-chevron-left"></i>
          <small><Link to="/menus">  Regresar</Link></small>
        </button>
        <h1>Menu #{this.state.menu.id}</h1><hr/>
        <div className="text-center">
          <h3>Nombre:</h3>
          {this.state.menu.label}
          <h3>Descripción:</h3>
          {this.state.menu.description}
        </div>
        {this.renderBeverages()}
        {this.renderDishes()}
      </div>
    );
  }
}
