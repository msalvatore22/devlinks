import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm, SubmitHandler } from "react-hook-form";

export interface LoginPageProps {}

type Inputs = {
	email: string;
	password: string;
};

const LoginPage: React.FC<LoginPageProps> = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const navigate = useNavigate();
	const { signIn } = useAuth();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		try {
			await signIn(data.email, data.password);
			navigate("/");
		} catch (err) {
			alert(err)
		}
	};

	return (
		<div className="w-screen h-screen flex justify-center items-center">
			<div className="card w-[480px] h-min bg-base-100 shadow-xl">
				<div className="card-body w-full">
					<h1 className="card-title text-3xl">Login</h1>
					<p className="text-gray mb-6">
						Add your details below to get back into the app
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
								placeholder="Enter your password"
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

						<div className="card-actions">
							<button className="btn btn-primary w-full my-4">
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
		</div>
	);
};

export default LoginPage;
