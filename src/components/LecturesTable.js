import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './LecturesTable.css';

class LecturesTable extends Component {
  render() {
    return (
      <ul className="lecture-list">
        {this.props.lectures.map((lecture, lectureIndex) => (
          <li key={lectureIndex} className="lecture-item">
            <h3 className="lecture-title"><Link to={`/course/${this.props.courseId}/lecture/${lectureIndex}/video/0`}>{lecture.name}</Link></h3>
            <div className="lecture-date">{lecture.date}</div>
            <ul className="lecture-video-list">
              {lecture.video_titles.map((title, videoIndex) => (
                <li key={videoIndex} className="lecture-video-item">
                  <Link to={`/course/${this.props.courseId}/lecture/${lectureIndex}/video/${videoIndex}`}>{title}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  }
}

export default LecturesTable;
