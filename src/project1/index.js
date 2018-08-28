import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import store from "./client/store/configureStore";
import App from "./client/containers/App";

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// render(<App />, document.getElementById("root"));
