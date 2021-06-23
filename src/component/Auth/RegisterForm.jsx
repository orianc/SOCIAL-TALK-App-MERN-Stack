import React, { useState } from 'react';

const RegisterForm = () => {
	const [user, setUser] = useState({});

	const handlerNewUser = async (e) => {
		e.preventDefault();
		await window.fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user }),
		});
		if (user.email && user.pw && user.firstName && user.lastName) {
			return alert('You can login now.');
		}
		return alert('miss some field completion :(');
	};
	// Re-work catch error on register
	return (
		<div className=" my-3 p-3 rounded">
			<div className=" p-1 text-center">
				<h6 className="">Create an account</h6>
			</div>
			<form>
				<div className="mb-3">
					<input
						onChange={(event) => setUser({ ...user, email: event.currentTarget.value })}
						className="form-control form-control-sm"
						type="email"
						placeholder="email"
						name="emailInput"
					/>
				</div>
				<div className="mb-3">
					<input
						onChange={(event) => setUser({ ...user, firstName: event.currentTarget.value })}
						placeholder="first name"
						className="form-control form-control-sm"
						type="text"
						name="firstNameInput"
					/>
				</div>

				<div className="mb-3">
					<input
						onChange={(event) => setUser({ ...user, lastName: event.currentTarget.value })}
						className="form-control form-control-sm"
						type="text"
						placeholder="last name"
						name="lastNameInput"
					/>
				</div>

				<div className="mb-3">
					<input
						onChange={(event) => setUser({ ...user, pw: event.currentTarget.value })}
						className="form-control form-control-sm"
						placeholder="password"
						type="password"
						name="pwInput"
					/>
				</div>

				<button onClick={handlerNewUser} className="btn btn-sm btn-outline-primary" type="submit">
					Sign in
				</button>
			</form>
		</div>
	);
};

export default RegisterForm;
