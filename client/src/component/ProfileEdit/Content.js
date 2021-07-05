import React from 'react';
import InfoUser from './InfoUser';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
