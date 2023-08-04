import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const NavBar = () => {
	const navigate = useNavigate();
	const { signOutUser, user } = useAuth()
	async function handleSignOut() {
		signOutUser()
		navigate("/getStarted")
	}

	if (user) {
		return (
			<div className="navbar bg-base-100 flex justify-between rounded-xl p-4">
				<img src="/logo-devlinks-large.svg" alt="devlinks logo"></img>
				<div>
					<a href="/home/links" className="btn btn-secondary">
						Links
					</a>
					<a href="/home/profile" className="btn btn-link ml-8">
						Profile Details
					</a>
				</div>
				<div>
					<button className="btn btn-outline btn-primary mr-8">
						Preview
					</button>
					<button className="btn btn-ghost" onClick={handleSignOut}>
						Logout
					</button>
				</div>
			</div>
		);
	}
};

export default NavBar;
