import React from 'react';
import BurgerMenu from 'react-burger-menu';
import { Link } from 'react-router-dom'


export default class Sidebar extends React.Component {
  getItems() {
    return [
          <Link key="0" to="/dishes"><i className="fas fa-hockey-puck"></i> Platillos</Link>,
          <Link key="1" to="/beverages"><i className="fas fa-beer"></i> Bebidas</Link>,
          <Link key="2" to="/categories"><i className="fas fa-code-branch"></i><span> Categorias</span></Link>,
          <Link key="3" to="/waiters"><i className="fas fa-people-carry"></i><span> Meseros</span></Link>,
          <Link key="4" to="/tables"><i className="fas fa-th"></i><span> Mesas</span></Link>,
          <a key="5" href=""><i className="fa fa-newspaper-o" /><span>Cerrar sesión</span></a>
        ];
  }

  render () {
    const Menu = BurgerMenu['elastic'];
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
          <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
            { this.getItems() }
          </Menu>
          <p className="text-center" id="nav-title">Login</p>
      </nav>
    );
  }
}
