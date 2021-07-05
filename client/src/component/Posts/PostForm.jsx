import React, { useContext, useState } from 'react';
import { CircularProgress, Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { UserContext } from '../../middleware/context/context';
import Avatar from '../ProfileCard/Avatar';

const Post = (props) => {
	const DATA_SESSION_USER = useContext(UserContext);
	const [open, setOpen] = useState(false);
	const [openError, setOpenError] = useState(false);

	const [post, setPost] = useState({
		DATA_USER: DATA_SESSION_USER,
		content: '',
	});

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			setOpenError(false);
			setOpen(false);
			return;
		}
		setOpenError(false);
		setOpen(false);
	};
	const handlerNewPost = async (e) => {
		e.preventDefault();
		try {
			await window.fetch('/api/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ post }),
			});
			return setOpen(true);
		} catch (error) {
			setOpenError(true);
			return console.error('Error on POST PostForm : ', error);
		}
	};
	const avatar = '/uploads/' + DATA_SESSION_USER.picture;

	return (
		<div className="container m-sm-5 m-2 py-5">
			<Snackbar open={openError} autoHideDuration={4000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error">
					<AlertTitle>Error</AlertTitle>
					Oups post failed <strong>Please, try again.</strong>
				</Alert>
			</Snackbar>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert severity="success">
					Post send ! Wait reload all posts...
					<CircularProgress color={'secondary'} thickness={1} size={40} />
				</Alert>
			</Snackbar>
			<div className="row flex-column">
				<div className="d-flex my-4 align-items-center">
					<Avatar src={avatar} />
					<h5>
						{DATA_SESSION_USER.firstName} {DATA_SESSION_USER.lastName}
					</h5>
					<br />
				</div>
				<div className="d-flex my-2">
					<textarea
						onChange={(event) => setPost({ ...post, content: event.currentTarget.value })}
						className="form-control"
						name="postContent"
						rows="5"
						maxLength="250"
						placeholder={'Hi ' + DATA_SESSION_USER.firstName + ' , write something cool here !'}
					></textarea>
					<button onClick={handlerNewPost} type="submit" className="btn btn-sm text-primary">
						Post
						<span className="material-icons">send</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Post;
