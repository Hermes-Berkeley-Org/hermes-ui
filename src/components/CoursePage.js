import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title'
import Modal from 'react-modal'

import { getCourseData, createLecture, deleteLecture } from '../actions/course.js';
import { createPiazzaBot, disablePiazzaBot } from '../actions/piazza.js'

import EnablePiazzaForm from './EnablePiazzaForm.js'
import DisablePiazzaForm from './DisablePiazzaForm.js'
import AddLectureForm from './AddLectureForm.js';
import Layout from './Layout.js';
import LectureList from './LectureList.js';
import Loading from './Loading.js';
import NotFound from './NotFound.js'
import InternalError from './InternalError.js'

import './CoursePage.css';

import { ROLE_INSTRUCTOR } from '../constants.js'

class CoursePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      piazzaModalIsOpen: false
    }

    this.openPiazzaModal = this.openPiazzaModal.bind(this);
    this.closePiazzaModal = this.closePiazzaModal.bind(this);
  }

  render() {
    if (this.props.courseDataError) {
      return <div>{
        this.props.courseDataError.response.status === 404 ?
        <NotFound/> : <InternalError/>
      }</div>
    }
    return (
      <Layout>
        <DocumentTitle title={!this.props.courseData ? 'Course' : this.props.courseData.info['display_name']}>
        <div className='container container-course'>
          <h2>
            {this.props.courseLoading || this.props.piazzaLoading ? '' : this.props.courseData.info['display_name']}
          </h2>
          {this.props.courseLoading || this.props.piazzaLoading ? null :
            this.props.courseData.info['piazza_active'] === 'active' ?
            <a onClick={this.openPiazzaModal}><i className="ai ai-piazza"></i> Disable piazza</a> :
            <a onClick={this.openPiazzaModal}><i className="ai ai-piazza"></i> Enable piazza</a>
          }
          <div className='container-course-sections'>
            <div className='course-lectures'>
              {this.props.courseLoading || this.props.piazzaLoading
                ? <Loading />
                : <LectureList
                      courseId={this.props.courseId}
                      lectures={!this.props.courseData ? [] : this.props.courseData.lectures}
                      deleteLecture={(lectureUrlName) => this.props.deleteLecture(this.props.courseId, lectureUrlName)}
                  />
              }
            </div>
            {this.props.role !== ROLE_INSTRUCTOR ? null :
              <div className='course-lecture-creation'>
                <h3>Create a lecture</h3>
                <AddLectureForm courseId={this.props.courseId} createLecture={this.props.createLecture} />
              </div>
            }
          </div>
          <Modal
            isOpen={this.state.piazzaModalIsOpen}
            onRequestClose={this.closePiazzaModal}
            style={
              {
                content : {
                  top                   : '50%',
                  left                  : '50%',
                  right                 : 'auto',
                  bottom                : 'auto',
                  marginRight           : '-50%',
                  transform             : 'translate(-50%, -50%)'
                }
              }
            }
          >
            {this.props.courseLoading || this.props.piazzaLoading ? null :
              this.props.courseData.info['piazza_active'] === 'active' ?
              <DisablePiazzaForm
                disablePiazzaBot={this.props.disablePiazzaBot}
                closePiazzaModal={this.closePiazzaModal}
                course={this.props.courseData}
              /> :
              <EnablePiazzaForm
                createPiazzaBot={this.props.createPiazzaBot}
                closePiazzaModal={this.closePiazzaModal}
                course={this.props.courseData}
              />
            }
          </Modal>
        </div>

        </DocumentTitle>
      </Layout>
    );
  }

  componentDidMount() {
    this.props.getCourseData(localStorage.getItem('okToken'), this.props.courseId)
  }

  openPiazzaModal() {
    this.setState(
      {...this.state,
        piazzaModalIsOpen: true
      }
    );
  }

  closePiazzaModal() {
    this.setState({...this.state, piazzaModalIsOpen: false});
  }

}

CoursePage.defaultProps = {
    courseLoading: true
}

const mapStateToProps = state => ({
  ...state.courseReducer
})

const mapDispatchToProps = dispatch => ({
  getCourseData: (...args) => dispatch(getCourseData(...args)),
  createLecture: (...args) => dispatch(createLecture(...args)),
  deleteLecture: (...args) => dispatch(deleteLecture(...args)),
  createPiazzaBot: (...args) => dispatch(createPiazzaBot(...args)),
  disablePiazzaBot: (...args) => dispatch(disablePiazzaBot(...args))
})

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
