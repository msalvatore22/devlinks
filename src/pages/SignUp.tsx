import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const SignUp: React.FC = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { signUp } = useAuth();

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			await signUp(email, password);
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<div className="card bg-base-100 shadow-xl w-[480px]">
				<div className="card-body">
					<h1 className="card-title text-3xl">Create account</h1>
					<p className="mb-6 text-gray">
						Let's getyou started sharing your links!
					</p>
					<form
						onSubmit={handleSubmit}
						className="form-control w-full"
					>
						<label
							htmlFor="email"
							className="label invalid:text-error"
						>
							<span className="label-text">Email address</span>
						</label>
						<div className="flex relative">
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
						</div>
						<label htmlFor="password" className="label">
							<span className="label-text">Password</span>
						</label>
						<div className="flex relative">
							<input
								id="password"
								type="password"
								placeholder="Enter your password"
								className="input input-bordered w-full mb-4 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-error"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<label htmlFor="confirm" className="label">
							<span className="label-text">Confirm password</span>
						</label>
						<div className="flex relative">
							<input
								id="confrim"
								type="password"
								placeholder="At least 8 characters"
								className="input input-bordered w-full mb-4"
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
								required
							/>
						</div>

						<p className="text-sm text-gray mb-4">
							Password must contain at least 8 characters
						</p>
						<div className="card-actions">
							<button
								type="submit"
								className="btn btn-primary w-full mb-4 group-invalid:pointer-events-none group-invalid:opacity-30"
							>
								Create new account
							</button>
						</div>
					</form>
					<p className="text-gray text-center">
						Already have an account?{" "}
						<a className="text-primary" href="/login">
							Login
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
