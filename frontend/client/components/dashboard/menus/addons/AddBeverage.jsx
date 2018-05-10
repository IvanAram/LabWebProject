import React from 'react';

export default class AddBeverage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount(){
    fetch('http://localhost:3000/beverages', { method: 'get' })
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

  render() {
    return (
      <div class="container-fluid">
        
      </div>
    );
  }
}
