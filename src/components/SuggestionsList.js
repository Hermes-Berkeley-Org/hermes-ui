import React, { Component } from 'react'

import Suggestion from './Suggestion'

import './Search.css';

class SuggestionsList extends Component {
  render() {
    return (
      <ul className="suggestions">
        {this.props.results.map((result, i) => (
          <Suggestion result={result} query={this.props.query}/>
        ))}
      </ul>
    )
  }

}

SuggestionsList.defaultProps = {
  results: []
}

export default SuggestionsList;
