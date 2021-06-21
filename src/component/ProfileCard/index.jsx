import React, { useEffect, useState } from 'react';
import Content from './Content';

const ProfileMain = () => {
	const [dataUser, setUser] = useState(null);

	useEffect(() => {
		restoreLogin();
		console.log('useEffect ');
	}, []);

	function restoreLogin() {
		fetch('/api/auth/login')
			.then((res) => res.json())
			.then((data) => {
				setUser(data.user);
				console.log('restore log =', data.user);
			});
	}
	console.log('dataUser', dataUser);

	if (dataUser == null) {
		return <div>Profil loading..</div>;
	}
	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<Content data={dataUser}></Content>
			</div>
		</div>
	);
};

export default ProfileMain;
