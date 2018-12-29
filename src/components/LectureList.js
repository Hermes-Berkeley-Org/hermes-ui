import React, { Component } from 'react';

import Lecture from './Lecture';

import './LectureList.css';

class LectureList extends Component {
  render() {
    return (
      <ul className="lecture-list">
        {this.props.lectures.map((lecture, lectureIndex) => (
          <li key={lectureIndex} className="lecture-item">
            <Lecture courseId={this.props.courseId} lectureIndex={lectureIndex} lecture={lecture} />
          </li>
        ))}
      </ul>
    );
  }
}

export default LectureList;
