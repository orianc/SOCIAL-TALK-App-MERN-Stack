import React, { useState } from 'react';

const RegisterForm = () => {
	const [user, setUser] = useState({});

	console.log('user direct = ', user);

	const handlerNewUser = async (e) => {
		e.preventDefault();
		await window
			.fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ user }),
			})
			.then(console.log('JSON.stringify = ', JSON.stringify({ user })))
			.then((window.location.href = 'http://localhost:3000/login'));
	};

	return (
		<div className="container w-50 my-3 p-3 bg-light rounded">
			<div className="mb-3 p-3 text-white rounded bg-primary">
				<h5>Welcome !</h5>
			</div>
			<form>
				<div className="mb-3">
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
					<label className="form-label" htmlFor="firstNameInput">
						First Name
					</label>
					<input
						onChange={(event) => setUser({ ...user, firstName: event.currentTarget.value })}
						className="form-control form-control-sm"
						type="text"
						name="firstNameInput"
					/>
				</div>

				<div className="mb-3">
					<label className="form-label" htmlFor="lastNameInput">
						Last Name
					</label>
					<input
						onChange={(event) => setUser({ ...user, lastName: event.currentTarget.value })}
						className="form-control form-control-sm"
						type="text"
						name="lastNameInput"
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

				<button onClick={handlerNewUser} className="btn btn-sm btn-primary" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default RegisterForm;
