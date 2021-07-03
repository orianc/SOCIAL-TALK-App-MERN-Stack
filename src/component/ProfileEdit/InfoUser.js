import React, { useState, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Avatar from './Avatar';
import { FormControl, Snackbar, TextField, CircularProgress } from '@material-ui/core';
import { Input as InputIcon } from '@material-ui/icons';
import { UserContext } from '../../middleware/context/context';
import { Alert, AlertTitle } from '@material-ui/lab';

// ComponentStyle
const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(2, 0),
		width: '100%',
	},
	textfield: {
		margin: theme.spacing(2),
	},
}));
///

export const validateForm = (ErrorStatus) => {
	if ((ErrorStatus.age || ErrorStatus.pw || ErrorStatus.email) !== true) {
		return true;
	}
	return false;
};
// ----------------------- Component

export default function UserInfo(props) {
	const DATA_USER = useContext(UserContext);
	const avatar = '/uploads/' + DATA_USER.picture;

	const classes = useStyles();
	const [ErrorStatus, setErrorStatus] = useState({
		firstName: false,
		lastName: false,
		email: false,
		pw: false,
		age: false,
	});
	const [open, setOpen] = useState(false);
	const [openError, setOpenError] = useState(false);

	const [user, setDataUser] = useState(DATA_USER);
	const [picture, setPicture] = useState(() => {
		if (DATA_USER.picture !== undefined) {
			return avatar;
		}
		return '';
	});

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			setOpenError(false);
			setOpen(false);
			return;
		}
		setOpenError(false);
		setOpen(false);
	};

	const handlerClick = async (e) => {
		try {
			e.preventDefault();
			if (validateForm(ErrorStatus)) {
				await fetch('/api/profile/edit', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ user }),
				});
				if (user.email && user.pw && user.firstName && user.lastName) {
					setOpen(true);
					return (window.location.href = 'http://localhost:3000/profile');
				}
			}
			return setOpenError(true);
		} catch (error) {
			setOpenError(true);
			return console.error('Error on ¨POST profile-edit ', error);
		}
	};

	const onDrop = (e) => {
		setPicture(e.target.files[0]);

		// ---- Try to add a preview uploading
		// var file = e.target.files[0];
		// var reader = new FileReader();
		// var url = reader.readAsDataURL(file);

		// ---- a bug on during this instruction
		// reader.onloadend(setReaderRes({ imgLink: [reader.result] }));
		// console.log(url);
	};

	const saveImage = async (e) => {
		e.preventDefault();
		try {
			var formData = new FormData();
			await formData.append('picture', picture);
			await fetch('/api/profile/uploadAvatar', {
				method: 'POST',
				body: formData,
			});
			setOpen(true);
			return (window.location.href = 'http://localhost:3000/profile-edit');
		} catch (error) {
			setOpenError(true);
			return console.error('Error saveImage() ', error);
		}
	};

	if (DATA_USER === undefined) return <CircularProgress color={'secondary'} thickness={1} size={40} />;
	return (
		<div>
			<Snackbar open={openError} autoHideDuration={4000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error">
					<AlertTitle>Error</AlertTitle>
					Some field get wrong value or are empty — <strong>Please, try again.</strong>
				</Alert>
			</Snackbar>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert severity="success">Change saved !</Alert>
			</Snackbar>

			<form className="form-control justify-content-center" onSubmit={saveImage} method="POST" encType="multipart/form-data">
				{/* <input className name="file" type="file" filename="picture" onChange={onDrop}></input> */}

				<Avatar src={picture} className="justify-content-center" />
				<InputLabel htmlFor="file">Change Avatar</InputLabel>
				<Input name="file" type="file" filename="picture" onChange={onDrop} />

				<Button type="submit">
					<InputIcon className="m-1" /> Submit
				</Button>
			</form>
			<form className={classes.root} noValidate autoComplete="on">
				<TextField
					label="First Name"
					defaultValue={DATA_USER.firstName}
					required={true}
					onChange={(event) => setDataUser({ ...user, firstName: event.currentTarget.value })}
					className={classes.textfield}
					inputProps={{ 'aria-label': 'first-name' }}
					color="primary"
					variant="outlined"
					size="small"
				/>
				<TextField
					label="Last Name"
					required={true}
					size="small"
					defaultValue={DATA_USER.lastName}
					onChange={(event) => setDataUser({ ...user, lastName: event.currentTarget.value })}
					className={classes.textfield}
					variant="outlined"
					inputProps={{ 'aria-label': 'last-name' }}
				/>
				<TextField
					type="email"
					label="E-Mail"
					required={true}
					defaultValue={DATA_USER.email}
					onChange={(e) => {
						setDataUser({ ...user, email: e.currentTarget.value });
						if (e.currentTarget.value.includes('@') && e.currentTarget.value.includes('.')) {
							return setErrorStatus({ email: false });
						} else {
							setErrorStatus({ email: true });
						}
					}}
					error={ErrorStatus.email}
					variant="outlined"
					size="small"
					className={classes.textfield}
					inputProps={{ 'aria-label': 'email' }}
				/>
				<TextField
					type="password"
					label="Password"
					defaultValue={DATA_USER.pw}
					required={true}
					onChange={(e) => {
						setDataUser({ ...user, pw: e.currentTarget.value });
						if (e.currentTarget.value.length < 8 || e.currentTarget.value.length > 16) {
							return setErrorStatus({ pw: true });
						} else {
							setErrorStatus({ pw: false });
						}
					}}
					error={ErrorStatus.pw}
					helperText="*Must be between 8 and 16 character."
					size="small"
					variant="outlined"
					inputProps={{ 'aria-label': 'pw' }}
					className={classes.textfield}
				/>
				<FormControl>
					<TextField
						type="number"
						label="age"
						size="small"
						defaultValue={DATA_USER.age}
						onChange={(e) => {
							setDataUser({ ...user, age: e.currentTarget.value });
							if (e.currentTarget.value < 10 || e.currentTarget.value > 90) {
								setErrorStatus({ age: true });
							} else {
								setErrorStatus({ age: false });
							}
						}}
						error={ErrorStatus.age}
						variant="outlined"
						className={classes.textfield}
						inputProps={({ 'aria-label': 'age' }, { min: '10' })}
					/>
				</FormControl>
				<CardActions className="justify-content-center">
					<Button onClick={handlerClick} variant="contained" color="secondary" size="small">
						Confirm
					</Button>
				</CardActions>
			</form>

			{/* <Avatar src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" /> */}
		</div>
	);
}
