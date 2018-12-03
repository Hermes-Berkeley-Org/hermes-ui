import React, { Component } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';

import { getVideoData } from '../actions/video.js';
import { getLectureData } from '../actions/lecture.js';
import Layout from './Layout';

class Video extends Component {
  render() {
    console.log(this.props);
    return (
      <Layout>
        <div className='container'>
          <h2>{this.props.lectureData ? this.props.lectureData.name : 'Lecture'}</h2>
          {!this.props.videoData ? null : (
            <YouTube
              videoId={this.props.videoData.youtube_id}
            />
          )}
        </div>
      </Layout>
    );
  }

  componentDidMount() {
    this.props.getVideoData(localStorage.getItem('okToken'), this.props.courseId, this.props.lectureIndex, this.props.videoIndex);
    this.props.getLectureData(localStorage.getItem('okToken'), this.props.courseId, this.props.lectureIndex);
  }
}

const mapStateToProps = state => ({
  ...state.videoReducer,
  ...state.lectureReducer,
});

const mapDispatchToProps = dispatch => ({
  getVideoData: (...args) => dispatch(getVideoData(...args)),
  getLectureData: (...args) => dispatch(getLectureData(...args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);
