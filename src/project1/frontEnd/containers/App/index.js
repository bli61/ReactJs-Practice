import React, { Component } from "react";
import CreateNew from "../../components/CreateNew";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../../components/Home";

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact={true} path="/" component={Home} />
                        <Route
                            exact={true}
                            path="/newUser"
                            component={CreateNew}
                        />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
