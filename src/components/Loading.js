import React from 'react';
import ReactLoading from 'react-loading';

export default class Loading extends React.Component {
  render() {
    return <ReactLoading type='spin' width='32px' height='32px' color='#18BC9C' />;
  }
}
