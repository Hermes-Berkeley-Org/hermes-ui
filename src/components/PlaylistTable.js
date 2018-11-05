import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

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
];

class PlaylistTable extends Component {
  render() {
    return (
      <ReactTable
        className={this.props.className}
        data={this.props.playlists}
        columns={columns}
        subRowsKey="lectures"
      />
    );
  }
}

export default PlaylistTable;
