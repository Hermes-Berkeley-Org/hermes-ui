import React, { Component } from 'react';

class Vitamin extends Component {
  render() {
    return (
      <div>
        {JSON.stringify(this.props.vitamin)}
      </div>
    );
  }
}

export default Vitamin;
