import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';

export default function Auth(props) {
	const [show, setShow] = useState(false);

	function handleShow() {
		setShow(true);
	}

	return (
		<Container className="vh-100 d-flex justify-content-center">
			<div className="row ">
				<Button variant="bg-white" size="lg" className="" onClick={() => handleShow()}>
					<h6 className=" text-secondary mb-4 ">Welcome</h6>
					<h1 className="fs-1 text-dark">
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
					</h1>
					<p className="fs-6 text-primary">Let's talk about something cool</p>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
						fill="currentColor"
						className="mt-5 text-success mx-3 bi bi-box-arrow-in-right"
						viewBox="0 0 16 16"
					>
						<path
							fill-rule="evenodd"
							d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
						/>
						<path
							fill-rule="evenodd"
							d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
						/>
					</svg>
				</Button>
				<Modal show={show} onHide={() => setShow(false)}>
					<Modal.Header className="bg-primary text-white justify-content-center">
						<Modal.Title>Authenticator</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Container>
							<Row>
								<Col lg xs={12}>
									<LoginForm />
								</Col>
								<Col lg xs={12}>
									<RegisterForm />
								</Col>
							</Row>
						</Container>
					</Modal.Body>
				</Modal>
			</div>
		</Container>
	);
}
