import React, { Component } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title'

import { getCourseData } from '../actions/course.js';
import { getVideoData } from '../actions/video.js';
import { getLectureData } from '../actions/lecture.js';
import { getTranscript } from '../actions/transcript.js';

import Layout from './Layout';
import Transcript from './Transcript'
import Loading from './Loading.js';

class Video extends Component {

  constructor(props) {
    super(props);
    this.reloadVideoData = this.reloadVideoData.bind(this);
  }

  render() {
    // TODO: https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
    console.log(this.props)
    return (
      <Layout>
        <DocumentTitle title={!this.props.courseData || !this.props.lectureData || !this.props.videoData ? "Video" :
              `${this.props.courseData.info['display_name']} | ${this.props.lectureData.name} | ${this.props.videoData.title}`
        }>
          <Grid>
            <h2>{this.props.lectureData ? this.props.lectureData.name : ''}</h2>
            <Row>
              <Col xs>
                <Row>
                  <Link to={`/course/${this.props.courseId}`}>
                    Return to {
                        !this.props.courseData ?
                        '' :
                        this.props.courseData.info['display_name']
                    }
                  </Link>

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
                </Row>
                <Row>
                  {this.props.transcriptLoading ? <Loading /> :
                    (!this.props.transcript ? (this.props.transcriptNotFound ? 'No transcript is associated with this video' : 'Failed to load transcript') :
                      <Transcript transcript={this.props.transcript}/>
                    )
                  }
                </Row>
              </Col>
              <Col xs>
                <Row>
                  Questions sidebar
                </Row>
                <Row>
                  Questions
                </Row>
              </Col>
            </Row>
          </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(Video);
