import React from 'react';
import { Link } from 'react-router-dom';

import InfoUser from './InfoUser';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	title: {
		fontSize: 30,
	},
	display: {
		backgroundColor: 'blue',
		color: 'blue',
	},
});

export default function ImgMediaCard(props) {
	const classes = useStyles();
	const DATA_USER = props.data.user;
	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h3" className={classes.title}>
						<InfoUser data={DATA_USER} />
					</Typography>
				</CardContent>
			</CardActionArea>

			<CardActions>
				<Button component={Link} to="/profile-edit" size="small" color="primary">
					Edit
				</Button>
			</CardActions>
		</Card>
	);
}
