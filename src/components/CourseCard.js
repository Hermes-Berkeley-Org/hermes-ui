import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './CourseCard.css';

export default class CourseCard extends Component {
  render() {
    return (
      <Link className='col-xs-6 col-md-4' to={`/course/${this.props.course['id']}`}>
        <div className='card-course'>
          <div className='card-course-title'>{this.props.course['display_name']}</div>
        </div>
      </Link>
    );
  }
};
