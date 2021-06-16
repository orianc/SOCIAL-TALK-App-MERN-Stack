import React, { useState, useEffect } from 'react';
import PostRender from './PostRender';
import PostForm from './PostForm';

const PostMain = () => {
	return (
		<div className="container">
			<PostForm />
			<PostRender />
		</div>
	);
};

export default PostMain;
