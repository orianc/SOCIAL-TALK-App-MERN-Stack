import React, { useContext } from 'react';
import { PostsContext } from '../../middleware/context/context';
import { UserContext } from '../../middleware/context/context';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Card, IconButton, Typography, Box, CardActions, CardContent, CardHeader } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CommentForm from './Comments/CommentForm';
import './PostRender.css';

import Avatar from '../ProfileCard/Avatar';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100vw',
		marginTop: 20,
		marginBottom: 0,
		borderTop: 'solid 1px lightgrey',
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
}));

export default function RecipeReviewCard(props) {
	const post = useContext(PostsContext);
	const dataUser = useContext(UserContext);
	const classes = useStyles();

	if (post == null) return <CircularProgress color={'secondary'} thickness={1} size={40} />;
	return (
		<div className="container d-flex flex-column align-items-center">
			{post
				.slice(0)
				.reverse()
				.map((p) => (
					<Card key={p._id} className={classes.root}>
						<CardHeader
							align="left"
							avatar={<Avatar src={'/uploads/' + p.userInformation.userPicture} aria-label="recipe" />}
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
								<IconButton aria-label="show more">
									<p className="fs-6 px-2 m-0">Read Comment</p>
									<ExpandMoreIcon />
								</IconButton>
							</CardActions>
							<div style={{ maxHeight: 210, boxShadow: '0px 0px 1px inset' }} className="mx-1 overflow-scroll">
								{p.comments.map((c) => (
									<div className="bg-light px-4 py-2 border">
										<div className="row">
											<Avatar src={'/uploads/' + c.userInformation.USER_PIC} aria-label="recipe" />

											<Typography className="d-flex px-2" align="left" variant="subtitle2">
												{c.userInformation.USER_FIRST_NAME + ' ' + c.userInformation.USER_LAST_NAME}
											</Typography>
										</div>

										<Box className="rounded" color="text.secondary">
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
