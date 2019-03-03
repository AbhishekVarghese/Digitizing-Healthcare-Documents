import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./Form.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
library.add(faUser);
library.add(faLock);
class Form extends Component {
  state = {
    username: "",
    password: "",
    redirectToHome: false,
    valid: true
  };
  updateInputValue(evt) {
    this.setState({
      username: evt.target.value
    });
  }
  updatePasswordValue(evt) {
    this.setState({
      password: evt.target.value
    });
  }
  async submit() {
    await axios
      .post("http://10.40.2.219:5000/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        if (response.data.valid === true) {
          console.log(response.data);
          this.setState({
            username: response.data.username,
            redirectToHome: true
          });
        } else {
          console.log("Invalid");
          this.setState({
            valid: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const redirectToHome = this.state.redirectToHome;
    if (redirectToHome === true) {
      return (
        <Redirect
          to={{ pathname: "/home/", state: { username: this.state.username } }}
        />
      );
    }
    return (
      <div id="form-div">
        <form method="post" id="login-form">
          <h3>Login</h3>
          <span className={this.state.valid ? "noError" : "error"}>
            Invalid username or password
          </span>

          <FontAwesomeIcon icon="user" className="display" />
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={evt => this.updateInputValue(evt)}
          />

          <FontAwesomeIcon icon="lock" className="display" />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={evt => this.updatePasswordValue(evt)}
          />

          <button
            id="login"
            className="btn btn-primary"
            onClick={e => {
              e.preventDefault();
              this.submit();
            }}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
