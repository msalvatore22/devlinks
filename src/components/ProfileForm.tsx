import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { showToastErrorMessage, showToastSucessMessage } from "./Toast";

type Inputs = {
	email: string;
	firstname: string;
	lastname: string;
};

const ProfileForm: React.FC = () => {
	const { user, uploadImage, updateProfile } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		defaultValues: {
			email: user?.email,
			firstname: user?.firstname,
			lastname: user?.lastname,
		},
	});
	const [previewURL, setPreviewURL] = useState(user?.photoURL);
	const inputStyle = "input input-bordered w-full sm:mb-4";

	const handleUploadImage = async (e: any) => {
		const file = e.target.files[0];
		try {
			setPreviewURL(URL.createObjectURL(file));
			uploadImage(file);
			showToastSucessMessage("Succesfully uploaded image!");
		} catch (error: any) {
			showToastErrorMessage(error.message);
		}
	};

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		try {
			await updateProfile({
				email: data.email,
				firstname: data.firstname,
				lastname: data.lastname,
			});
			showToastSucessMessage("Succesfully updated profile!");
		} catch (error: any) {
			showToastErrorMessage(error.message);
		}
	};

	return (
		<div>
			<ToastContainer />
			<h1 className="text-3xl font-bold">Profile Details</h1>
			<p className="text-gray mt-2">
				Add your details to add a personal touch to your profile.
			</p>

			<div className="flex flex-col bg-neutral w-full p-6 rounded-xl sm:my-8 my-2">
				<div className="flex items-center justify-between w-full">
					<div>
						<p className="text-gray">Profile picture</p>
					</div>
					<div className="flex items-center justify-between">
						{previewURL ? (
							<div className="flex flex-col justify-center">
								<img
									className="w-48 h-48 rounded-xl"
									src={previewURL}
									alt=""
								/>
								<button
									className="btn btn-ghost mt-4"
									onClick={() => setPreviewURL("")}
								>
									Change photo
								</button>
							</div>
						) : (
							<input
								type="file"
								className="file-input file-input-bordered file-input-primary max-w-xs"
								accept="image/png, image/jpeg"
								onChange={handleUploadImage}
							/>
						)}

						<div className="sm:mx-10 mx-2">
							<p className="text-gray text-xs font-light">
								Image must be below 1024x1024px. <br />
								Use PNG or JPG format.
							</p>
						</div>
					</div>
				</div>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col bg-neutral w-full p-6 rounded-xl sm:my-8 my-2">
					<div className="flex justify-between items-baseline relative">
						<p className="text-gray hidden sm:block">First name*</p>
						<div className="sm:w-4/5 w-full">
							<label
								htmlFor="firstname"
								className="label sm:hidden sm:block"
							>
								<span
									className={
										errors.email?.message
											? "label-text text-xs text-error"
											: "label-text"
									}
								>
									First Name
								</span>
							</label>
							<input
								{...register("firstname", {
									required: "Can't be empty",
								})}
								id="firstname"
								type="text"
								placeholder="e.g. Johnny"
								className={
									errors.firstname?.message
										? `${inputStyle} input-error`
										: `${inputStyle} focus:border-primary`
								}
							/>
							<span className="text-error absolute right-4 top-3">
								{errors.firstname?.message}
							</span>
						</div>
					</div>
					<div className="flex justify-between items-baseline relative">
						<p className="text-gray hidden sm:block">Last name*</p>
						<div className="sm:w-4/5 w-full">
							<label
								htmlFor="lastname"
								className="label sm:hidden sm:block"
							>
								<span
									className={
										errors.email?.message
											? "label-text text-xs text-error"
											: "label-text"
									}
								>
									Last Name
								</span>
							</label>
							<input
								{...register("lastname", {
									required: "Can't be empty",
								})}
								id="lastname"
								type="text"
								placeholder="e.g. Appleseed"
								className={
									errors.lastname?.message
										? `${inputStyle} input-error`
										: `${inputStyle} focus:border-primary`
								}
							/>
							<span className="text-error absolute right-4 top-3">
								{errors.lastname?.message}
							</span>
						</div>
					</div>
					<div className="flex justify-between items-baseline relative">
						<p className="text-gray hidden sm:block">Email</p>
						<div className="sm:w-4/5 w-full">
							<label
								htmlFor="email"
								className="label sm:hidden sm:block"
							>
								<span
									className={
										errors.email?.message
											? "label-text text-xs text-error"
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
								placeholder="e.g. email@email.com"
								autoComplete="email"
								className={
									errors.email?.message
										? `${inputStyle} input-error`
										: `${inputStyle} focus:border-primary`
								}
							/>
							<span className="text-error absolute right-4 top-3">
								{errors.email?.message}
							</span>
						</div>
					</div>
				</div>

				<div className="divider"></div>
				<div className="flex justify-end w-full">
					<button type="submit" className="btn btn-primary btn-block sm:btn-wide">
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default ProfileForm;
