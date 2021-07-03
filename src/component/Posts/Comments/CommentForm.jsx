import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Snackbar, CircularProgress, IconButton, InputAdornment, Input, InputLabel, FormControl } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import MessageIcon from '@material-ui/icons/Message';

import Avatar from '../../ProfileCard/Avatar';
import './CommentForm.css';
import { UserContext } from '../../../middleware/context/context';

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(3, 0, 1, 0),
	},
	color: {
		color: '#f50057',
	},
}));

const Comment = (props) => {
	const [open, setOpen] = useState(false);
	const [openError, setOpenError] = useState(false);

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
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			setOpenError(false);
			setOpen(false);
			return;
		}
		setOpenError(false);
		setOpen(false);
	};

	const handlerNewComment = async (e) => {
		e.preventDefault();
		try {
			await window
				.fetch('/api/posts/add-comment', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ comment }),
				})
				.then((res) => res.json());
			return setOpen(true);
		} catch (error) {
			setOpenError(true);
			return console.error('Error on POST comment :', error);
		}
	};
	return (
		<div className="text-right d-inline px-2">
			<Snackbar open={openError} autoHideDuration={4000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error">
					<AlertTitle>Error</AlertTitle>
					Oups comment failed <strong>Please, try again.</strong>
				</Alert>
			</Snackbar>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert severity="success">
					Post comment success! <CircularProgress color={'secondary'} thickness={1} size={40} />
				</Alert>
			</Snackbar>
			<FormControl className={classes.margin}>
				<InputLabel htmlFor="input-with-icon-adornment">Comment</InputLabel>
				<Input
					onChange={(event) => setComment({ ...comment, COMMENT_CONTENT: event.currentTarget.value })}
					id="input-with-icon-adornment"
					placeholder="Comment here..."
					rows="2"
					autoComplete="off"
					inputProps={{ maxlength: '150' }}
					startAdornment={
						<InputAdornment className="mx-1" position="start">
							<Avatar src={avatar} />
						</InputAdornment>
					}
				/>
			</FormControl>
			<IconButton className={classes.margin} onClick={handlerNewComment} aria-label="comment">
				<MessageIcon className={classes.color} />
			</IconButton>
		</div>
	);
};

export default Comment;
