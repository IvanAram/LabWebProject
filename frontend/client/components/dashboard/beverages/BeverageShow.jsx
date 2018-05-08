import React from 'react';
import {Link} from 'react-router-dom';

export default class BeverageShow extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      beverage: this.props.location.query.beverage
    }
  }

  render(){
    return(
      <div className="container">
        {this.state.beverage.name}
      </div>
    );
  }
}
