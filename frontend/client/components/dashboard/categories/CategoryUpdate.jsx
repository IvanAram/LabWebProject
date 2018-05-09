import React from 'react';
import {Link} from 'react-router-dom';

export default class CategoryUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name_error: "Introducir un nombre",
      show_name: false,
      category: this.props.location.query.category
    };
  }

  componentDidMount(){
    document.getElementById("nav-title").innerHTML = "Platillos";
    let name = document.getElementById("name");
    name.value = this.state.category.label;
  }

  update(e) {
    e.preventDefault();
    let name = document.getElementById("name").value.trim(),
        errors = false;
    if (name == '') {
      errors = true;
      this.setState({
        show_name: true
      });
    }
    if (errors) return;
    this.saveResults(name);
  }

  saveResults(name){
    let params = {
          label: name,
        },
        id = this.state.category.id;
    fetch(`http://localhost:3000/categories/${id}`, {
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
        this.props.history.push("/categories");
      }
    })
    .catch(error => console.log(error));
  }

  showError(error) {
    return(
      <small className="form-error">{error}</small>
    );
  }

  form(){
    return(
      <form name="editCat" className="forms">
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" id="name" className="form-control"/>
          {this.state.show_name ? this.showError(this.state.name_error) : ''}
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
          <small><Link to="/categories">  Regresar</Link></small>
        </button>
        {this.form()}
      </div>
    );
  }
}
