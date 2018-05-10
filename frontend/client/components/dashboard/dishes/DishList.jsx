import React from 'react';
import {Link} from 'react-router-dom';

export default class DishList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    document.getElementById("nav-title").innerHTML = "Platillos";
    fetch('http://localhost:3000/dishes', { method: 'get' })
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
    fetch(`http://localhost:3000/dishes/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => {
      if (res.status == 4) {
        console.log(res);
        throw 'Error happend will requesting';
      } else {
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
        <tr key={`dis-${idx}`}>
          <th scope="row">{i.id}</th>
          <td>{i.name}</td>
          <td>{i.description}</td>
          <td className="actions">
            <Link to={{ pathname:`/dish/${i.id}`, query:{dish:i} }} className="btn btn-info"><i className="fas fa-eye"></i> Detalles</Link>
            <Link to={{ pathname:`/edit-dish/${i.id}`, query:{dish:i} }} className="btn btn-warning"><i className="far fa-edit"></i> Editar</Link>
            <button type="button" className="btn btn-danger" onClick={this.deleteRecord.bind(this, i.id)}>
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
        <Link to="/new-dish" className="btn btn-primary back-button">Crear nuevo platillo</Link>
        {this.renderItems()}
      </div>
    );
  }
}
