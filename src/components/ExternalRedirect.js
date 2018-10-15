import React, { Component } from 'react';

class ExternalRedirect extends Component {

  render() {
    return <div/>
  }

  componentDidMount() {
    window.location = this.props.url;
  }

}

export default ExternalRedirect;
