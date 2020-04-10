import React from "react";
import { Link, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Form from "./components/Form.js";
import "./App.css";

const App = () => {
    return (
        <div className="App">
            <h1 className="header">Lambda Eats</h1>
            <div className="nav-container">
                <Link className="home" exact to="/">
                    Home
                </Link>
                <br />
                <Link className="order" to="/pizza">
                    Order now!
                </Link>
            </div>
            <Route path="/" exact component={Home} />
            <Route path="/pizza" component={Form} />
        </div>
    );
};
export default App;
