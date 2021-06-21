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
		maxWidth: 345,
	},
	title: {
		fontSize: 30,
		textTransform: 'capitalize',
	},
});

const handlerPostNewProfile = () => {
	// Method POST pour écraser vers la route en back
	// les nouvelles données par dessus les anciennes,
	//
};

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
		</Card>
	);
}
