import React from 'react';
import { default as ReactModal } from 'react-modal';

import './Modal.css';

export default class Modal extends React.Component {

  render() {
    return <ReactModal
      className='modal'
      overlayClassName='modal-overlay'
      {...this.props}
    />;
  }

};
