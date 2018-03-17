import "babel-polyfill";
import "bootstrap/dist/css/bootstrap.css";
// tslint:disable-next-line no-var-requires
const style = require("tv/frontend/style/index.scss");
import * as $ from "jquery";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as App from "tv/frontend/components/App";

$(() => {
  ReactDOM.render(App.rootElement, document.getElementById("root"));
});
