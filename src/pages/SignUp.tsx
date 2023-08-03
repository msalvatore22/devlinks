import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/firebase";
import {
	query,
	doc,
	getDocs,
	collection,
	where,
	writeBatch,
} from "firebase/firestore";

const SignUp = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const res = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const authUser = res.user;
			console.log(authUser);
			const q = query(
				collection(db, "users"),
				where("uid", "==", authUser.uid)
			);
			const docs = await getDocs(q);

			if (docs.docs.length === 0) {
				const batch = writeBatch(db);

				batch.set(doc(db, "users", authUser.uid), {
					email: authUser.email,
					photoURL: authUser?.photoURL ?? null,
					links: [],
					firstname: "",
					lastname: "",
				});
				await batch.commit();
			}
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="card bg-base-100 shadow-xl w-[480px]">
			<div className="card-body">
				<h1 className="card-title text-3xl">Create account</h1>
				<p className="mb-6 text-gray">
					Let's getyou started sharing your links!
				</p>
				<form onSubmit={handleSubmit} className="form-control w-full">
					<label htmlFor="email" className="label invalid:text-error">
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
							onChange={(e) => setConfirmPassword(e.target.value)}
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
	);
};

export default SignUp;
