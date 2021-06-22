import './App.css';
import React, { useEffect, useState } from 'react';
import Auth from './component/Auth';
import Nav from './component/Nav';

const App = () => {
	const [session, setSession] = useState({});

	useEffect(() => {
		restoreLogin();
	}, []);
	console.log('state session', session);

	function restoreLogin() {
		fetch('/api/auth/login')
			.then((res) => res.json())
			.then((data) => {
				if (data.user.user) {
					console.log(data.user.user);
					setSession(data.user.user);
				}
				// console.log('restore log =', data.user);
			});
	}

	function Greeting(session) {
		console.log('inside greeting : ', session.session.email);
		if (session.session.email) {
			return <Nav dataUser={session} />;
		}
		return <Auth />;
	}

	return (
		<div className="App">
			<Greeting session={session} />
		</div>
	);
};
export default App;
