import React, { Component } from "react";
import "./Home.css";
import "./Search.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import RecordRow from "./recordRow";

library.add(faUser);
//const FileDownload = require("js-file-download");
class UserView extends Component {
  constructor() {
    super();
  this.state = {
    id: "",
    found: true,
    recordsPerPage: 4,
    currentPage: 1,
    data: []
  };
  this.handleClick = this.handleClick.bind(this);
}

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  componentDidMount(){
    axios
      .post("http://192.168.42.86:5000/search", {
        name: "",
        lastname: "",
        id: this.props.location.state.id
      })
      .then(response => {
        if (response.data.found === true) {
          
          this.setState({
            data: response.data.records,
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
    for (let i = 1; i <= Math.ceil(data.length/ recordsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} onClick={this.handleClick} className="btn btn-primary">
          {number}
        </li>
      );
    });
    return (
        <div>
          <div id="top">
            <span id="userInfo">
              <FontAwesomeIcon icon="user" className="user" />
              <span>{"u_" + this.props.location.state.id}</span>

              <Link to="/">
                <button className="btn btn-primary logout">Logout</button>
              </Link>
            </span>
          </div>
            <div>
              <table id="userRecs">
                <tbody> {renderRecords}</tbody>
              </table>
              <ul id="page-numbers" className="ncenter">
                {renderPageNumbers} </ul>
              
            </div>
      </div>
    );
  }
}

export default UserView;
