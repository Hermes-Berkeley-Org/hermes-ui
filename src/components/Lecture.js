import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Lecture.css';

export default class Lecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  toggleLectureDetails() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const toggleLectureDetails = this.toggleLectureDetails.bind(this);

    return (
      <div className={["lecture"].concat(this.state.expanded ? "lecture-expanded" : []).join(' ')}>
        <div className="lecture-info" onClick={toggleLectureDetails}>
          <div className="lecture-details-toggle fas fa-chevron-right" />
          <h3 className="lecture-title"><Link to={`/course/${this.props.courseId}/lecture/${this.props.lectureIndex}/video/0`}>{this.props.lecture.name}</Link></h3>
          <div className="lecture-date">{this.props.lecture.date}</div>
        </div>
        <ol className="lecture-video-list">
          {this.props.lecture.video_titles.map((title, videoIndex) => (
            <li key={videoIndex} className="lecture-video-item">
              <Link to={`/course/${this.props.courseId}/lecture/${this.props.lectureIndex}/video/${videoIndex}`}>{title}</Link>
            </li>
          ))}
        </ol>
      </div>
    );
  }
};
