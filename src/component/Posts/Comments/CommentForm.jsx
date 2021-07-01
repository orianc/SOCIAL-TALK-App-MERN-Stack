import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { IconButton, InputAdornment, Input, InputLabel, FormControl } from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Message';

import Avatar from '../../ProfileCard/Avatar';
import './CommentForm.css';
import { UserContext } from '../../../middleware/context/context';

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(3, 0, 1, 0),
	},
}));

const Comment = (props) => {
	const classes = useStyles();
	const POST_ID = props.PostId;
	const DATA_SESSION_USER = useContext(UserContext);
	const avatar = '/uploads/' + DATA_SESSION_USER.picture;

	const [comment, setComment] = useState({
		DATA_USER: DATA_SESSION_USER,
		POST_ID,
		COMMENT_CONTENT: null,
	});
	const [reset, setReset] = useState('');

	// console.log(comment);

	const handlerNewComment = async (e) => {
		e.preventDefault();
		await window
			.fetch('/api/posts/add-comment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ comment }),
			})
			.then((res) => res.json())
			.then((result) => {
				alert('Your new comment was added');
				console.log(('Add : ', result));
			});
	};
	return (
		<div className="text-right d-inline px-2">
			<FormControl className={classes.margin}>
				<InputLabel htmlFor="input-with-icon-adornment">Comment</InputLabel>
				<Input
					onChange={(event) => setComment({ ...comment, COMMENT_CONTENT: event.currentTarget.value })}
					id="input-with-icon-adornment"
					placeholder="Comment here..."
					rows="2"
					startAdornment={
						<InputAdornment className="mx-1" position="start">
							<Avatar src={avatar} />
						</InputAdornment>
					}
				/>
			</FormControl>
			<IconButton className={classes.margin} onClick={handlerNewComment} aria-label="comment">
				<MessageIcon />
			</IconButton>
		</div>
	);
};

export default Comment;
