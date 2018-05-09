import React from 'react';
import {Link} from 'react-router-dom';

export default class TableUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seat_error: "Introducir la cantidad de asientos que tiene la mesa",
      show_seat: false,
      table: this.props.location.query.table
    };
  }

  componentDidMount(){
    document.getElementById("nav-title").innerHTML = "Tables";
    let seats = document.getElementById("seats");
    seats.value = this.state.table.seats;
  }

  update(e) {
    e.preventDefault();
    let seats = document.getElementById("seats").value.trim(),
        errors = false;
    if (seats == NaN || seats <= 0) {
      errors = true;
      this.setState({
        show_name: true
      });
    }
    if (errors) return;
    this.saveResults(seats);
  }

  saveResults(seats){
    let params = {
          seats: seats,
        },
        id = this.state.table.id;
    fetch(`http://localhost:3000/tables/${id}`, {
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
      <form seats="editCat" className="forms">
        <div className="form-group">
          <label>Asientos</label>
          <input type="number" id="seats" className="form-control"/>
          {this.state.show_seat ? this.showError(this.state.seat_error) : ''}
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
          <small><Link to="/tables">  Regresar</Link></small>
        </button>
        {this.form()}
      </div>
    );
  }
}
