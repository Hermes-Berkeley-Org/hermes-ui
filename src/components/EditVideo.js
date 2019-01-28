import React, { Component } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title'
import Modal from 'react-modal'

import { getCourseData } from '../actions/course.js';
import { getVideoData } from '../actions/video.js';
import { getLectureData } from '../actions/lecture.js';
import {
    getVitaminsAndResources,
    deleteVitamin, editVitamin,
    deleteResource, editResource
} from '../actions/editVideo.js'

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

    this.editVitamin = this.editVitamin.bind(this);
    this.editResource = this.editResource.bind(this);

    this.deleteVitamin = this.deleteVitamin.bind(this);
    this.deleteResource = this.deleteResource.bind(this);
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
              {this.props.vitaminsAndResourcesLoading || !this.state.player ? <Loading /> :
                (this.props.vitaminsAndResourcesError ? 'Failed to load vitamins/resources' :
                  <div>
                    <ol>
                      Vitamins
                      {this.props.vitaminsAndResources.vitamins.map((vitamin, index) => (
                          <li key={`vitamin-${index}`}>
                            {vitamin.timestamp}: {vitamin.question}
                            <div className="fa fa-edit" onClick={() => this.editVitamin(vitamin)}></div>
                            <div className="fas fa-times" onClick={() => this.deleteVitamin(vitamin['vitamin_index'])}></div>
                          </li>
                        )
                      )
                      }
                    </ol>
                    <ol>
                      Resources
                      {this.props.vitaminsAndResources.resources.map((resource, index) => (
                          <li key={`resource-${index}`}>
                            {resource.title || resource.link}
                            <div className="fas fa-edit" onClick={() => this.editResource(resource)}></div>
                            <div className="fas fa-times" onClick={() => this.deleteResource(resource['resource_index'])}></div>
                          </li>
                        )
                      )
                      }
                    </ol>
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
    this.props.getVitaminsAndResources(
      this.props.courseId,
      this.props.lectureUrlName,
      this.props.videoIndex
    );
  }

  openVitaminModal() {
    this.state.player.pauseVideo();
    this.setState({
      vitaminModalIsOpen: true
    })
  }

  closeVitaminModal() {
    this.setState({
      vitaminModalIsOpen: false,
      vitaminSelected: null
    })
  }

  openResourceModal() {
    this.state.player.pauseVideo();
    this.setState({
      resourceModalIsOpen: true
    })
  }

  closeResourceModal() {
    this.setState({
      resourceModalIsOpen: false,
      resourceSelected: null
    })
  }

  editVitamin(vitamin) {
    if (this.props.vitaminsAndResources) {
      this.setState({
        vitaminSelected: vitamin
      })
    }
    this.openVitaminModal();
  }

  deleteVitamin(vitaminIndex) {
    this.props.deleteVitamin(
      this.props.courseId,
      this.props.lectureUrlName,
      this.props.videoIndex,
      vitaminIndex
    )
  }

  editResource(resource) {
    if (this.props.vitaminsAndResources) {
      this.setState({
        resourceSelected: resource
      })
    }
    this.openResourceModal();
  }

  deleteResource(resourceIndex) {
    this.props.deleteResource(
      this.props.courseId,
      this.props.lectureUrlName,
      this.props.videoIndex,
      resourceIndex
    )
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
  getVitaminsAndResources: (...args) => dispatch(getVitaminsAndResources(...args)),
  editVitamin: (...args) => dispatch(editVitamin(...args)),
  deleteVitamin: (...args) => dispatch(deleteVitamin(...args)),
  editResource: (...args) => dispatch(editResource(...args)),
  deleteResource: (...args) => dispatch(deleteResource(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditVideo);
