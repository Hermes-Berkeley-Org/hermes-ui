import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CourseCard extends Component {
  render() {
    return (
      <Link to={`/course/${this.props.course['id']}`}>
        {this.props.course['display_name']}
      </Link>
    );
  }
};
