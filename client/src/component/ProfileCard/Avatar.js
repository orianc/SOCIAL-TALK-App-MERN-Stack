import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(2),
		},
	},
	smallWidth: {
		width: '50%',
	},
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
	},
}));

export default function ImageAvatars(props) {
	const classes = useStyles();
	return (
		<span className={classes.root}>
			<Avatar src={props.src} />
		</span>
	);
}
