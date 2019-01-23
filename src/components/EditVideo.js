import React, { Component } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title'
import Modal from 'react-modal'

import { getCourseData } from '../actions/course.js';
import { getVideoData } from '../actions/video.js';
import { getLectureData } from '../actions/lecture.js';
import { getTranscript } from '../actions/transcript.js';
import { getEditData } from '../actions/editVideo.js'

import Layout from './Layout';
import Loading from './Loading.js';
import NotFound from './errors/NotFound.js'
import InternalError from './errors/InternalError.js'
import CreateVitaminForm from './CreateVitaminForm'
import CreateResourceForm from './CreateResourceForm'

import './VideoPage.css';

class EditVideo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vitaminModalIsOpen: false,
      resourceModalIsOpen: false,
      vitaminSelected: null,
      resourceSelected: null,
      player: null
    }

    this.onPlayerReady = this.onPlayerReady.bind(this);

    this.openVitaminModal = this.openVitaminModal.bind(this);
    this.closeVitaminModal = this.closeVitaminModal.bind(this);
    this.openResourceModal = this.openResourceModal.bind(this);
    this.closeResourceModal = this.closeResourceModal.bind(this);
    this.reloadVideoData = this.reloadVideoData.bind(this);
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
                    <Link to={`/course/${this.props.courseId}/lecture/${this.props.lectureUrlName}/video/${this.props.videoIndex - 1}/edit`}><span className='fa fa-chevron-left' /></Link>
                  )}
                </div>
                <div className='video-player'>
                  {this.props.videoLoading ?
                    null :
                    (!this.props.videoData ?
                      'Failed to load video' :
                      <YouTube
                        videoId={this.props.videoData['youtube_id']}
                        onReady={this.onPlayerReady}
                      />)}
                </div>
                <div className='video-player-side-next'>
                  {!this.props.lectureData || this.props.videoIndex === this.props.lectureData['video_titles'].length - 1 ? null : (
                    <Link to={`/course/${this.props.courseId}/lecture/${this.props.lectureUrlName}/video/${this.props.videoIndex + 1}/edit`}><span className='fa fa-chevron-right' /></Link>
                  )}
                </div>
              </div>
            </div>
            <div className='video-bottom-section'>
              {this.props.editDataLoading || !this.state.player ? <Loading /> :
                (this.props.editDataError ? 'Failed to load vitamins/resources' :
                  <div>
                    <div>{JSON.stringify(this.props.editData)}</div>
                    <button onClick={this.openVitaminModal}>Create vitamin</button>
                    <button onClick={this.openResourceModal}>Create resource</button>
                  </div>
                )
              }
            </div>
            <Modal
              isOpen={this.state.vitaminModalIsOpen}
              onRequestClose={this.closeVitaminModal}
              style={
                {
                  content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)'
                  }
                }
              }
            >
              <CreateVitaminForm
                courseId={this.props.courseId}
                lectureUrlName={this.props.lectureUrlName}
                videoIndex={this.props.videoIndex}
                vitamin={this.state.vitaminSelected}
                closeVitaminModal={this.closeVitaminModal}
                player={this.state.player}
              />
            </Modal>
            <Modal
              isOpen={this.state.resourceModalIsOpen}
              onRequestClose={this.closeResourceModal}
              style={
                {
                  content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)'
                  }
                }
              }
            >
              <CreateResourceForm
                courseId={this.props.courseId}
                lectureUrlName={this.props.lectureUrlName}
                videoIndex={this.props.videoIndex}
                resource={this.state.resourceSelected}
                closeResourceModal={this.closeResourceModal}
              />
            </Modal>
          </div>
        </DocumentTitle>
      </Layout>
    );
  }

  onPlayerReady(event) {
    this.setState({
      player: event.target
    })
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

  openVitaminModal() {
    this.setState({
      vitaminModalIsOpen: true
    })
  }

  closeVitaminModal() {
    this.setState({
      vitaminModalIsOpen: false
    })
  }

  openResourceModal() {
    this.setState({
      resourceModalIsOpen: true
    })
  }

  closeResourceModal() {
    this.setState({
      resourceModalIsOpen: false
    })
  }

}

const mapStateToProps = state => ({
  ...state.courseReducer,
  ...state.videoReducer,
  ...state.lectureReducer,
  ...state.editVideoReducer
});

const mapDispatchToProps = dispatch => ({
  getCourseData: (...args) => dispatch(getCourseData(...args)),
  getVideoData: (...args) => dispatch(getVideoData(...args)),
  getLectureData: (...args) => dispatch(getLectureData(...args)),
  getTranscript: (...args) => dispatch(getTranscript(...args)),
  getEditData: (...args) => dispatch(getEditData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditVideo);
