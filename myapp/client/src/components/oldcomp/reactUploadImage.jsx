import React from "react";
import "./upload.css";
const axios = require("axios");

class ReactUploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      img_Id: ""
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onChangeID = this.onChangeID.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", this.state.file);
    formData.append("img_Id", this.state.img_Id);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("http://10.40.2.219:5000/upload", formData, config)
      .then(response => {
        alert("The file is successfully uploaded");
      })
      .catch(error => {});
  }
  onChangeFile(e) {
    this.setState({ file: e.target.files[0] });
  }
  onChangeID(e) {
    this.setState({ img_Id: e.target.value });
  }

  render() {
    return (
      <form name="firstform" onSubmit={this.onFormSubmit} id="upload-form">
        <link itemprop="url" rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <fieldset className="my-fieldset">
          <legend align="center" className="login-legend">
            <h3>Upload a Health Record</h3>
          </legend>
          <br />
          <div className="firststage">
            <label>Patient ID: </label>
            <input
              type="text"
              name="img_id"
              onChange={this.onChangeID}
              className="inp-id"
            />

            <input
              type="file"
              name="myImage"
              onChange={this.onChangeFile}
              className="btn"
            />
          </div>
          <div className="finalbutton">
            <center>
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-long"
              />
            </center>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default ReactUploadImage;
