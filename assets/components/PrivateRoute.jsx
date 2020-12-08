/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthenticationContext from "../contexts/AuthenticationContext";

const PrivateRoute = ({ path, component }) => {
	const { isAuthenticated } = useContext(AuthenticationContext);

	return isAuthenticated ? (
		<Route path={path} component={component} />
	) : (
		<Redirect to="/" />
	);
};

export default PrivateRoute;