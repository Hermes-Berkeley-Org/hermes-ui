import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

import 'react-table/react-table.css';

const columns = [
  {
    Header: "Lecture",
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
        SubComponent={row => (
          <div>
            <ul>
              {row.original.video_titles.map((title, i) => (
                <li key={i}>
                  <Link to={`/course/${this.props.courseId}/lecture/${row.index}/video/${i}`}>{title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      />
    );
  }
}

export default LecturesTable;
