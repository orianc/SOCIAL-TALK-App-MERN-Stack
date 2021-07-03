import React from 'react';
import InfoUser from './InfoUser';
import { makeStyles } from '@material-ui/core/styles';

import Avatar from './Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		maxWidth: 800,
	},
	title: {
		fontSize: 20,
		textTransform: 'capitalize',
	},
});

export default function ImgMediaCard(props) {
	const classes = useStyles();
	const DATA_USER = props.data.user;
	console.log('props in content = ', DATA_USER);
	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardContent>
					<Typography variant="h3" className={classes.title}>
						Edit Card
						<InfoUser data={DATA_USER} />
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
