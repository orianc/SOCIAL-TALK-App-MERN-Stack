import React, { useState, useEffect } from 'react';
import ImageUploader from 'react-images-upload';
import { CardActions, Button } from '@material-ui/core';

export default function GetImage(props) {
	const [picture, setPicture] = useState(null);
	const user = props.dataSession;
	console.log(JSON.stringify({ user, picture }));

	console.log('pic intra compo: ', picture);
	const onDrop = (picture) => {
		setPicture({ picture });
	};
	const handlerClick = () => {
		console.log('click ok');
		fetch('/api/profile/edit-profile-avatar', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user: { user, picture } }),
		}).then((res) => res.json());
	};
	return (
		<div>
			<ImageUploader
				withPreview={true}
				withIcon={props.withIcon}
				buttonText={props.buttonText || 'Add Image'}
				onChange={onDrop}
				imgExtension={['.jpg', '.png', '.gif']}
				maxFileSize={5242880}
				withLabel={false}
				singleImage={props.singleImage || false}
			/>
			<CardActions>
				<Button size="small" color="primary" onClick={handlerClick}>
					Confirm
				</Button>
			</CardActions>
		</div>
	);
}
