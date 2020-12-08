import { createContext } from "react";

export default createContext({
	isAuthenticated: false,
	// eslint-disable-next-line no-unused-vars
	setIsAuthenticated: (value) => {},
});