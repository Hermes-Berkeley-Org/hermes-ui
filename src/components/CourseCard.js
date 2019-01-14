import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './CourseCard.css';

export default class CourseCard extends Component {

  render() {
    if (this.props.hermesActive) {
      return (
        <Link to={`/course/${this.props.course['id']}`} className='card card-course'>
          <div className='card-title'>{this.props.course['display_name']}</div>
        </Link>
      )
    } else {
      return (
        <a onClick={() => this.props.openCreateCourseModal(this.props.course)} className='card card-course'>
          <div className='card-title'>{this.props.course['display_name']}</div>
        </a>
      )
    }
  }
};
