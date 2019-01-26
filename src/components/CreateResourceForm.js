import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip'

import { createResource, editResource } from '../actions/editVideo.js'

class CreateResourceForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: !this.props.resource ? '' : this.props.resource['title'],
      link: !this.props.resource ? '' : this.props.resource['link']
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.resource) {
      this.props.editResource(
        this.props.courseId,
        this.props.lectureUrlName,
        this.props.videoIndex,
        this.props.resource['resource_index'],
        {
            ...this.props.resource,
            title: this.state.title,
            link: this.state.link
        }
      )
    } else {
      this.props.createResource(
        this.props.courseId,
        this.props.lectureUrlName,
        this.props.videoIndex,
        {
            title: this.state.title,
            link: this.state.link
        }
      );
    }
    this.props.closeResourceModal()
  }

  render() {
    return (
      <div>
        <div onClick={this.props.closeResourceModal} className="fas fa-times"></div>
        <h2>Create {this.state.title || 'resource'}</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className='form-group'>
            <label htmlFor="resource-title">Resource Title</label>
            <input
              type='text'
              className="form-control"
              id='resource-title'
              name='title'
              value={this.state.title}
              onChange={this.handleInputChange.bind(this)}
            />
          </div>
          <div className='form-group'>
            <label htmlFor="resource-link">
              Resource link &nbsp;
            <div data-tip data-for='resource-link' className="fas fa-question-circle" />
              <ReactTooltip id='resource-link'>
                <p>Include links to relevant sites to the video!</p>
              </ReactTooltip>
            </label>
            <input
              type='text'
              className="form-control"
              id='resource-link'
              name='link'
              value={this.state.link}
              onChange={this.handleInputChange.bind(this)}
            />
          </div>
          <input type='submit' className='btn btn-default' value={this.props.resource ? 'Edit' : 'Create'} />
        </form>
      </div>
    );
  }

}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  createResource: (...args) => dispatch(createResource(...args)),
  editResource: (...args) => dispatch(editResource(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateResourceForm);
