import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
	const navigate = useNavigate();
	async function handleSignOut() {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				console.log("navigating to home");
				navigate("/getStarted");
			})
			.catch((error) => {
				// An error happened.
				console.log(error);
			});
	}

	if (auth.currentUser) {
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
