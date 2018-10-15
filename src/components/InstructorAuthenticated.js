import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ReactLoading from 'react-loading';
import GooglePrivate from './Google/GooglePrivate'
import { getRole } from '../actions/user.js'

class InstructorAuthenticated extends Component {

  render() {
    console.log(this.props)
    if (this.props.instructorLoading) {
      return (<ReactLoading height={'20%'} width={'20%'} />);
    } else if (this.props.isInstructor) {
      return (
        <GooglePrivate nextUrl={this.props.nextUrl}>
          <div>
            {this.props.children}
          </div>
        </GooglePrivate>
      );
    } else {
      return (
        <div>
          {this.props.children}
        </div>
      )
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

const mapStateToProps = function(state) {
  const roleData = state.instructorAuthenticatedReducer
  return {
    isInstructor: roleData.role === 'instructor',
    instructorLoading: roleData.instructorLoading
  }
}

const mapDispatchToProps = dispatch => ({
  getRole: (tokens, courseId) => dispatch(getRole(tokens, courseId))
})

export default connect(mapStateToProps, mapDispatchToProps)(InstructorAuthenticated);
