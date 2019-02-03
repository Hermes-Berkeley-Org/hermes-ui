import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title'

import { getCourseData, createLecture, deleteLecture } from '../actions/course.js';
import { createPiazzaBot, disablePiazzaBot } from '../actions/piazza.js'

import EnablePiazzaForm from './EnablePiazzaForm.js'
import DisablePiazzaForm from './DisablePiazzaForm.js'
import AddLectureForm from './AddLectureForm.js';
import Layout from './Layout.js';
import LectureList from './LectureList.js';
import Loading from './Loading.js';
import NotFound from './errors/NotFound.js'
import InternalError from './errors/InternalError.js'
import Modal from './Modal.js';

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
          <NotFound /> : <InternalError />
      }</div>
    }
    return (
      <Layout>
        <DocumentTitle title={!this.props.courseData ? 'Course' : this.props.courseData.info['display_name']}>
          <div className='container container-course'>
            <h2>
              {this.props.courseLoading || this.props.piazzaLoading ? <Loading /> : this.props.courseData.info['display_name']}
            </h2>
            <div className='container-course-sections'>
              <div className='course-lectures'>
                {this.props.courseLoading || this.props.piazzaLoading
                  ? null
                  : this.props.courseData.lectures.length > 0 ?
                    <LectureList
                      role={this.props.role}
                      courseId={this.props.courseId}
                      lectures={!this.props.courseData ? [] : this.props.courseData.lectures}
                      deleteLecture={(lecture) => this.props.deleteLecture(
                        this.props.courseId,
                        lecture,
                        this.props.courseData,
                      )} /> :
                    <h3>📭 No lectures</h3>}
              </div>
              {this.props.role !== ROLE_INSTRUCTOR ? null :
                <div className='course-lecture-actions'>
                  <div className='course-lecture-creation'>
                    <h3>Create a lecture</h3>
                    <AddLectureForm
                      courseId={this.props.courseId}
                      course={this.props.courseData}
                      createLecture={this.props.createLecture}
                    />
                  </div>
                  <div>
                    {this.props.courseLoading || this.props.piazzaLoading ? null :
                      this.props.courseData.info['piazza_active'] === 'active' ?
                        <a className='btn btn-link' onClick={this.openPiazzaModal}><i className="ai ai-piazza"></i> Disable piazza</a> :
                        <a className='btn btn-link' onClick={this.openPiazzaModal}><i className="ai ai-piazza"></i> Enable piazza</a>}
                  </div>
                </div>}
            </div>
            <Modal
              isOpen={this.state.piazzaModalIsOpen}
              onRequestClose={this.closePiazzaModal}
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
    this.props.getCourseData(this.props.courseId)
  }

  openPiazzaModal() {
    this.setState({ piazzaModalIsOpen: true });
  }

  closePiazzaModal() {
    this.setState({ piazzaModalIsOpen: false });
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
