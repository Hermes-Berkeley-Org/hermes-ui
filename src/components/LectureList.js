import React, { Component } from 'react';

import Lecture from './Lecture';

import './LectureList.css';

class LectureList extends Component {
  render() {
    return (
      <ul className="lecture-list">
        {this.props.lectures.map((lecture, i) => (
          <li key={i} className="lecture-item">
            <Lecture
              courseId={this.props.courseId}
              lectureUrlName={lecture['lecture_url_name']}
              lecture={lecture}
              deleteLecture={this.props.deleteLecture}/>
          </li>
        ))}
      </ul>
    );
  }
}

export default LectureList;
