import './App.css';
import React, { useEffect, useState } from 'react';
import Auth from './component/Auth';
import Nav from './component/Nav';
import { UserContext } from './middleware/context/context';

const App = () => {
	const [session, setSession] = useState({});

	useEffect(() => {
		restoreLogin();
	}, []);

	const restoreLogin = async () => {
		try {
			const res = await fetch('/api/auth/login');
			const data = await res.json();
			if (data.user.user) {
				return setSession(data.user.user);
			}
		} catch (error) {
			return console.error('Oops, Error : ', error);
		}
	};

	function Greeting(session) {
		if (session.session.email) {
			return (
				<>
					{console.log(`Login success as ${session.session.firstName}`)}
					<UserContext.Provider value={session.session}>
						<Nav dataUser={session} />
					</UserContext.Provider>
				</>
			);
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
