import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import './Search.css';

class Suggestion extends Component {
  render() {
    const seconds = this.props.result['begin'][0].split(":").map((n, i) => Math.pow(60, 2 - i) * parseInt(n)).reduce((a, b) => a + b, 0)

    return (
      <tr className="suggestion">
        <Link className="search-result" to={`/course/${this.props.result['course_ok_id'][0]}/lecture/${this.props.result['lecture_url_name'][0]}/video/${this.props.result['video_index'][0]}?seconds=${seconds}`}>
        <td className="search-match">
        ({this.props.result.begin[0].split('.')[0]}) {this.props.result.text[0].split(' ').map((word, i) => (
          (this.props.query.toLowerCase().split(' ').includes(word.toLowerCase())) ? <b>{word} </b> : `${word} `
        ))}
        </td>
        <td className="search-match-info">
        <font color="gray">
          <b>{this.props.result['course_display_name']}</b> <em>{this.props.result['lecture_title'][0]}</em> Video {this.props.result['video_index'][0]}
        </font>
        </td>
        </Link>
      </tr>

    )
  }

}

export default Suggestion;
