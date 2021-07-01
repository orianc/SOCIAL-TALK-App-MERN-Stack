import React, { useEffect, useState } from 'react';

import Content from './Content';
import { CircularProgress } from '@material-ui/core';

const ProfileMain = () => {
	const [dataUser, setUser] = useState(null);

	useEffect(() => {
		restoreLogin();
	}, []);

	function restoreLogin() {
		fetch('/api/auth/login')
			.then((res) => res.json())
			.then((data) => {
				setUser(data.user);
				console.log('restore log =', data.user);
			});
	}

	if (dataUser == null) {
		return <CircularProgress color={'secondary'} thickness={1} size={40} />;
	}

	return (
		<div className="container align-items-center justify-content-center vh-100 d-flex">
			<div className="row">
				<Content data={dataUser}></Content>
			</div>
		</div>
	);
};

export default ProfileMain;
