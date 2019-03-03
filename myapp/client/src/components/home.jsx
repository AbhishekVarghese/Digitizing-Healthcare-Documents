import React, { Component } from "react";
import "./Home.css";
import "./Search.css";
import { Redirect } from "react-router-dom";
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
  constructor() {
    super();
  this.state = {
    name: "",
    lastname: "",
    id: "",
    found: true,
    recordsPerPage: 4,
    currentPage: 1,
    data: []
  };
  this.handleClick = this.handleClick.bind(this);
}
compare (a,b){
  let aa=parseInt(a.filename.substr(1,a.filename.indexOf('_')));
  let bb=parseInt(a.filename.substr(1,a.filename.indexOf('_')));
  if( aa < bb){
    return -1;
  }
  else{
    return 1;
  }
}

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
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
      .post("http://192.168.42.86:5000/search", {
        name: this.state.name,
        lastname: this.state.lastname,
        id: this.state.id
      })
      .then(response => {
        if (response.data.found === true) {
          let sorted= response.data.records.sort(this.compare);
          this.setState({
            data: sorted,
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
    if(this.props.location.state.username.substring(0,2)==="u_"){
      let user_id = this.props.location.state.username.substring(2);
      return (
        <Redirect
          to={{ pathname: "/user/", state: { id: user_id} }}
        />
      );
    }

    let { data, currentPage, recordsPerPage } = this.state;

    // Logic for displaying Records
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    console.log(currentRecords);
    const renderRecords = currentRecords.map(record => {
      return (
        <RecordRow
          id={record.id}
          name={record.name}
          filename={record.filename}
          file={record.file}
        />
      );
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / recordsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} onClick={this.handleClick} className="btn btn-primary">
          {number}
        </li>
      );
    });
    console.log(this.props.location.state.priv)
    return (
      <div id="h">
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
          <div className="row">
            <div className={this.props.location.state.priv ? "col-xl-6" : "col-xl-12"}>
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

              <table id="recs">
                <tbody> {renderRecords}</tbody>
              </table>
              <ul id="page-numbers">
                {renderPageNumbers} </ul>
              
            </div>
            <div className={this.props.location.state.priv ? "col-xl-6" : "hidden"}>
              <ReactUploadImage />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
