import React, { useState } from 'react';
import PostRender from './PostRender';

const Post = (props) => {
	const DATA_SESSION_USER = props.dataUser;
	const [post, setPost] = useState({
		id_User: DATA_SESSION_USER._id,
		firstName_User: DATA_SESSION_USER.firstName,
		lastName_User: DATA_SESSION_USER.lastName,
		content: '',
	});
	console.log(JSON.stringify({ post }));

	const handlerNewPost = async (e) => {
		e.preventDefault();
		await window.fetch('/api/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ post }),
		});
	};

	return (
		<div className="container m-sm-5 m-2 py-4 px-5 text-right">
			<div className="row flex-column">
				<div className="d-flex">
					<img className="rounded-pill mx-3" src="./logo512.png" alt="" height="30px" width="30px" />
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
						rows="2"
						placeholder={'Hi ' + DATA_SESSION_USER.firstName + ' , write something cool here !'}
					></textarea>
					<button onClick={handlerNewPost} type="submit" className="btn btn-outline-primary btn-sm">
						Send
						<span class="material-icons">send</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Post;
