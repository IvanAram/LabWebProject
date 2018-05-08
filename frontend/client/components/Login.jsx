import React from 'react';
import {Link} from 'react-router-dom';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null
    };
  }

  validateLogin(e) {
    e.preventDefault();
    let username = document.getElementById('usr').value.trim(),
        password = document.getElementById('pwd').value.trim();
    if (!username || !password) {
      console.log("Ingresa un usuario y contraseña valido");
      return;
    }
    let params = {
      username: username,
      password: password
    };
    fetch('http://localhost:3000/login', {
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
        throw 'User not found';
      } else {
        localStorage.setItem('session', true);
        this.setState({
          username: username,
          password: password
        });
        this.props.history.push("/dashboard");
      }
    })
    .catch(error => console.log(error));
    document.forms["loginForm"].reset();
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Login!</h1>
        <div className="row">
          <div className="col-sm-12">
            <div className="center-block">
              <form className="login-form" name="loginForm">
                <div className="form-group">
                  <label>Usuario:</label>
                  <input type="text" className="form-control" id="usr"/>
                </div>
                <div className="form-group">
                  <label>Contraseña:</label>
                  <input type="password" className="form-control" id="pwd"/>
                </div>
                <button type="button" className="btn btn-primary center-block" onClick={this.validateLogin.bind(this)}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>

        <Link to="/dashboard">Ir a dashboard</Link>
      </div>
    );
  }
}
