import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import CommentForm from './Comments/CommentForm';
import Comments from './Comments/Comments';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '../ProfileCard/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
		marginTop: 20,
		marginBottom: 20,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
}));

export default function RecipeReviewCard(props) {
	const [post, setPost] = useState(null);
	const dataUser = props.dataUser;

	useEffect(() => {
		setTimeout(
			() =>
				fetch('/api/posts')
					.then((res) => res.json())
					.then((data) => setPost(data)),
			5000,
		);
	}, [post]);
	// console.log('DATA USER = ', dataUser, 'and DATA_POST = ', post);

	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	if (post == null) return <CircularProgress color={'secondary'} thickness={1} size={40} />;

	return (
		<div className="container">
			{post
				.slice(0)
				.reverse()
				.map((p) => (
					<Card key={p._id} className={classes.root}>
						<CardHeader
							avatar={<Avatar aria-label="recipe" className={classes.avatar}></Avatar>}
							title={p.userInformation.firstName + ' ' + p.userInformation.lastName}
							subheader={p.postTime}
						/>
						{/* <CardMedia className={classes.media} image="/static/images/cards/paella.jpg" title="Paella dish" /> */}
						<CardContent className="text-center justify-content-center">
							<Typography component="p">{p.content}</Typography>
							<CommentForm className="text-center justify-content-center mx-auto" />
						</CardContent>
						<CardActions disableSpacing>
							{/* <IconButton aria-label="add to favorites">
								<FavoriteIcon />
							</IconButton>
							<IconButton aria-label="share">
								<ShareIcon />
							</IconButton> */}

							<IconButton
								className={clsx(classes.expand, {
									[classes.expandOpen]: expanded,
								})}
								onClick={handleExpandClick}
								aria-expanded={expanded}
								aria-label="show more"
							>
								<p className="fs-6 px-2 m-0">Read Comment</p>
								<ExpandMoreIcon />
							</IconButton>
						</CardActions>
						<Collapse in={expanded} timeout="auto" unmountOnExit>
							{p.comments.map((c) => (
								<CardContent>
									<Typography paragraph>
										{c.content}
										{/* <Comments data={c} /> */}
									</Typography>
								</CardContent>
							))}
						</Collapse>
					</Card>
				))}
		</div>
	);
}
