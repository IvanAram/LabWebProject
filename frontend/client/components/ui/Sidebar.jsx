import React from 'react';
import BurgerMenu from 'react-burger-menu';
import { Link } from 'react-router-dom'


export default class Sidebar extends React.Component {
  showSettings (event) {
    event.preventDefault();

  }

  getItems() {
    return [
          <Link key="0" to="/dashboard"><i className="fa fa-star-o" /><span>Platillos</span></Link>,
          <a key="1" href=""><i className="fa fa-bell-o" /><span>Bebidas</span></a>,
          <a key="2" href=""><i className="fa fa-envelope-o" /><span>Menus</span></a>,
          <a key="3" href=""><i className="fa fa-comment-o" /><span>Meseros</span></a>,
          <a key="4" href=""><i className="fa fa-bar-chart-o" /><span>Perfil</span></a>,
          <a key="5" href=""><i className="fa fa-newspaper-o" /><span>Cerrar sesión</span></a>
        ];
  }

  render () {
    const Menu = BurgerMenu['elastic'];
    //const items = this.get('')
    return (
      <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
        { this.getItems() }
      </Menu>
    );
  }
}
