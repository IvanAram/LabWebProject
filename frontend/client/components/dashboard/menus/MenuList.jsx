import React from 'react';
import {Link} from 'react-router-dom';

export default class MenuList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    document.getElementById("nav-title").innerHTML = "Menus";
    fetch('http://localhost:3000/menus', { method: 'get' })
      .then(res => res.json())
      .then(res => {
        if(res.status == 0) {
          this.setState({ items: res.data });
        } else {
          console.log(res);
        }
      })
      .catch(e => console.log(e));
  }

  deleteRecord(id, e) {
    e.preventDefault();
    fetch(`http://localhost:3000/menus/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      if (res.status == 1) {
        throw 'Error happend will requesting';
      } else {
        console.log(res);
        let items = this.state.items.filter(item => item.id !== id);
        this.setState({
          items: items
        });
      }
    })
    .catch(error => console.log(error));
  }

  renderItems(){
    let items = this.state.items,
        res = [];
    items.forEach((i, idx) =>{
      res.push(
        <tr key={`men-${idx}`}>
          <th scope="row">{i.id}</th>
          <td>{i.label}</td>
          <td>{i.description}</td>
          <td>{i.dishes.length}</td>
          <td>{i.beverages.length}</td>
          <td className="actions">
            <Link to={{ pathname:`/menu/${i.id}`, query:{menu:i} }} className="btn btn-primary"><i className="fas fa-eye"></i> Detalles</Link>
            <Link to={{ pathname:`/edit-menu/${i.id}`, query:{menu:i} }} className="btn btn-primary"><i className="far fa-edit"></i> Editar</Link>
            <button type="button" className="btn btn-primary" onClick={this.deleteRecord.bind(this, i.id)}>
              <i className="fas fa-trash"></i> Borrar
            </button>
          </td>
        </tr>
    );
    });
    return (
      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripción</th>
            <th scope="col">Platillos</th>
            <th scope="col">Bebidas</th>
            <th scope="col"></th>

          </tr>
        </thead>
        <tbody>
          {res}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="container">
        <Link to="/new-menu" className="btn btn-primary back-button">Crear nuevo menú</Link>
        {this.renderItems()}
      </div>
    );
  }
}
