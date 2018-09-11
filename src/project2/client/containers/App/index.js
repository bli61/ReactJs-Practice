import React, { Component } from "react";
import CreateNew from "../../components/CreateNew";
import DetailUser from "../../components/DetailUser";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../../components/Home";
import EditUser from "../../components/EditUser";
import ShowManagerInfo from "../../components/ShowManagerInfo";
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
                        <Route
                            exact={true}
                            path="/manager"
                            component={ShowManagerInfo}
                        />
                        <Route
                            exact={true}
                            path="/detail"
                            component={DetailUser}
                        />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
