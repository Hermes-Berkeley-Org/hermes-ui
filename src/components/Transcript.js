import React, { Component } from 'react';

class Transcript extends Component {
  render() {
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
}

export default Transcript;
