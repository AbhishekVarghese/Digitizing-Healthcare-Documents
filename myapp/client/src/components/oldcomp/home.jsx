import React, { Component } from "react";
import "./Home.css";
import "./Search.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import RecordRow from "./recordRow";
import ReactUploadImage from "./reactUploadImage.jsx";

library.add(faUser);
//const FileDownload = require("js-file-download");
class Home extends Component {
  state = {
    name: "",
    lastname: "",
    id: "",
    found: true,
    rows: []
  };

  updateNameValue(evt) {
    this.setState({
      name: evt.target.value
    });
  }

  updateLastnameValue(evt) {
    this.setState({
      lastname: evt.target.value
    });
  }

  updateIdValue(evt) {
    this.setState({
      id: evt.target.value
    });
  }
  async submit() {
    await axios
      .post("http://10.40.2.219:5000/search", {
        name: this.state.name,
        lastname: this.state.lastname,
        id: this.state.id
      })
      .then(response => {
        if (response.data.found === true) {
          let rows = response.data.records.map(record => {
            return (
              <RecordRow
                id={record.id}
                name={record.name}
                filename={record.filename}
              />
            );
          });
          this.setState({
            rows: rows,
            name: response.data.name,
            lastname: response.data.lastname,
            id: response.data.id,
            found: true
          });
        } else {
          this.setState({
            found: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div id="home-div">
        <div id="top">
          <span id="userInfo">
            <FontAwesomeIcon icon="user" className="user" />
            <span>{this.props.location.state.username}</span>

            <Link to="/">
              <button className="btn btn-primary logout">Logout</button>
            </Link>
          </span>
        </div>
        <div class="row">
          <div className="col-xl-6">
            <ReactUploadImage />
          </div>
          <div className="col-xl-6">
            <form method="post" id="search-form">
              <fieldset className="my-fieldset">
                <legend align="center" className="login-legend">
                  <h3>Search Health Records</h3>
                </legend>
                <span className={this.state.found ? "noError" : "error"}>
                  Sorry!! No record found
                </span>
                <input
                  className="inp-search btn-long"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={evt => this.updateNameValue(evt)}
                />
                <input
                  className="inp-search btn-long"
                  type="text"
                  placeholder="Last Name"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={evt => this.updateLastnameValue(evt)}
                />
                <input
                  className="inp-search btn-long"
                  type="text"
                  placeholder="Id Number"
                  name="id"
                  value={this.state.id}
                  onChange={evt => this.updateIdValue(evt)}
                />

                <button
                  id="search"
                  className="btn btn-primary btn-long"
                  onClick={e => {
                    e.preventDefault();
                    this.submit();
                  }}
                >
                  Search
                </button>
              </fieldset>
            </form>

            <table>
              <tbody> {this.state.rows} </tbody>{" "}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
