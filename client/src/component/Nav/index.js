import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import PostMain from '../Posts/PostMain';
import Profile from '../ProfileCard';
import ProfileEdit from '../ProfileEdit';
import { PostsContext } from '../../middleware/context/context';
import { getPosts } from '../../middleware/context/getPosts';

import Button from '@material-ui/core/Button';

export default function Nav(props) {
	const [posts, setPost] = useState([]);
	const [call, setCall] = useState(0);

	const callIncrement = () => {
		setTimeout(() => {
			setCall(call + 1);
		}, 4500);
	};
	callIncrement();

	useEffect(() => {
		try {
			getPosts().then((posts) => {
				setPost(posts);
			});
		} catch (error) {
			console.error('Posts fill loading failed');
		}
	}, [call]);

	const Logout = () => {
		fetch('/api/auth/logout')
			.then((res) => res.json())
			.then((window.location.href = '/'));
	};

	return (
		<Router>
			<nav className="navbar navbar-expand-lg bg-white sticky-top">
				<div className="container">
					<Link className="navbar-brand" to="/posts">
						<h4 className="text-dark">
							SocialTalk
							<svg
								className="text-primary mx-3 bi bi-chat-quote-fill App-logo"
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM7.194 6.766a1.688 1.688 0 0 0-.227-.272 1.467 1.467 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 5.734 6C4.776 6 4 6.746 4 7.667c0 .92.776 1.666 1.734 1.666.343 0 .662-.095.931-.26-.137.389-.39.804-.81 1.22a.405.405 0 0 0 .011.59c.173.16.447.155.614-.01 1.334-1.329 1.37-2.758.941-3.706a2.461 2.461 0 0 0-.227-.4zM11 9.073c-.136.389-.39.804-.81 1.22a.405.405 0 0 0 .012.59c.172.16.446.155.613-.01 1.334-1.329 1.37-2.758.942-3.706a2.466 2.466 0 0 0-.228-.4 1.686 1.686 0 0 0-.227-.273 1.466 1.466 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 10.07 6c-.957 0-1.734.746-1.734 1.667 0 .92.777 1.666 1.734 1.666.343 0 .662-.095.931-.26z" />
							</svg>
						</h4>
					</Link>

					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavAltMarkup"
						aria-controls="navbarNavAltMarkup"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
							<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
						</svg>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav">
							<div className="row  shadow-sm bg-light rounded py-4">
								<div className="col-12 nav-link">
									<Button component={Link} className=" my-2 mx-4" variant="contained" color="primary" to="/posts">
										Let's Talk !
									</Button>

									<Button size={'small'} variant="contained" color="secondary" onClick={Logout}>
										Logout
									</Button>
								</div>
								<Link className="col-12 nav-link" to="/profile">
									<Profile />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</nav>

			<Switch>
				<Route path="/posts">
					<PostsContext.Provider value={posts}>
						<PostMain />
					</PostsContext.Provider>
				</Route>
				<Route path="/profile">
					<Profile />
				</Route>
				<Route path="/profile-edit">
					<ProfileEdit />
				</Route>
			</Switch>
		</Router>
	);
}
