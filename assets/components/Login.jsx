/* eslint-disable react/prop-types */
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	Slide,
	TextField,
} from "@material-ui/core";
import React, { useContext } from "react";
import { useState } from "react";
import { withRouter } from "react-router-dom";
import AuthenticationContext from "../contexts/AuthenticationContext";
import LoginModalContext from "../contexts/LoginModalContext";
import authAPI from "../services/authAPI";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const Login = ({history}) => {
	const { open, handleClose } = useContext(LoginModalContext);

	const [credentials, setCredentials] = useState({
		username: "",
		password:""
	})

	const handleChange = ({ currentTarget }) => {
		const { value, name } = currentTarget;

		setCredentials({...credentials, [name]:value})
	}


	const { setIsAuthenticated } = useContext(AuthenticationContext);

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await authAPI.authenticate(credentials)

			setIsAuthenticated(true)

			history.push("/sujets-secrets");

		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">Connexion</DialogTitle>
				<DialogContent>
					<form id="login-form" onSubmit={handleSubmit}>
						<Grid container spacing={1} direction="row">
							<Grid item xs={12} lg={6}>
								<TextField
									autoFocus
									margin="dense"
									id="username"
									name="username"
									label="Adresse email"
									type="email"
									fullWidth
									value={credentials.username}
									onChange={handleChange}
								/>
							</Grid>
							<Grid item xs={12} lg={6}>
								<TextField
									autoFocus
									margin="normal"
									id="password"
									label="Mot de passe"
									type="password"
									name="password"
									fullWidth
									value={credentials.password}
									onChange={handleChange}
								/>
							</Grid>
						</Grid>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Annuler
					</Button>
					<Button
						type="submit"
						form="login-form"
						onClick={handleClose}
						color="primary"
						variant="contained"
						disableElevation
					>
						Je me connecte
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default withRouter(Login);
