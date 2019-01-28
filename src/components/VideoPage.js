import React, { Component } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title'

import { getCourseData } from '../actions/course.js';
import { getVideoData } from '../actions/video.js';
import { getLectureData } from '../actions/lecture.js';
import { getTranscript } from '../actions/transcript.js';
import { getVitaminsAndResources } from '../actions/editVideo.js'
import { videoJumped } from '../actions/youtube.js'

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
    this.onStateChange = this.onStateChange.bind(this);
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
                        onStateChange={this.onStateChange}
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
                {this.props.transcriptLoading || !this.state.player ?
                  <Loading /> :
                  (!this.props.transcript ?
                    (this.props.transcriptNotFound ? 'No transcript is associated with this video' : 'Failed to load transcript') :
                    <Transcript
                      transcript={this.props.transcript}
                      player={this.state.player}
                    />)}
              </div>
              {!this.props.courseData || this.props.courseData.info['piazza_active'] !== 'active' ?
                null :
                <div className='video-questions-section'>
                  <PiazzaQuestionForm
                    courseId={this.props.courseId}
                    lectureUrlName={this.props.lectureUrlName}
                    videoIndex={this.props.videoIndex}
                    course={this.props.courseData}
                    lecture={this.props.lectureData}
                    video={this.props.videoData}
                    player={this.state.player}
                  />
                </div>}
            </div>
            {!this.state.player || !this.props.vitaminsAndResources ? null :
              <VitaminContainer
                player={this.state.player}
                vitamins={this.props.vitaminsAndResources.vitamins}
                resources={this.props.vitaminsAndResources.resources}
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

  onStateChange(event) {
    if (event.data === YouTube.PlayerState.BUFFERING && this.state.player) {
      this.props.videoJumped(
        Math.floor(this.state.player.getCurrentTime())
      );
    } else if (event.data === YouTube.PlayerState.ENDED) {
      if (this.props.videoIndex < this.props.lectureData['video_titles'].length - 1) {
        this.props.history.push(`/course/${this.props.courseId}/lecture/${this.props.lectureUrlName}/video/${this.props.videoIndex + 1}`)
      }
    }
  }

  componentDidMount() {
    this.props.getCourseData(this.props.courseId);
    this.props.getLectureData(
      this.props.courseId,
      this.props.lectureUrlName
    );
    this.reloadVideoData()
  }

  reloadVideoData() {
    this.props.getVideoData(
      this.props.courseId,
      this.props.lectureUrlName,
      this.props.videoIndex
    );
    this.props.getTranscript(
      this.props.courseId,
      this.props.lectureUrlName,
      this.props.videoIndex
    );
    this.props.getVitaminsAndResources(
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
  getVitaminsAndResources: (...args) => dispatch(getVitaminsAndResources(...args)),
  videoJumped:  (...args) => dispatch(videoJumped(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);
