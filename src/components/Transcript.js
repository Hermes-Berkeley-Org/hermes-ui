import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getTranscript } from '../actions/transcript.js';

class Transcript extends Component {
  render() {
    if (this.props.transcriptLoading) {
      return <div>Loading...</div>
    }
    if (!this.props.transcriptLoading && !this.props.transcript) {
      return <div>Failed to load transcript</div>;
    }
    console.log()
    return (
        <table>
          <tbody>
          {this.props.transcript.map((transcriptElement, index) => (
            <tr key={index}>
              <td key={`timestamp-${index}`}>{transcriptElement.begin}</td>
              <td key={`text-${index}`}>{transcriptElement.text}</td>
            </tr>
          ))}
          </tbody>
        </table>
    );
  }

  componentDidMount() {
    this.props.getTranscript(
      localStorage.getItem('okToken'),
      this.props.courseId,
      this.props.lectureIndex,
      this.props.videoIndex
    );
  }
}

const mapStateToProps = state => ({
  ...state.transcriptReducer
})

const mapDispatchToProps = dispatch => ({
  getTranscript: (...args) => dispatch(getTranscript(...args)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Transcript);
