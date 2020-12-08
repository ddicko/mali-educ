/* eslint-disable react/prop-types */
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import React from "react";
import "../styles/app.css";

const theme = createMuiTheme({
	palette: {
		primary: purple,
	},
	typography: {
		fontFamily: ["'Montserrat'", "sans-serif"].join(","),
	},
	overrides: {
		MuiListItem: {
			button: {
				color: purple["100"],
			},
		},
		MuiListItemText: {
			primary: {
				color: "#eeeeee",
			},
		},
		MuiListItemIcon: {
			root: {
				color: "rgb(238, 238, 238)",
				minWidth: "36px",
			},
		},
	},
});

const DefaultThemeProvider = ({ children }) => {
	return (
		<>
			<MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
		</>
	);
};

export default DefaultThemeProvider;
