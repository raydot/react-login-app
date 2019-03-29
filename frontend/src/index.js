import React from 'react';
import ReactDOM from 'react-dom';
// Note: If you were using React Native to develop an app for mobile devices, you would install react-router-native instead.
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
