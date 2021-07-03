import React, { useState } from 'react';

import { Input, Snackbar, Button, CircularProgress } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

export const RegisterForm = () => {
	const [user, setUser] = useState({});
	const [open, setOpen] = useState(false);
	const [openError, setOpenError] = useState(false);

	const handlerUserConnection = async (e) => {
		e.preventDefault();
		try {
			await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user }),
			})
				.then((res) => res.json())
				.then((data) => {
					setUser(data.user);
					setOpen(true);
					setTimeout(() => {
						window.location.href = '/posts';
					}, 2000);
				});
		} catch (error) {
			setOpenError(true);
			console.error('Error during POST login ', error);
		}
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			setOpenError(false);
			setOpen(false);
			return;
		}
		setOpenError(false);
		setOpen(false);
	};

	return (
		<div className=" my-3 p-3 bg-light rounded ">
			<Snackbar open={openError} autoHideDuration={4000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error">
					<AlertTitle>Error</AlertTitle>
					Login fail... something wrong. — <strong>Try again !</strong>
				</Alert>
			</Snackbar>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert severity="success">
					Login success <CircularProgress color={'secondary'} thickness={1} size={40} />
				</Alert>
			</Snackbar>

			<div className=" p-1 text-center">
				<h5>Connect</h5>
			</div>
			<form className="text-secondary">
				<div className="mb-3">
					<Input
						onChange={(event) => setUser({ ...user, email: event.currentTarget.value })}
						className="form-control form-control-sm"
						type="email"
						placeholder="email"
						name="emailInput"
					/>
				</div>

				<div className="mb-3">
					<Input
						onChange={(event) => setUser({ ...user, pw: event.currentTarget.value })}
						className="form-control form-control-sm"
						placeholder="password"
						type="password"
						name="pwInput"
					/>
				</div>

				<Button onClick={handlerUserConnection} variant="contained" color="primary" type="submit">
					Connect
				</Button>
			</form>
		</div>
	);
};

export default RegisterForm;
