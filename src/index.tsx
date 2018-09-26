import * as React from "react";
import * as ReactDOM from "react-dom";
import {Main} from "./main";
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

OfflinePluginRuntime.install();

ReactDOM.render(
    <Main />,
    document.getElementById('root-container')
);
