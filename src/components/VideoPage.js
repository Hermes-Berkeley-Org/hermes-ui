import React, { Component } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title'

import { getCourseData } from '../actions/course.js';
import { getVideoData } from '../actions/video.js';
import { getLectureData } from '../actions/lecture.js';
import { getTranscript } from '../actions/transcript.js';
import { getEditData } from '../actions/editVideo.js'

import Layout from './Layout';
import Transcript from './Transcript'
import Loading from './Loading.js';
import NotFound from './errors/NotFound.js'
import InternalError from './errors/InternalError.js'
import PiazzaQuestionForm from './PiazzaQuestionForm.js'
import VitaminContainer from './VitaminContainer.js'

import './VideoPage.css';

const queryString = require('query-string')

class Video extends Component {

  constructor(props) {
    super(props);
    this.state = {
      player: null
    }

    this.reloadVideoData = this.reloadVideoData.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
  }

  render() {
    const error = this.props.courseDataError || this.props.lectureDataError || this.props.videoDataError;
    if (error) {
      return <div>{
        error.response.status === 404 ?
        <NotFound/> : <InternalError/>
      }</div>
    }
    return (
      <Layout>
        <DocumentTitle title={!this.props.courseData || !this.props.lectureData || !this.props.videoData ?
          'Video' :
          `${this.props.courseData.info['display_name']} | ${this.props.lectureData.name} | ${this.props.videoData.title}`
        }>
          <div className='container container-video'>
            <div className='container-banner container-banner-complex'>
              <div className='container-banner-links'>
                <Link to={`/course/${this.props.courseId}`}><span className='fas fa-arrow-left' /> <span className='font-semibold'>{this.props.courseData ? this.props.courseData.info['display_name'] : 'Course'}</span>{this.props.lectureData ? ` ${this.props.lectureData.name}` : ''}</Link>
              </div>
            </div>
            <div className='video-player-section'>
              <div className='video-player-container'>
                <div className='video-player-side-prev'>
                  {!this.props.lectureData || this.props.videoIndex === 0 ? null : (
                    <Link to={`/course/${this.props.courseId}/lecture/${this.props.lectureUrlName}/video/${this.props.videoIndex - 1}`}><span className='fa fa-chevron-left' /></Link>
                  )}
                </div>
                <div className='video-player'>
                  {this.props.videoLoading ?
                    null :
                    (!this.props.videoData ?
                      'Failed to load video' :
                      <YouTube
                        videoId={this.props.videoData['youtube_id']}
                        opts={{ playerVars: { autoplay: 1 } }}
                        onReady={this.onPlayerReady}
                      />)}
                </div>
                <div className='video-player-side-next'>
                  {!this.props.lectureData || this.props.videoIndex === this.props.lectureData['video_titles'].length - 1 ? null : (
                    <Link to={`/course/${this.props.courseId}/lecture/${this.props.lectureUrlName}/video/${this.props.videoIndex + 1}`}><span className='fa fa-chevron-right' /></Link>
                  )}
                </div>
              </div>
            </div>
            <div className='video-bottom-section'>
              <div className='video-transcript-section'>
                {this.props.transcriptLoading ?
                  <Loading /> :
                  (!this.props.transcript ?
                    (this.props.transcriptNotFound ? 'No transcript is associated with this video' : 'Failed to load transcript') :
                    <Transcript transcript={this.props.transcript} />)}
              </div>
              {!this.props.courseData || this.props.courseData.info['piazza_active'] !== 'active' ?
                null :
                <div className='video-questions-section'>
                  <PiazzaQuestionForm
                    course={this.props.courseData}
                    lecture={this.props.lectureData}
                    video={this.props.videoData}
                    player={this.state.player}
                  />
                </div>
              }
            </div>
            {!this.state.player || !this.props.editData ? null :
              <VitaminContainer
                player={this.state.player}
                vitamins={this.props.editData.vitamins}
                resources={this.props.editData.resources}
              />
            }
          </div>
        </DocumentTitle>
      </Layout>
    );
  }

  onPlayerReady(event) {
    this.setState({
      player: event.target
    })
    const search = queryString.parse(this.props.location.search)
    if (search.seconds) {
      this.state.player.seekTo(Number.parseInt(search.seconds, 10));
    }
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
    this.props.getEditData(
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
  ...state.transcriptReducer,
  ...state.editVideoReducer
});

const mapDispatchToProps = dispatch => ({
  getCourseData: (...args) => dispatch(getCourseData(...args)),
  getVideoData: (...args) => dispatch(getVideoData(...args)),
  getLectureData: (...args) => dispatch(getLectureData(...args)),
  getTranscript: (...args) => dispatch(getTranscript(...args)),
  getEditData: (...args) => dispatch(getEditData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);
