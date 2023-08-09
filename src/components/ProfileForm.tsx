import React, { useState } from "react";
import { useAuth, ProfileDetails } from "../hooks/useAuth";

const ProfileForm: React.FC = () => {
	const { user, uploadImage, updateProfile } = useAuth();
	const [firstname, setFirstname] = useState(user?.firstname as string);
	const [lastname, setLastname] = useState(user?.lastname as string);
	const [email, setEmail] = useState(user?.email as string);
	const [previewURL, setPreviewURL] = useState(user?.photoURL);

	const handleUploadImage = (e: any) => {
		const file = e.target.files[0];
		setPreviewURL(URL.createObjectURL(file));
		uploadImage(file);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		const profileDetails: ProfileDetails = {
			email: email,
			firstname: firstname,
			lastname: lastname,
		};
		updateProfile(profileDetails);
	};

	return (
		<div>
			<h1 className="text-3xl font-bold">Profile Details</h1>
			<p className="text-gray mt-2">
				Add your details to add a personal touch to your profile.
			</p>

			<div className="flex flex-col bg-neutral w-full p-6 rounded-xl my-8">
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

						<div className="mx-10">
							<p className="text-gray text-xs font-light">
								Image must be below 1024x1024px. <br />
								Use PNG or JPG format.
							</p>
						</div>
					</div>
				</div>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col bg-neutral w-full p-6 rounded-xl my-8">
					<div className="flex justify-between items-baseline">
						<p className="text-gray">First name*</p>
						<input
							id="firstname"
							type="text"
							placeholder="e.g. Johnny"
							className="input input-bordered w-4/5 mb-4 focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-error"
							required
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
						/>
					</div>
					<div className="flex justify-between items-baseline">
						<p className="text-gray">Last name*</p>
						<input
							id="lastname"
							type="text"
							placeholder="e.g. Appleseed"
							className="input input-bordered w-4/5 mb-4 focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-error"
							required
							value={lastname}
							onChange={(e) => setLastname(e.target.value)}
						/>
					</div>
					<div className="flex justify-between items-baseline">
						<p className="text-gray">Email</p>
						<input
							id="email"
							type="email"
							placeholder="e.g. email@email.com"
							autoComplete="email"
							className="input input-bordered w-4/5 mb-4 focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-error"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
				</div>

				<div className="divider"></div>
				<div className="flex justify-end w-full">
					<button type="submit" className="btn btn-primary">
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default ProfileForm;
