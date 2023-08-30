import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
	email: string;
	password: string;
	confirmPassword: string;
};

const SignUp: React.FC = () => {
	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const navigate = useNavigate();
	const { signUp } = useAuth();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		
		try {
			await signUp(data.email, data.password);
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
						onSubmit={handleSubmit(onSubmit)}
						className="form-control w-full"
					>
						<div className="relative">
							<label htmlFor="email" className="label">
								<span
									className={
										errors.email?.message
											? "label-text text-error"
											: "label-text"
									}
								>
									Email address
								</span>
							</label>
							<input
								{...register("email", {
									required: "Can't be empty",
									pattern: {
										value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
										message: "Not valid email",
									},
								})}
								id="email"
								type="email"
								placeholder="e.g. alex@email.com"
								autoComplete="email"
								className={
									errors.email?.message
										? "input input-bordered w-full mb-4 input-error"
										: "input input-bordered w-full mb-4 focus:border-primary"
								}
							/>
							<span className="text-error absolute right-2 bottom-7">
								{errors.email?.message}
							</span>
						</div>
						<div className="relative">
							<label htmlFor="password" className="label">
								<span
									className={
										errors.password?.message
											? "label-text text-error"
											: "label-text"
									}
								>
									Password
								</span>
							</label>
							<input
								{...register("password", {
									required: "Please check again",
									minLength: {
										value: 8,
										message:
											"Must be at least 8 characters",
									},
									pattern: {
										value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
										message:
											"At least one letter and one number",
									},
								})}
								id="password"
								type="password"
								placeholder="At least 8 characters"
								className={
									errors.password?.message
										? "input input-bordered w-full mb-4 input-error"
										: "input input-bordered w-full mb-4 focus:border-primary"
								}
							/>
							<span className="text-error absolute right-2 bottom-7">
								{errors.password?.message}
							</span>
						</div>
						<div className="relative">
							<label htmlFor="confirmPassword" className="label">
								<span
									className={
										errors.confirmPassword
											? "label-text text-error"
											: "label-text"
									}
								>
									Confirm Password
								</span>
							</label>
							<input
								{...register("confirmPassword", {
									required: "Please check again",
									validate: () =>
										String(getValues("password")) ===
											String(
												getValues("confirmPassword")
											) || "Passwords do not match",
								})}
								id="confirmPassword"
								type="password"
								placeholder="At least 8 characters"
								className={
									errors.confirmPassword
										? "input input-bordered w-full mb-4 input-error"
										: "input input-bordered w-full mb-4 focus:border-primary"
								}
							/>
							<span className="text-error absolute right-2 bottom-7">
								{errors.confirmPassword?.message}
							</span>
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
