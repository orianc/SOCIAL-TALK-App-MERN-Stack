import React, { useState, useEffect } from 'react';
import PostRender from './PostRender';
import PostForm from './PostForm';

const PostMain = (props) => {
	const DATA_SESSION_USER = props.dataUser;

	return (
		<div className="container ">
			<PostForm dataUser={DATA_SESSION_USER} />
			<PostRender dataUser={DATA_SESSION_USER} />
		</div>
	);
};

export default PostMain;
