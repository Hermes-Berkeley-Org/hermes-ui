import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

const columns = [
  {
    Header: "Lecture",
    id: 'lecture',
    accessor: "name"
  },
  {
    Header: "Date",
    accessor: "date"
  }
];

class LecturesTable extends Component {
  render() {
    return (
      <ReactTable
        className={this.props.className}
        data={this.props.lectures}
        columns={columns}
        subRowsKey="lectures"
      />
    );
  }
}

export default LecturesTable;
