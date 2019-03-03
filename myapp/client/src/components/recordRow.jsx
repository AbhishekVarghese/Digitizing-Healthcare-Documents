import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class RecordRow extends Component {
  state = {};

  download(file) {
    const url = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "record.json"); //or any other extension
    document.body.appendChild(link);
    link.click();
    /*await axios
      .post(
        "http://192.168.42.86:5000/download",
        {
          filename: this.props.filename
        }
        // responseType: "document" // important
      )
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data.file]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "record.json"); //or any other extension
        document.body.appendChild(link);
        link.click();
      });*/
  }

  render() {
    return (
      <div>
        <tr className="record-row">
          <td className="record-col1">{this.props.name}</td>
          <td className="record-col2">{this.props.id}</td>
          <td className="record-col3">
            <Link
              to={{ pathname: "/view/", state: { file: this.props.file } }}
            >
              <button className="btn btn-primary">View</button>
            </Link>
          </td>
          <td className="record-col3">
            <button
              onClick={e => {
                e.preventDefault();
                this.download(this.props.file);
              }}
              className="btn btn-primary"
            >
              Download
            </button>
          </td>
        </tr>
      </div>
    );
  }
}

export default RecordRow;
