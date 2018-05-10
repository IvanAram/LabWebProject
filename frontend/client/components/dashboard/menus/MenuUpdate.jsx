import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';

export default class MenuUpdate extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        name_error: "Introducir un nombre",
        show_name: false,
        desc_error: "Introudcir una descripcion del proyecto",
        show_desc: false,
        menu: this.props.location.query.menu,
        beverages: this.props.location.query.menu.beverages,
        dishes: this.props.location.query.menu.dishes,
        newDishes: [],
        newDishesLoaded: false,
        newBeverages: [],
        newBeveragesLoaded: false
      };
      this.removeDish = this.removeDish.bind(this);
      this.removeBeverage = this.removeBeverage.bind(this);
  }

  componentWillMount() {
    let dis = this.state.dishes;
    // get newDishes
    fetch('http://localhost:3000/dishes', { method: 'get' })
      .then(res => res.json())
      .then(res => {
        if(res.status == 0) {
          let ds = res.data.filter(d => dis.indexOf(d) );
          this.setState({
            newDishes: ds,
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
            let ds = res.data.filter(d => dis.indexOf(d) );
            this.setState({
              newBeverages: ds,
              newBeveragesLoaded: true
             });
            console.log(res);
          } else {
            console.log(res);
          }
        })
        .catch(e => console.log(e));
  }

  componentDidMount(){
    document.getElementById("nav-title").innerHTML = "Menus";
    let name = document.getElementById("name"),
        description = document.getElementById("desc");
    name.value = this.state.menu.label;
    description.value = this.state.menu.description;
  }

  showError(error) {
    return(
      <small className="form-error">{error}</small>
    );
  }

  update(e) {
    e.preventDefault();
    let name = document.getElementById("name").value.trim(),
        description = document.getElementById("desc").value.trim(),
        alcoholic = document.getElementById("alc").checked,
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
          name: name,
          description: description
        },
        id = this.state.menu.id;
    fetch(`http://localhost:3000/menus/${id}`, {
      method: 'PUT',
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
        this.props.history.push("/menus");
      }
    })
    .catch(error => console.log(error));
  }

  removeBeverage(menuId, beverageId){
    let params = {
      m_id: menuId,
      b_id: beverageId
    };
    let items = [],
        bevs = this.state.beverages;
    var that = this;
    // this existe aqui
    fetch('http://localhost:3000/menus/deleteBeverage', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then(res => res.json())
      .then(res => {
        // aqui no
        if (res.status == 1) {
          throw 'Error happend will requesting';
        } else {
          console.log(res);
          console.log(that);
          items = that.state.beverages.filter(item => item.id !== beverageId);
          this.setState({
            beverages: items
          });
        }
      })
      .catch(error => console.log(error));
      // this existe aqui tambien

  }

  renderBeverage(){
    let menuId = this.state.menu.id,
        bevs = this.state.menu.beverages.map((b,i) =>{
          return (
            <tr key={`key-${i}`}>
              <td>{b.id}</td>
              <td>{b.name}</td>
              <td>{b.description}</td>
              <td>{b.alcoholic}</td>
              <td>
                <a className="btn btn-danger" onClick={()=> this.removeBeverage(menuId, b.id)}>
                  Eliminar
                </a>
              </td>
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
      m_id: this.state.menu.id,
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


  removeDish(menuId, dishId, e){
    e.preventDefault();
    let params = {
      m_id: menuId,
      d_id: dishId
    }, dis = this.state.dishes;

    fetch('http://localhost:3000/menus/deleteDish', {
      method: 'DELETE',
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
          let dishes = dis.filter(item => item.id !== dishId);
          this.setState({
            dishes: dishes
          });
        }
      })
      .catch(error => console.log(error));
  }

  renderDishes(){
    let menuId = this.state.menu.id,
        dis = this.state.menu.dishes.map((m,i) =>{
      return (
        <tr key={`key-${i}`}>
          <td>{m.id}</td>
          <td>{m.name}</td>
          <td>{m.description}</td>
          <td>
            <a className="btn btn-danger" onClick={this.removeDish.bind(menuId, m.id)}>
              Eliminar
            </a>
          </td>
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
              <th scopre="col"></th>
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
      m_id: this.state.menu.id,
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
      <form name="editBev" className="forms">
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
        <button type="button" className="btn btn-primary center-block" onClick={this.update.bind(this)}>Actualizar</button>
      </form>
    );
  }

  render(){
    return(
      <div className="container">
        <button type="button" className="btn btn-primary back-button">
          <i className="fas fa-chevron-left"></i>
          <small><Link to="/menus">  Regresar</Link></small>
        </button>
        {this.form()}
        {this.renderBeverage()}
        {this.state.newBeveragesLoaded ? this.addBeverage(): 'Not loaded'}
        {this.renderDishes()}
        {this.state.newDishesLoaded ? this.addDish(): 'Not loaded'}
      </div>
    );
  }
}
