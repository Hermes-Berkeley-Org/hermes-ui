import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Loading from './Loading';
import NotFound from './errors/NotFound'
import Forbidden from './errors/Forbidden'
import InternalError from './errors/InternalError'
import GooglePrivate from './Google/GooglePrivate'
import { getRole } from '../actions/user.js'


import { ROLE_INSTRUCTOR } from '../constants.js'

class InstructorAuthenticated extends Component {

  render() {
    if (!this.props.instructorLoading && !this.props.roleData) {
      if (this.props.courseNotFound) {
        return <NotFound/>
      } else if (this.props.roleDataError) {
        return <InternalError/>
      }
    } if (this.props.instructorLoading) {
      return (<Loading />);
    } else if (this.props.roleData.role === ROLE_INSTRUCTOR) {
      return (
        <GooglePrivate nextUrl={this.props.nextUrl}>
          <React.Fragment>
            {React.cloneElement(this.props.children, { role: this.props.roleData.role })}
          </React.Fragment>
        </GooglePrivate>
      );
    } else {
      if (this.props.allowNonInstructors) {
        return (
          <React.Fragment>
            {React.cloneElement(this.props.children, { role: this.props.roleData.role })}
          </React.Fragment>
        )
      } else {
        return <Forbidden/>
      }
    }
  }

  componentWillMount() {
    const encryptedTokens = localStorage.getItem('okToken')
    this.props.getRole(encryptedTokens, this.props.children.props.courseId)
  }
}

InstructorAuthenticated.defaultProps = {
    instructorLoading: true
}

InstructorAuthenticated.propTypes = {
    instructorLoading: PropTypes.bool.isRequired,
    isInstructor: PropTypes.bool
}

const mapStateToProps = state => ({
  ...state.instructorAuthenticatedReducer
})

const mapDispatchToProps = dispatch => ({
  getRole: (tokens, courseId) => dispatch(getRole(tokens, courseId))
})

export default connect(mapStateToProps, mapDispatchToProps)(InstructorAuthenticated);
