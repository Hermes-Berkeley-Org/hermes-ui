import React, { Component } from 'react';
import ReactTable from 'react-table'
import { Link } from 'react-router-dom'

const columns = [
  {
    Header: "Lecture",
    id: 'lecture',
    accessor: d => <Link to={d.route}>{d.title}</Link>
  },
  {
    Header: "Date",
    accessor: "date"
  }
]

class PlaylistTable extends Component {
  render() {
    return (
      <ReactTable
        data={this.props.playlists}
        columns={columns}
        subRowsKey="lectures"
      />
    );
  }

}

export default PlaylistTable;
