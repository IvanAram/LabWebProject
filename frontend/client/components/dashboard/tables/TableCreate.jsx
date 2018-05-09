import React from 'react';
import {Link} from 'react-router-dom';

export default class TableCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seat_error: "Introducir la cantidad de asientos que tiene la mesa",
      show_seat: false
    };
  }
  componentDidMount(){
    document.getElementById("nav-title").innerHTML = "Mesas";
  }

  create(e) {
    e.preventDefault();
    let seats = parseInt(document.getElementById("seats").value),
        errors = false;
    if (seats == NaN || seats <= 0) {
      errors = true;
      this.setState({
        show_seat: true
      });
    }
    if (errors) return;
    this.saveResults(seats);
  }

  saveResults(seats){
    let params = {
      seats: seats
    };
    fetch('http://localhost:3000/tables', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then(res => res.json())
    .then(res => {
      if (res.status == 4) {
        console.log(res);
        throw 'Error happend will requesting';
      } else {
        console.log(res);
        this.props.history.push("/tables");
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
      <form name="newTab" className="forms">
        <div className="form-group">
          <label>Asientos</label>
          <input type="number" id="seats" className="form-control"/>
          {this.state.show_seat ? this.showError(this.state.seat_error) : ''}
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
          <small><Link to="/tables">  Regresar</Link></small>
        </button>
        {this.form()}
      </div>
    );
  }
}
