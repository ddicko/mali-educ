import {
	AppBar,
	Button,
	IconButton,
	makeStyles,
	Toolbar,
} from "@material-ui/core";
import React, { useContext } from "react";
import { Menu as MenuIcon, Moon, Power } from "react-feather";
import AuthenticationContext from "../contexts/AuthenticationContext";
import LoginModalContext from "../contexts/LoginModalContext";
import authAPI from "../services/authAPI";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	appBar: {
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
		WebkitBoxShadow: "0 3px 0 0 rgba(0,0,0,.06)",
		boxShadow: "0 3px 0 0 rgba(0,0,0,.06)",
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
	loginButton: {
		position: "relative",
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
	},
	grow: {
		flexGrow: 1,
	},
	sectionMobile: {
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
}));

// eslint-disable-next-line react/prop-types
const TopBar = ({ handleDrawerToggle }) => {
	const classes = useStyles();

	const { handleOpen: handleLoginModalOpen } = useContext(LoginModalContext);

	const { logout } = authAPI;

	const {isAuthenticated, setIsAuthenticated} = useContext(AuthenticationContext);

	const handleLogout = () => {
		logout();

		setIsAuthenticated();
	}

	return (
		<>
			<AppBar
				position="fixed"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon color="#9e9e9e" />
					</IconButton>

					<div className={classes.grow} />

					<IconButton aria-label="theme changer" color="inherit">
						<Moon color="#9e9e9e" />
					</IconButton>

					{isAuthenticated ? (
						<IconButton aria-label="logout button" onClick={handleLogout}><Power />
					</IconButton>
						): (<Button
						variant="contained"
						color="primary"
						disableElevation
						onClick={handleLoginModalOpen}
					>
						Connexion
					</Button>)}

					
				</Toolbar>
			</AppBar>
		</>
	);
};

{
	/* <IconButton edge="end" aria-label="logout icon" color="inherit">
						<PowerIcon color="#9e9e9e" />
					</IconButton> */
}

export default TopBar;
