import React from 'react';
import {Link} from 'react-router-dom';


export default class MenuCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name_error: "Introducir un nombre",
      show_name: false,
      desc_error: "Introudcir una descripcion del menu",
      show_desc: false,
      menu_created:  false,
      menu_id: 0,
      dishes: [],
      beverages: [],
      newDishes: [],
      newBeverages: []
    };
  }
  componentDidMount(){
    document.getElementById("nav-title").innerHTML = "Menus";
    // get newDishes
    fetch('http://localhost:3000/dishes', { method: 'get' })
      .then(res => res.json())
      .then(res => {
        if(res.status == 0) {
          this.setState({
            newDishes: res.data,
            newDishesLoaded: true
           });
          console.log(res);
        } else {
          console.log(res);
        }
      })
      .catch(e => console.log(e));
      // get newBeverages
      fetch('http://localhost:3000/beverages', { method: 'get' })
        .then(res => res.json())
        .then(res => {
          if(res.status == 0) {
            this.setState({
              newBeverages: res.data
             });
            console.log(res);
          } else {
            console.log(res);
          }
        })
        .catch(e => console.log(e));
  }

  create(e) {
    e.preventDefault();
    let name = document.getElementById("name").value.trim(),
        description = document.getElementById("desc").value.trim(),
        errors = false;
    if (name == '') {
      errors = true;
      this.setState({
        show_name: true
      });
    }
    if (description == '') {
      errors = true;
      this.setState({
        show_desc: true
      });
    }
    if (errors) return;
    this.saveResults(name, description);
  }

  saveResults(name, description){
    let params = {
      label: name,
      description: description
    };
    fetch('http://localhost:3000/menus', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then(res => res.json())
    .then(res => {
      if (res.status == 1) {
        throw 'Error happend will requesting';
      } else {
        console.log(res);
        this.setState({
          menu_created: true,
          menu_id: res.data
        });
      }
    })
    .catch(error => console.log(error));
  }

  showError(error) {
    return(
      <small className="form-error">{error}</small>
    );
  }

  renderBeverages(){
    let bevs = this.state.beverages.map((b,i) =>{
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

  addBeverage(){
    let opt = this.state.newBeverages.map(d => <option key={`bev-${d.id}`} value={d.id}>{d.name}</option>);
    return(
      <div className="row">
        <div className="col-sm-8 form-group">
          <label>Agregar bebida</label>
          <select className="form-control" id="newB">
            {opt}
          </select>
        </div>
        <div className="col-sm-4">
          <button className="btn btn-primary" onClick={this.beverageRequest.bind(this)}>
            Agregar
          </button>
        </div>
      </div>
    );
  }

  beverageRequest(e){
    e.preventDefault();
    let beverageId = document.getElementById("newB").value;
    let beverages = this.state.beverages,
        newBev = this.state.newBeverages;
    let params = {
      m_id: this.state.menu_id,
      b_id: beverageId
    };
    fetch('http://localhost:3000/menus/addBeverage', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then(res => res.json())
      .then(res => {
        if(res.status == 0){
          beverages.push(newBev[beverageId-1]);
          this.setState({
            beverages: beverages
          });
        }
        console.log(res);
      })
      .catch(e => console.log(e));
  }


  renderDishes() {
    let dis = this.state.dishes.map((b,i) =>{
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

  addDish(){
    let opt = this.state.newDishes.map(d => <option key={`dis-${d.id}`} value={d.id}>{d.name}</option>);
    return(
      <div className="row">
        <div className="col-sm-8 form-group">
          <label>Agregar platillo</label>
          <select className="form-control" id="newD">
            {opt}
          </select>
        </div>
        <div className="col-sm-4">
          <button type="button" className="btn btn-primary" onClick={this.dishRequest.bind(this)}>
            Agregar
          </button>
        </div>
      </div>
    );
  }

  dishRequest(e){
    e.preventDefault();
    let dishId = document.getElementById("newD").value;
    let dishes = this.state.dishes,
        newDis = this.state.newDishes;
    let params = {
      m_id: this.state.menu_id,
      d_id: dishId
    };
    fetch('http://localhost:3000/menus/addDish', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
      .then(res => res.json())
      .then(res => {
        if(res.status == 0){
          dishes.push(newDis[dishId-1]);
          this.setState({
            dishes: dishes
          });
        }
        console.log(res);
      })
      .catch(e => console.log(e));
  }

  form(){
    return(
      <form name="newBev" className="forms">
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" id="name" className="form-control"/>
          {this.state.show_name ? this.showError(this.state.name_error) : ''}
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea row="3" id="desc" className="form-control"/>
          {this.state.show_desc ? this.showError(this.state.desc_error) : ''}
        </div>

        <button type="button" className="btn btn-primary center-block" onClick={this.create.bind(this)}>Crear</button>
      </form>
    );
  }

  tables() {
    return(
      <div>
        {this.renderBeverages()}
        {this.addBeverage()}
        {this.renderDishes()}
        {this.addDish()}
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
        {this.state.menu_created ? this.tables() : this.form()}
      </div>
    );
  }
}
