import React, { Component } from "react";
import "./Home.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";

library.add(faUser);
//const FileDownload = require("js-file-download");
class Home extends Component {
  state = {
    name: "",
    lastname: "",
    id: "",
    found: true
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
      .post("http://192.168.43.243:5000/search", {
        name: this.state.name,
        lastname: this.state.lastname,
        id: this.state.id
      })
      .then(response => {
        if (response.data.found === true) {
          console.log(response.data);
          this.setState({
            name: response.data.name,
            lastname: response.data.lastname,
            id: response.data.id
          });
        } else {
          console.log("Invalid");
          this.setState({
            found: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  async download() {
    //await axios.get("http://10.196.1.174:5000/download");
    await axios({
      url: "http://192.168.43.243:5000/download",
      method: "GET"
      // responseType: "document" // important
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data.file]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "record.xml"); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  }
  /*async componentDidMount() {
    const message = (await axios.get("http://localhost:8081/")).data;
    this.setState({
      messg: message
    });
  }*/

  render() {
    return (
      <div id="home-div">
        <span id="userInfo">
          <FontAwesomeIcon icon="user" className="user" />
          <span>{this.props.location.state.username}</span>

          <Link to="/">
            <button className="btn btn-primary logout">Logout</button>
          </Link>
        </span>
        <button
          onClick={e => {
            e.preventDefault();
            this.download();
          }}
        >
          Download
        </button>
        <div>
          <form method="post">
            <h3>Search Health Reports</h3>
            <span className={this.state.found ? "noError" : "error"}>
              Sorry!! No record found
            </span>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={evt => this.updateNameValue(evt)}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={this.state.lastname}
              onChange={evt => this.updateLastnameValue(evt)}
            />
            <input
              type="text"
              placeholder="Id Number"
              name="id"
              value={this.state.id}
              onChange={evt => this.updateIdValue(evt)}
            />

            <button
              id="search"
              className="btn btn-primary"
              onClick={e => {
                e.preventDefault();
                this.submit();
              }}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
