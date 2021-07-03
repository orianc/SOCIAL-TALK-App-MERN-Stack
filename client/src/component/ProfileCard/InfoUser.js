import React, { useContext } from 'react';
import { UserContext } from '../../middleware/context/context';

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
	const USER_SESSION = useContext(UserContext);
	const classes = useStyles();

	const userFullName = USER_SESSION.firstName + ' ' + USER_SESSION.lastName;
	const avatar = '/uploads/' + USER_SESSION.picture;

	if (USER_SESSION === undefined) return <CircularProgress color={'secondary'} thickness={1} size={40} />;

	return (
		<List className={classes.root}>
			<ListItem className={classes.test}>
				<Avatar src={avatar} />
				<ListItemText primary={userFullName} />
			</ListItem>

			<ListItem>
				<ListItemAvatar>
					<MailIcon />
				</ListItemAvatar>
				<ListItemText primary="Mail" secondary={USER_SESSION.email} />
			</ListItem>

			<ListItem>
				<ListItemAvatar>
					<ProfileIcon />
				</ListItemAvatar>
				<ListItemText primary="Age" secondary={USER_SESSION.age} />
			</ListItem>
		</List>
	);
}
