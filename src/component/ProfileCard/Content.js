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

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	title: {
		fontSize: 30,
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
					<Typography gutterBottom variant="h5" component="h3" className={classes.title}>
						{/* <Avatar src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" /> */}
						<InfoUser data={DATA_USER} />
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary">
					Edit
				</Button>
			</CardActions>
		</Card>
	);
}
