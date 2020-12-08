import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import Topics from "./components/Topics";
import AuthenticationContext from "./contexts/AuthenticationContext";
import LoginModalContext from "./contexts/LoginModalContext";
import AddTopic from "./pages/AddTopic";
import SecretSubject from "./pages/SecretSubject";
import authAPI from "./services/authAPI";
import DefaultThemeProvider from "./themes/DefaultThemeProvider";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

authAPI.setup()

function App() {

	const [isAuthenticated, setIsAuthenticated] = useState(
		authAPI.isAuthenticated()
	);

	const classes = useStyles();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [open, setOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
    <div className={classes.root}>
      <CssBaseline />

      <AuthenticationContext.Provider
        value={{ isAuthenticated, setIsAuthenticated }}
      >
        <LoginModalContext.Provider
          value={{ open, handleOpen: handleClickOpen, handleClose }}
        >
          <TopBar handleDrawerToggle={handleDrawerToggle} />

          <SideBar
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />

          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <PrivateRoute path="/sujets-secrets" component={SecretSubject} />
              <PrivateRoute path="/ajouter-un-sujet" component={AddTopic} />
              <Route path="/" component={Topics} />
            </Switch>
            <Login />
          </main>
        </LoginModalContext.Provider>
      </AuthenticationContext.Provider>
    </div>
  );
}

App.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

ReactDOM.render(
	<DefaultThemeProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</DefaultThemeProvider>,
	document.getElementById("malieduc")
);
