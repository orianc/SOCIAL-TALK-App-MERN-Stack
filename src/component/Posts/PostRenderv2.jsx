import React, { useState, useEffect } from 'react';
import { CircularProgress, Container } from '@material-ui/core';
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
import Box from '@material-ui/core/Box';
import { auto } from 'async';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
		marginTop: 20,
		marginBottom: 40,
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
	// console.log(post[0].comments[0].userInformation.USER_FIRST_NAME);
	return (
		<div className="container ">
			{post
				.slice(0)
				.reverse()
				.map((p) => (
					<Card key={p._id} className={classes.root}>
						<CardHeader
							align="left"
							avatar={<Avatar aria-label="recipe" className={classes.avatar}></Avatar>}
							title={
								<Typography align="left" variant="button">
									{p.userInformation.firstName + ' ' + p.userInformation.lastName}
								</Typography>
							}
							subheader={p.postTime}
						/>
						{/* <CardMedia className={classes.media} image="/static/images/cards/paella.jpg" title="Paella dish" /> */}
						<Box bgcolor="info.main" className="rounded mx-3" color="secondary.contrastText">
							<CardContent className="  text-start justify-content">
								<Typography variant="body2" component="p">
									{p.content}
								</Typography>
							</CardContent>
						</Box>
						<div className=" ">
							<CardActions className="pb-0">
								<IconButton
									className={clsx(classes.expand, {
										[classes.expandOpen]: expanded,
									})}
									aria-label="show more"
								>
									<p className="fs-6 px-2 m-0">Read Comment</p>
									<ExpandMoreIcon />
								</IconButton>
							</CardActions>

							<div style={{ height: 110 }} className="mx-1 overflow-scroll">
								{p.comments.map((c) => (
									<div className="bg-light p-2">
										<Typography className="px-2" align="left" variant="subtitle2">
											{c.userInformation.USER_FIRST_NAME} {c.userInformation.USER_LAST_NAME}
										</Typography>

										<Box className="rounded" bgcolor="info.main" color="secondary.contrastText">
											<Typography className=" rounded p-2" align="left" variant="body2">
												{c.comment_content}
											</Typography>
										</Box>
									</div>
								))}
							</div>
							<CommentForm dataUser={dataUser} PostId={p._id} />
						</div>
					</Card>
				))}
		</div>
	);
}
