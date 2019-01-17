import React, { Component } from 'react';

class Transcript extends Component {
  render() {
    return (
      <div className='video-transcript'>
        <table>
          <tbody>
            {this.props.transcript.map((transcriptElement, index) => (
              <tr key={index}>
                <td className='video-transcript-timestamp' key={`timestamp-${index}`}>{transcriptElement.begin}</td>
                <td className='video-transcript-text' key={`text-${index}`}>{transcriptElement.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Transcript;
