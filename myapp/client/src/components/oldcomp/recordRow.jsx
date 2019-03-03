import React, { Component } from "react";
import axios from "axios";

class RecordRow extends Component {
  state = {};

  async download() {
    //await axios.get("http://10.40.2.219:5000/download");
    await axios
      .post(
        "http://10.40.2.219:5000/download",
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
      });
  }

  render() {
    return (
      <div>
        <tr>
          <td>{this.props.name}</td>
          <td>{this.props.id}</td>
          <td>
            <button
              onClick={e => {
                e.preventDefault();
                this.download();
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
