import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from './Avatar';
import ProfileIcon from '@material-ui/icons/RecordVoiceOverRounded';
import MailIcon from '@material-ui/icons/AlternateEmailOutlined';

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

export default function FolderList(props) {
	const classes = useStyles();
	const DATA_USER = props.data;
	const DATA_USER_FULL_NAME = DATA_USER.firstName + ' ' + DATA_USER.lastName;
	const avatar = '/uploads/' + DATA_USER.picture;
	console.log(avatar);

	if (DATA_USER === undefined) return <CircularProgress color={'secondary'} thickness={1} size={40} />;

	return (
		<List className={classes.root}>
			<ListItem className={classes.test}>
				<Avatar src={avatar} />
				<ListItemText primary={DATA_USER_FULL_NAME} />
			</ListItem>

			<ListItem>
				<ListItemAvatar>
					<MailIcon />
				</ListItemAvatar>
				<ListItemText primary="Mail" secondary={DATA_USER.email} />
			</ListItem>

			<ListItem>
				<ListItemAvatar>
					<ProfileIcon />
				</ListItemAvatar>
				<ListItemText primary="Age" secondary={DATA_USER.age} />
			</ListItem>
		</List>
	);
}
