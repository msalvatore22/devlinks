import React from "react";

const ProfileForm = () => {
	return (
		<div>
			<h1 className="text-3xl font-bold">Profile Details</h1>
			<p className="text-gray mt-2">
				Add your details to add a personal touch to your profile.
			</p>
			<form>
				<div className="flex flex-col bg-neutral w-full p-6 rounded-xl my-8">
					<div className="flex items-center justify-between w-full">
						<div>
							<p className="text-gray">Profile picture</p>
						</div>
						<div className="flex items-center justify-between">
							<input
								type="file"
								className="file-input file-input-bordered file-input-primary max-w-xs"
							/>
							<div className="mx-10">
								<p className="text-gray text-xs font-light">
									Image must be below 1024x1024px. <br />
									Use PNG or JPG format.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col bg-neutral w-full p-6 rounded-xl my-8">
					<div className="flex justify-between items-baseline">
						<p className="text-gray">First name*</p>
						<input
							id="firstname"
							type="text"
							placeholder="e.g. Johnny"
							className="input input-bordered w-4/5 mb-4 focus:border-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-error"
							required
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
