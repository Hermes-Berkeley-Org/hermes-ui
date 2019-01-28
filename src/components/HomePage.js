import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title'
import Modal from 'react-modal'

import { ROLE_STUDENT, ROLE_INSTRUCTOR } from '../constants.js';
import { getData, createCourse } from '../actions/home.js';
import Layout from './Layout.js';
import Loading from './Loading.js';
import CourseCard from './CourseCard.js';
import InternalError from './errors/InternalError'
import CreateCourseForm from './CreateCourseForm'

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
    if (this.props.homeLoading || this.props.createCourseLoading) {
      return (
        <div>
          <h3>{title}</h3>
          <Loading />
        </div>
      );
    }
    if (this.props.homeData) {
      const filteredCourses = this.props.homeData.courses.filter(filter);
      if (filteredCourses.length > 0) {
        return (
          <div>
            <h3>{title}</h3>
            <div className='card-list'>
              {filteredCourses.map((participation) =>
                <CourseCard
                  hermesActive={participation['hermes_active']}
                  key={participation.course.id}
                  course={participation.course}
                  openCreateCourseModal={this.openCreateCourseModal}
                ></CourseCard>
              )}
            </div>
          </div>
        );
      }
    }
  }

  render() {
    if (this.props.homeDataError) {
      return <InternalError />
    }
    return (
      <Layout>
        <DocumentTitle title="Home">
          <div className='container'>
            <h2>Courses</h2>
            {this.renderCourses('Student', (course) => course.role === ROLE_STUDENT)}
            {this.renderCourses('Staff', (course) => course.role === ROLE_INSTRUCTOR)}
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeCreateCourseModal}
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
              <CreateCourseForm
                course={this.state.courseToBeCreated}
                createCourse={this.props.createCourse}
                closeCreateCourseModal={this.closeCreateCourseModal}
              />
            </Modal>
          </div>
        </DocumentTitle>
      </Layout>
    );
  }

  componentDidMount() {
    this.props.getHomeData();
  }

  openCreateCourseModal(course) {
    this.setState(
      {
        ...this.state,
        modalIsOpen: true,
        courseToBeCreated: course
      }
    );
  }

  closeCreateCourseModal() {
    this.setState({ ...this.state, modalIsOpen: false });
  }

}

const mapStateToProps = state => ({
  ...state.homeReducer
})

const mapDispatchToProps = dispatch => ({
  getHomeData: (...args) => dispatch(getData(...args)),
  createCourse: (...args) => dispatch(createCourse(...args))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
