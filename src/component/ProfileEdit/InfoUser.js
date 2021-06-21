import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from './Avatar';
// import ProfileIcon from '@material-ui/icons/RecordVoiceOverRounded';
// import VpnKeyIcon from '@material-ui/icons/VpnKey';
// import MailIcon from '@material-ui/icons/AlternateEmailOutlined';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import Input from '@material-ui/core/Input';

// ComponentStyle
const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
		justifyContent: 'center',
	},
	test: {
		justifyContent: 'space-around',
	},
}));

// Component

export default function UserInfo(props) {
	const classes = useStyles();
	const DATA_USER = props.data;
	console.log('props= ', DATA_USER);
	const [user, setDataUser] = useState(DATA_USER);

	const handlerClick = (e) => {
		e.preventDefault();
		fetch('/api/profile/edit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user }),
		}).then((res) => res.json());
	};

	const newDataUser = JSON.stringify({ user });
	console.log(JSON.stringify({ user }));
	return (
		<div>
			<form className={classes.root} noValidate autoComplete="on">
				<Input
					onChange={(event) => setDataUser({ ...user, firstName: event.currentTarget.value })}
					defaultValue={DATA_USER.firstName}
					inputProps={{ 'aria-label': 'first-name' }}
				/>
				<Input
					onChange={(event) => setDataUser({ ...user, lastName: event.currentTarget.value })}
					defaultValue={DATA_USER.lastName}
					inputProps={{ 'aria-label': 'last-name' }}
				/>
				<Input
					onChange={(event) => setDataUser({ ...user, email: event.currentTarget.value })}
					defaultValue={DATA_USER.email}
					inputProps={{ 'aria-label': 'email' }}
				/>
				<Input
					onChange={(event) => setDataUser({ ...user, pw: event.currentTarget.value })}
					defaultValue={DATA_USER.pw}
					inputProps={{ 'aria-label': 'pw' }}
				/>
				<Input
					onChange={(event) => setDataUser({ ...user, age: event.currentTarget.value })}
					defaultValue={DATA_USER.age}
					inputProps={{ 'aria-label': 'age' }}
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
