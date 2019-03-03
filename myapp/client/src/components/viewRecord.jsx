import React, { Component } from "react";

class ViewRecord extends Component {
  state = {};

  render() {
    let data = JSON.parse(this.props.location.state.file);
    let rows = []
    for(var key in data) {
      rows.push(<tr><td>{key}</td><td>{data[key]}</td></tr>);
    }
    return (
      <table id="vtable">
        <tbody> {rows} </tbody>
      </table>
    );
  }
}

export default ViewRecord;
