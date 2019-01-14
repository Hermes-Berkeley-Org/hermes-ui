import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title'
import Modal from 'react-modal'

import { ROLE_STUDENT, ROLE_INSTRUCTOR } from '../constants.js';
import { getData } from '../actions/home.js';
import Layout from './Layout.js';
import Loading from './Loading.js';
import CourseCard from './CourseCard.js';
import InternalError from './InternalError'

import './HomePage.css';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };

    this.openCreateCourseModal = this.openCreateCourseModal.bind(this);
    this.closeCreateCourseModal = this.closeCreateCourseModal.bind(this);
  }

  renderCourses(title, filter) {
    if (this.props.homeLoading) {
      return (
        <DocumentTitle title="Home">
          <div>
            <h3>{title}</h3>
            <Loading />
          </div>
        </DocumentTitle>
      );
    }
    if (this.props.homeData) {
      const validStudentActiveClasses = this.props.homeData.courses.filter(filter);
      if (validStudentActiveClasses.length > 0) {
        return (
          <DocumentTitle title="Home">
            <div>
              <h3>{title}</h3>
              <div className='card-list'>
                {validStudentActiveClasses.map((participation) =>
                  <CourseCard
                    hermesActive={participation['hermes_active']}
                    key={participation.course.id}
                    course={participation.course}
                    openCreateCourseModal={this.openCreateCourseModal}
                  ></CourseCard>
                )}
              </div>
            </div>
          </DocumentTitle>
        );
      }
    }
  }

  render() {
    if (this.props.homeDataError) {
      return <InternalError/>
    }
    return (
      <Layout>
        <div className='container'>
          <h2>Courses</h2>
          {this.renderCourses('Student', (course) => course.role === ROLE_STUDENT)}
          {this.renderCourses('Staff', (course) => course.role === ROLE_INSTRUCTOR)}
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeCreateCourseModal}
        >
          Create this course: {JSON.stringify(this.state.courseToBeCreated)}
        </Modal>
      </Layout>
    );
  }

  componentDidMount() {
    this.props.getHomeData(localStorage.getItem('okToken'))
  }

  openCreateCourseModal(course) {
    this.setState(
      {...this.state,
        modalIsOpen: true,
        courseToBeCreated: course
      }
    );
  }

  closeCreateCourseModal() {
    this.setState({...this.state, modalIsOpen: false});
  }



}

const mapStateToProps = state => ({
  ...state.homeReducer
})

const mapDispatchToProps = dispatch => ({
  getHomeData: (accessToken) => dispatch(getData(accessToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
