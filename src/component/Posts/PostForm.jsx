import React, { useState } from 'react';
import PostRender from './PostRender';

const Post = () => {
	const [post, setPost] = useState({
		content: '',
	});
	// console.log(JSON.stringify({ post }));

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
					<h5>UserNameConnected</h5>
				</div>
				<div className="text-left my-2">
					<label className="form-label" htmlFor="postContent"></label>
					<textarea
						onChange={(event) => setPost({ ...post, content: event.currentTarget.value })}
						className="form-control"
						name="postContent"
						rows="2"
						id="area"
					></textarea>
				</div>
			</div>
			<button onClick={handlerNewPost} type="submit" className="btn btn-outline-primary btn-sm">
				Post it
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					className=" ml-2 bi bi-plus-circle-fill"
					viewBox="0 0 16 16"
				>
					<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
				</svg>
			</button>
		</div>
	);
};

export default Post;
