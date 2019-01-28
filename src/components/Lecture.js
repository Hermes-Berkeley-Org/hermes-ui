import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ROLE_INSTRUCTOR } from '../constants.js'

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
          <h3 className="lecture-title"><Link to={`/course/${this.props.courseId}/lecture/${this.props.lectureUrlName}/video/0`}>{this.props.lecture.name}</Link></h3>
          <div className="lecture-date">{this.props.lecture.date}</div>
          <div className="lecture-action">
            {this.props.role === ROLE_INSTRUCTOR ?
              <span className="fas fa-times" onClick={(event) => {
                event.stopPropagation();
                this.props.deleteLecture(this.props.lectureUrlName)
              }} /> :
              null}
          </div>
        </div>
        <ol className="lecture-video-list">
          {this.props.lecture.video_titles.map((title, videoIndex) => (
            <li key={videoIndex} className="lecture-video-item">
              <Link to={`/course/${this.props.courseId}/lecture/${this.props.lectureUrlName}/video/${videoIndex}`}>{title}</Link>
              {this.props.role === ROLE_INSTRUCTOR ?
                <Link className='lecture-video-item-action' to={`/course/${this.props.courseId}/lecture/${this.props.lectureUrlName}/video/${videoIndex}/edit`}>
                  <span className="fas fa-edit"></span>
                </Link> :
                null}
            </li>
          ))}
        </ol>
      </div>
    );
  }
};
