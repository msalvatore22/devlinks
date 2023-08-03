import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

export interface LoginPageProps {}

const LoginPage: React.FunctionComponent<LoginPageProps> = (props) => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleSubmit(e: any) {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;

				if (user) {
					navigate("/");
				}
				// ...
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<div className="card w-[480px] bg-base-100 shadow-xl">
			<div className="card-body w-full">
				<h1 className="card-title text-3xl">Login</h1>
				<p className="text-gray mb-6">
					Add your details below to get back into the app
				</p>
				<form onSubmit={handleSubmit} className="form-control w-full">
					<label htmlFor="email" className="label">
						<span className="label-text">Email address</span>
					</label>
					<input
						id="email"
						type="email"
						placeholder="e.g. alex@email.com"
						autoComplete="email"
						className="input input-bordered w-full mb-4 focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-error"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<label htmlFor="password" className="label">
						<span className="label-text">Password</span>
					</label>
					<input
						id="password"
						type="password"
						placeholder="Enter your password"
						className="input input-bordered w-full mb-4 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-error"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<div className="card-actions">
						<button className="btn btn-primary w-full mb-4">
							Login
						</button>
					</div>
					<p className="text-gray text-center">
						Don't have an account?{" "}
						<a className="text-primary" href="/signUp">
							Create account
						</a>
					</p>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
