import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import CommentMain from './Comments/CommentMain';

const PostRender = () => {
	const [post, setPost] = useState(null);
	const [dataUser, setDataUser] = useState(null);

	useEffect(() => {
		setTimeout(
			() =>
				fetch('/api/posts')
					.then((res) => res.json())
					.then((data) => setPost(data)),
			3000,
		);
	}, [post]);
	// console.log('DATA USER = ', dataUser, 'and DATA_POST = ', post);

	if (post == null) return <CircularProgress color={'secondary'} thickness={1} size={40} />;

	return (
		<div>
			{post
				.slice(0)
				.reverse()
				.map((p) => (
					<div key={p._id} className="container rounded m-sm-5 m-2 py-4 px-5 bg-secondary text-white">
						<div className="row flex-column">
							<div className="d-flex ">
								<img className="rounded-pill mx-3" src="./logo512.png" alt="" height="30px" width="30px" />
								<h5>
									{p.userInformation.firstName} {p.userInformation.lastName}
								</h5>
							</div>
							<div className="text-left m-2">
								<p className="">{p.content}</p>
								<blockquote className="blockquote-footer text-right text-white">{p.postTime}</blockquote>
							</div>
						</div>
						<div className="d-flex justify-content-end">
							<CommentMain />
						</div>
					</div>
				))}
		</div>
	);
};

export default PostRender;
