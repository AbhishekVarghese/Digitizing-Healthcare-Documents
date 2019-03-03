import React, { Component } from "react";
//import logo from "./logo.svg";
import { Route } from "react-router-dom";
import "./App.css";
import Form from "./components/form";
import Home from "./components/home";
import ViewRecord from "./components/viewRecord";
import UserView from "./components/userView.jsx"

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Form} />
        <Route exact path="/home/" component={Home} />
        <Route exact path="/view/" component={ViewRecord} />
        <Route exact path="/user/" component={UserView} />
      </div>
    );
  }
}

export default App;
