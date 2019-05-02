import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import './Search.css';

class Suggestion extends Component {
  render() {
    return (
      <Link to={`/course/${this.props.result['course_ok_id'][0]}/lecture/${this.props.result['lecture_url_name'][0]}/video/${this.props.result['video_index'][0]}`}>
      <li className="suggestion">
        <span className="search-match">
        {this.props.result.text[0].split(' ').map((word, i) => (
          (this.props.query.toLowerCase().split(' ').includes(word.toLowerCase())) ? <b>{word} </b> : `${word} `
        ))}
        </span>
        <span className="search-match-info">
        {this.props.result['course_display_name']} : {this.props.result['lecture_display_name'][0]} : {this.props.result['video_index'][0]}
        </span>
      </li>
      </Link>
    )
  }

}

export default Suggestion;
