import React from 'react';
import PostRender from './PostRender';
import PostForm from './PostForm';

const PostMain = (props) => {
	return (
		<div className="container ">
			<PostForm />
			<PostRender />
		</div>
	);
};

export default PostMain;
