import React from 'react';
import BurgerMenu from 'react-burger-menu';
import { Link } from 'react-router-dom'


export default class Sidebar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title: "Login"
    };
  }

  changeTitle(str){
    if (typeof str == "string") {
      this.setState({
        title: str
      });
    } else {
      console.log("Enter a string");
    }
  }

  getItems() {
    return [
          <Link key="0" to="/dashboard"><i className="fa fa-star-o" />Platillos</Link>,
          <Link key="1" to="/beverages"><i className="fas fa-beer"></i> Bebidas</Link>,
          <a key="2" href=""><i className="fa fa-envelope-o" /><span>Menus</span></a>,
          <a key="3" href=""><i className="fa fa-comment-o" /><span>Meseros</span></a>,
          <a key="4" href=""><i className="fa fa-bar-chart-o" /><span>Perfil</span></a>,
          <a key="5" href=""><i className="fa fa-newspaper-o" /><span>Cerrar sesión</span></a>
        ];
  }

  render () {
    const Menu = BurgerMenu['fallDown'];
    //const items = this.get('')
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
          <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
            { this.getItems() }
          </Menu>
          <p className="text-center" id="nav-title">{this.state.title}</p>
      </nav>
    );
  }
}
