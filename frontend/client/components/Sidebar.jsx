import React from 'react';
import BurgerMenu from 'react-burger-menu';
import { Link } from 'react-router-dom'


export default class Sidebar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      session: false
    }
  }

  componentWillMount(){
    let session = localStorage.getItem('session');
    if (session) this.setState({session: session});
  }

  closeSession(){
    localStorage.setItem('session', false);
    this.setState({
      session: false
    });
    this.props.history.push("/");
  }


  getItems() {
    return [
          <Link key="0" to="/dishes"><i className="fas fa-hockey-puck"></i> Platillos</Link>,
          <Link key="1" to="/beverages"><i className="fas fa-beer"></i> Bebidas</Link>,
          <Link key="2" to="/categories"><i className="fas fa-code-branch"></i><span> Categorias</span></Link>,
          <Link key="3" to="/waiters"><i className="fas fa-people-carry"></i><span> Meseros</span></Link>,
          <Link key="4" to="/tables"><i className="fas fa-th"></i><span> Mesas</span></Link>,
          <Link key="5" to="/menus"><i className="fas fa-utensils"></i><span> Menus</span></Link>
    ];
  }

  render () {
    const Menu = BurgerMenu['elastic'];
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
          <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
            { this.state.session ? this.getItems() : <Link to="/"><i className="fas fa-hockey-puck"></i> Login</Link>}
          </Menu>
          <p className="text-center" id="nav-title">Login</p>
          <div className="nav-right">
            { this.state.session ? <a className="btn btn-primary" onClick={this.closeSession.bind(this)}> Cerrar session</a> : ""}
          </div>
      </nav>
    );
  }
}
