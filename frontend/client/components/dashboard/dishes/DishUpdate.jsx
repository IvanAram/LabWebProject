import React from 'react';
import {Link} from 'react-router-dom';

export default class DishUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      name_error: "Introducir un nombre",
      show_name: false,
      desc_error: "Introudcir una descripcion del proyecto",
      show_desc: false,
      dish: this.props.location.query.dish
    };
  }

  componentDidMount(){
    document.getElementById("nav-title").innerHTML = "Platillos";
    fetch('http://localhost:3000/categories', { method: 'get' })
      .then(res => res.json())
      .then(res => {
        if(res.status == 0) {
          this.setState({categories: res.data});
        } else {
          console.log(res);
        }
      })
      .catch(e => console.log(e));
    let name = document.getElementById("name"),
        description = document.getElementById("desc");
    name.value = this.state.dish.name;
    description.value = this.state.dish.description;
  }

  update(e) {
    e.preventDefault();
    let name = document.getElementById("name").value.trim(),
        description = document.getElementById("desc").value.trim(),
        category = document.getElementById("category").value,
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
    this.saveResults(name, description, category);
  }

  saveResults(name, description, category){
    let params = {
          name: name,
          description: description,
          c_id: category
        },
        id = this.state.dish.id;
    fetch(`http://localhost:3000/dishes/${id}`, {
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
        this.props.history.push("/dishes");
      }
    })
    .catch(error => console.log(error));
  }

  showError(error) {
    return(
      <small className="form-error">{error}</small>
    );
  }

  categories() {
    return(
      this.state.categories.map(c => <option key={`cat-${c.id}`} value={c.id}>{c.label}</option>)
    );
  }

  form(){
    return(
      <form name="editDis" className="forms">
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
        <div className="form-group">
          <label>Categoria:</label>
          <select className="form-control" id="category">
            {this.categories()}
          </select>
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
          <small><Link to="/dishes">  Regresar</Link></small>
        </button>
        {this.form()}
      </div>
    );
  }
}
