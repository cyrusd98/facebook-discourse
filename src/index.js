import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from "react-redux";
import store from "./store";
import Debate from "./components/layout.js"


ReactDOM.render(<Provider store = {store}> 
	<Debate /> 
	</Provider>, document.getElementById('root'));