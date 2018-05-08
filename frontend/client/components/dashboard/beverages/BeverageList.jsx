import React from 'react';
import {Link} from 'react-router-dom';

export default class BeverageList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }


  componentDidMount() {
    fetch('http://localhost:3000/beverages', { method: 'get' })
      .then(res => res.json())
      .then(res => {
        if(res.status == 0) {
          this.setState({ items: res.data });
        } else {
          console.log(res)
        }
      })
      .catch(e => console.log(e));
  }

  renderItems(){
    let items = this.state.items,
        res = [];
    items.forEach((i, idx) =>{
      let icon;
      if(i.alcoholic == 1) {
        icon = 'Si';
      } else {
        icon = 'No';
      }
      res.push(
        <tr key={`bev-${idx}`}>
          <th scope="row">{i.id}</th>
          <td>{i.name}</td>
          <td>{i.description}</td>
          <td>{icon}</td>
          <td><Link to={{ pathname:`/beverages/${i.id}`, query:{beverage:i} }}>Show</Link></td>
        </tr>
    );
    });
    return (
      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Alcohólica</th>
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
        <h1 className="text-center">Bebidas</h1>
        {this.renderItems()}
      </div>
    );
  }
}
