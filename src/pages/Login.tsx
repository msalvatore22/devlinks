import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { showToastErrorMessage  } from "../components/Toast"
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

	const inputStyle = "input input-bordered w-full px-11 mb-4"

	const navigate = useNavigate();
	const { signIn } = useAuth();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		try {
			await signIn(data.email, data.password);
			navigate("/");
		} catch (err: any) {
			showToastErrorMessage(err.message)
		}
	};

	return (
		<div className="w-full min-h-screen flex justify-center items-center">
			<ToastContainer />
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
										? `${inputStyle} input-error`
										: `${inputStyle} focus:border-primary`
								}
							/>
							<span className="text-error absolute right-2 bottom-7">
								{errors.email?.message}
							</span>
							<img
								className="absolute bottom-8 left-4"
								src="/icon-email.svg"
								alt="email icon"
							></img>
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
										? `${inputStyle} input-error`
										: `${inputStyle} focus:border-primary`
								}
							/>
							<span className="text-error absolute right-2 bottom-7">
								{errors.password?.message}
							</span>
							<img
								className="absolute bottom-8 left-4"
								src="/icon-password.svg"
								alt="email icon"
							></img>
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
