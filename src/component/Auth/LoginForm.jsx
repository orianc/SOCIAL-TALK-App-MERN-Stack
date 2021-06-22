import React, { useState } from 'react';

const RegisterForm = () => {
	const [user, setUser] = useState({});

	// console.log('user direct = ', user);

	const handlerUserConnection = async (e) => {
		e.preventDefault();
		await window
			.fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user }),
			})
			.then((res) => res.json())
			.then((data) => setUser(data.user))
			.then((window.location.href = 'http://localhost:3000/profile'));

		//To do :  Tester Login Error
	};

	return (
		<div className=" my-3 p-3 bg-secondary rounded ">
			<div className="mb-3 p-3 text-white rounded bg-primary">
				<h5>Connection</h5>
			</div>
			<form className="text-white">
				<div className="text-white mb-3">
					<label className="form-label" htmlFor="emailInput">
						Email
					</label>
					<input
						onChange={(event) => setUser({ ...user, email: event.currentTarget.value })}
						className="form-control form-control-sm"
						type="email"
						name="emailInput"
					/>
				</div>

				<div className="mb-3">
					<label className="form-label" htmlFor="pwInput">
						Password
					</label>
					<input
						onChange={(event) => setUser({ ...user, pw: event.currentTarget.value })}
						className="form-control form-control-sm"
						type="password"
						name="pwInput"
					/>
				</div>

				<button onClick={handlerUserConnection} className="btn btn-sm btn-primary" type="submit">
					Connect
				</button>
			</form>
		</div>
	);
};

export default RegisterForm;
