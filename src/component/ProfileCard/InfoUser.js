import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
	console.log('props= ', DATA_USER);

	return (
		<List className={classes.root}>
			<ListItem className={classes.test}>
				<Avatar src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" />
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
