import React from "react";
import ReactDOM from "react-dom";
import Header from "./Components/Header.jsx";
import Copycat from "./Components/Copycat.jsx";

ReactDOM.render((
	<div>
		<Header />
		<Copycat>
			<li>Child node</li>
			<li>Child node</li>
		</Copycat>
	</div>
), document.querySelector("app"));
