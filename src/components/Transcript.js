import React, { Component } from 'react';

class Transcript extends Component {
  render() {
    if (this.props.transcriptLoading) {
      return <div>Loading...</div>
    }
    if (!this.props.transcriptLoading && !this.props.transcript) {
      return <div>Failed to load transcript</div>;
    }
    return (
      <table>
        <tbody>
          {this.props.transcript.map((transcriptElement, index) => (
            <tr key={index}>
              <td>{transcriptElement.begin}</td>
              <td>{transcriptElement.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Transcript;
