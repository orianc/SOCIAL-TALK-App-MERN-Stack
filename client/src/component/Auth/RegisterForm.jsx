import React, { useState } from 'react';

import { Input, Snackbar, Button } from '@material-ui/core';
import { validateForm } from '../../middleware/validateForm';
import { Alert, AlertTitle } from '@material-ui/lab';

const RegisterForm = () => {
	const [open, setOpen] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [user, setUser] = useState({});
	const [ErrorStatus, setErrorStatus] = useState({
		firstName: false,
		lastName: false,
		email: false,
		pw: false,
		age: false,
	});

	const handlerNewUser = async (e) => {
		e.preventDefault();
		try {
			if (validateForm(ErrorStatus)) {
				await window.fetch('/api/auth/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ user }),
				});
				if (user.email && user.pw && user.firstName && user.lastName) {
					return setOpen(true);
				}
			}
			return setOpenError(true);
		} catch (error) {
			console.error('Error during SignIn POST ', error);
			return setOpenError(true);
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
	// Re-work catch error on register
	return (
		<div className=" my-3 p-3 rounded">
			<Snackbar open={openError} autoHideDuration={4000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error">
					<AlertTitle>Error</AlertTitle>
					Some field get wrong value or are empty — <strong>Please, try again.</strong>
				</Alert>
			</Snackbar>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert severity="success">Sign-in Success ! Try to login now.</Alert>
			</Snackbar>
			<div className=" p-1 text-center">
				<h5>Register</h5>
				<form>
					<div className="mb-3">
						<Input
							onChange={(e) => {
								setUser({ ...user, email: e.currentTarget.value });
								if (e.currentTarget.value.includes('@') && e.currentTarget.value.includes('.')) {
									return setErrorStatus({ email: false });
								} else {
									setErrorStatus({ email: true });
								}
							}}
							error={ErrorStatus.email}
							className="form-control form-control-sm"
							type="email"
							placeholder="email"
							name="emailInput"
							required={true}
						/>
					</div>
					<div className="mb-3">
						<Input
							onChange={(event) => setUser({ ...user, firstName: event.currentTarget.value })}
							placeholder="first name"
							className="form-control form-control-sm"
							type="text"
							name="firstNameInput"
						/>
					</div>

					<div className="mb-3">
						<Input
							onChange={(event) => setUser({ ...user, lastName: event.currentTarget.value })}
							className="form-control form-control-sm"
							type="text"
							placeholder="last name"
							name="lastNameInput"
						/>
					</div>

					<div className="mb-3">
						<Input
							onChange={(e) => {
								setUser({ ...user, pw: e.currentTarget.value });
								if (e.currentTarget.value.length < 8 || e.currentTarget.value.length > 16) {
									return setErrorStatus({ pw: true });
								} else {
									setErrorStatus({ pw: false });
								}
							}}
							error={ErrorStatus.pw}
							required={true}
							className="form-control form-control-sm"
							placeholder="password - between 8 and 16 character."
							type="password"
							name="pwInput"
						/>
					</div>

					<Button onClick={handlerNewUser} variant="contained" color="secondary" type="submit">
						Sign in
					</Button>
				</form>
			</div>
		</div>
	);
};

export default RegisterForm;
