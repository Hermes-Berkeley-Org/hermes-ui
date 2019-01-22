import React, { Component } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title'

import { getCourseData } from '../actions/course.js';
import { getVideoData } from '../actions/video.js';
import { getLectureData } from '../actions/lecture.js';
import { getTranscript } from '../actions/transcript.js';

import Layout from './Layout';
import Loading from './Loading.js';
import NotFound from './errors/NotFound.js'
import InternalError from './errors/InternalError.js'

class EditVideo extends Component {

  constructor(props) {
    super(props);
    this.reloadVideoData = this.reloadVideoData.bind(this);
  }

  render() {
    // TODO: https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react

    const error = this.props.courseDataError || this.props.lectureDataError || this.props.videoDataError;
    if (error) {
      return <div>{
        error.response.status === 404 ?
        <NotFound/> : <InternalError/>
      }</div>
    }
    // return <div>Sup</div>
    return (
      <Layout>
        <DocumentTitle title={!this.props.courseData || !this.props.lectureData || !this.props.videoData ? "Video" :
              `Edit ${this.props.courseData.info['display_name']} | ${this.props.lectureData.name} | ${this.props.videoData.title}`
        }>

          <div>
            {this.props.videoLoading ? <Loading /> :
              (!this.props.videoData ? 'Failed to load video' :
                <YouTube
                  videoId={this.props.videoData['youtube_id']}
                  opts={{
                    height: JSON.stringify(window.innerHeight * 0.6),
                    width: JSON.stringify(window.innerWidth * 0.7),
                    playerVars: {
                      autoplay: 1
                    }
                  }}
                />
              )
            }

            {!this.props.lectureData || this.props.videoIndex === 0 ? null : (
              <Link to={`/course/${this.props.courseId}/lecture/${this.props.lectureUrlName}/video/${this.props.videoIndex - 1}`}>
                Previous Video
              </Link>
              )
            }

            {!this.props.lectureData || this.props.videoIndex === this.props.lectureData['video_titles'].length - 1 ? null : (
              <Link to={`/course/${this.props.courseId}/lecture/${this.props.lectureUrlName}/video/${this.props.videoIndex + 1}`}>
                Next Video
              </Link>
              )
            }

          </div>
        </DocumentTitle>
      </Layout>
    );
  }

  componentDidMount() {
    this.props.getCourseData(
      localStorage.getItem('okToken'), this.props.courseId);
    this.props.getLectureData(
      localStorage.getItem('okToken'),
      this.props.courseId,
      this.props.lectureUrlName
    );
    this.reloadVideoData()
  }

  reloadVideoData() {
    this.props.getVideoData(
      localStorage.getItem('okToken'),
      this.props.courseId,
      this.props.lectureUrlName,
      this.props.videoIndex
    );
    this.props.getTranscript(
      localStorage.getItem('okToken'),
      this.props.courseId,
      this.props.lectureUrlName,
      this.props.videoIndex
    );
  }

}

const mapStateToProps = state => ({
  ...state.courseReducer,
  ...state.videoReducer,
  ...state.lectureReducer,
  ...state.transcriptReducer
});

const mapDispatchToProps = dispatch => ({
  getCourseData: (...args) => dispatch(getCourseData(...args)),
  getVideoData: (...args) => dispatch(getVideoData(...args)),
  getLectureData: (...args) => dispatch(getLectureData(...args)),
  getTranscript: (...args) => dispatch(getTranscript(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditVideo);
