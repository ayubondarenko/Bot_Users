import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "webpack-icons-installer/bootstrap";
import React, {Component} from "react";
// import {StickyContainer, Sticky} from "react-sticky";
import "../App.css";
import BotUsers from "./BotUsers.jsx";

class App extends Component {

    render() {
        return (
        <BotUsers/>
        );
    }
}

export default App;
