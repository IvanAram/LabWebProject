import React from 'react';
import {Link} from 'react-router-dom';


export default class BeverageCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name_error: "Introducir un nombre",
      show_name: false,
      desc_error: "Introudcir una descripcion del proyecto",
      show_desc: false
    };
  }
  componentDidMount(){
    document.getElementById("nav-title").innerHTML = "Bebidas";
  }

  create(e) {
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
    alcoholic ? alcoholic = 1 : alcoholic = 0;
    this.saveResults(name, description, alcoholic);
  }

  saveResults(name, description, alcoholic){
    let params = {
      name: name,
      description: description,
      alcoholic: alcoholic
    };
    fetch('http://localhost:3000/beverages', {
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
        this.props.history.push("/beverages");
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
        <div className="form-group">
          <input className="form-check-input" type="checkbox" id="alc"/>
          <label htmlFor="alc"> ¿Es alcohólica?</label>
        </div>
        <button type="button" className="btn btn-primary center-block" onClick={this.create.bind(this)}>Crear</button>
      </form>
    );
  }

  render(){
    return(
      <div className="container">
        <button type="button" className="btn btn-primary back-button">
          <i className="fas fa-chevron-left"></i>
          <small><Link to="/beverages">  Regresar</Link></small>
        </button>
        {this.form()}
      </div>
    );
  }
}
