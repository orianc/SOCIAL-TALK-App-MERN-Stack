import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import ImageUploader from 'react-images-upload';
import { TextField } from '@material-ui/core';

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

// Component

export default function UserInfo(props) {
	const classes = useStyles();
	const DATA_USER = props.data;
	const [user, setDataUser] = useState(DATA_USER);
	const [picture, setPicture] = useState('');

	// console.log('sate picture value ', picture[0]);

	const handlerClick = (e) => {
		e.preventDefault();
		fetch('/api/profile/edit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user }),
		})
			.then((res) => res.json())
			.then((window.location.href = 'http://localhost:3000/profile'));
	};

	const onDrop = (e) => {
		setPicture(e.target.files[0]);
	};
	console.log(picture);

	const saveImage = (e) => {
		e.preventDefault();
		var formData = new FormData();
		formData.append('picture', picture);

		fetch('/api/profile/uploadAvatar', {
			method: 'POST',
			body: formData,
		});
		// .then((window.location.href = 'http://localhost:3000/profile'));
	};

	return (
		<div>
			<form onSubmit={saveImage} method="POST" encType="multipart/form-data">
				<input name="file" type="file" filename="picture" onChange={onDrop}></input>
				{/* <ImageUploader
					name="file"
					onChange={onDrop}
					type="file"
					filename="picture"
					withPreview={true}
					withIcon={false}
					buttonText={'Change Avatar Profile'}
					imgExtension={['.jpg', '.png', '.gif']}
					maxFileSize={5242880}
					withLabel={true}
					singleImage={true}
				/> */}
				<button type="submit">Submit</button>
			</form>
			<form className={classes.root} noValidate autoComplete="off">
				<TextField
					className={classes.textfield}
					onChange={(event) => setDataUser({ ...user, firstName: event.currentTarget.value })}
					defaultValue={DATA_USER.firstName}
					inputProps={{ 'aria-label': 'first-name' }}
					color="primary"
					variant="outlined"
					label="First Name"
				/>
				<TextField
					className={classes.textfield}
					label="Last Name"
					variant="outlined"
					onChange={(event) => setDataUser({ ...user, lastName: event.currentTarget.value })}
					defaultValue={DATA_USER.lastName}
					inputProps={{ 'aria-label': 'last-name' }}
				/>
				<TextField
					className={classes.textfield}
					label="E-Mail"
					variant="outlined"
					onChange={(event) => setDataUser({ ...user, email: event.currentTarget.value })}
					defaultValue={DATA_USER.email}
					inputProps={{ 'aria-label': 'email' }}
					type="email"
				/>
				<TextField
					className={classes.textfield}
					label="Password"
					variant="outlined"
					onChange={(event) => setDataUser({ ...user, pw: event.currentTarget.value })}
					defaultValue={DATA_USER.pw}
					inputProps={{ 'aria-label': 'pw' }}
					type="password"
				/>
				<TextField
					className={classes.textfield}
					label="age"
					variant="outlined"
					onChange={(event) => setDataUser({ ...user, age: event.currentTarget.value })}
					defaultValue={DATA_USER.age}
					inputProps={{ 'aria-label': 'age' }}
					type="number"
				/>
				<CardActions>
					<Button onClick={handlerClick} size="small" color="primary">
						Confirm
					</Button>
				</CardActions>
			</form>

			{/* <Avatar src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" /> */}
		</div>
	);
}
