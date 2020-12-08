/* eslint-disable react/prop-types */
import {
	Divider,
	Drawer,
	Hidden,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	useTheme,
} from "@material-ui/core";
import React from "react";
import { Award, BarChart2, BookOpen, Lock, PenTool, Youtube } from "react-feather";
import authAPI from "../services/authAPI";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: "rgb(27, 36, 48)",
		color: "#ffffff",
	},
}));


const SideBar = ({ window, mobileOpen, handleDrawerToggle }) => {
	const classes = useStyles();
	const theme = useTheme();

	const { isAuthenticated } = authAPI;

	const items = [
	{ text: "Sujets et corrigés", icon: <BookOpen /> },
	{ text: "Examens et résultats", icon: <PenTool /> },
	{ text: "Bourses d'étude", icon: <Award /> },
	{ text: "Excellence", icon: <BarChart2 /> },
	{ text: "Tutoriels", icon: <Youtube /> },
];

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				{items.map((item, index) => (
					<ListItem
						button
						selected={index === 0 ? true : false}
						key={index + item.text}
					>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text} />
					</ListItem>
				))}
				{isAuthenticated() && (
					<ListItem button>
						<ListItemIcon><Lock/></ListItemIcon>
						<ListItemText primary="Sujets secrets" />
					</ListItem>
				)}
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<>
			<nav className={classes.drawer}>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
		</>
	);
};

export default SideBar;
