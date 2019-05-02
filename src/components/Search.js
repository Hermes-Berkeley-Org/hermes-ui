import React, { Component } from 'react'
import { connect } from 'react-redux';

import SuggestionsList from './SuggestionsList'

import { search } from '../actions/search.js'

import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    }
  }


 handleInputChange(event) {
   this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        this.props.search(this.state.query)
      } else {
        if (this.props.searchResults) {
          this.props.searchResults.length = 0;
        }
      }
    })
 }

 render() {
   return (
     <form>
       <input
         placeholder="Search all classes"
         ref={input => this.search = input}
         onChange={this.handleInputChange.bind(this)}
         className="search"
       />
       <SuggestionsList results={this.props.searchResults} query={this.state.query || ''}/>
     </form>
   )
 }
}

const mapStateToProps = state => ({
  ...state.searchReducer
})

const mapDispatchToProps = dispatch => ({
  search: (...args) => dispatch(search(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
