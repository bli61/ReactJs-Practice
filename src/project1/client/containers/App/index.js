import React, { Component } from "react";
import CreateNew from "../../components/CreateNew";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../../components/Home";
import EditUser from "../../components/EditUser";
import "./App.css";
class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact={true} path="/" component={Home} />
                        <Route exact={true} path="/new" component={CreateNew} />
                        <Route exact={true} path="/edit" component={EditUser} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
