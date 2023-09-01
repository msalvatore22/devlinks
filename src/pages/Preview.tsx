import React from "react";
import { useAuth } from "../hooks/useAuth";
import LinkButton from "../components/LinkButton";
import { ToastContainer } from "react-toastify";
import { showToastErrorMessage, showToastSucessMessage } from "../components/Toast";

const Preview: React.FC = () => {
	const { user } = useAuth();
    const currentURL = window.location.href

	const copyToClipBoard = async () => {
		try {
			await navigator.clipboard.writeText(currentURL);
            showToastSucessMessage("Copied to clipboard!")
		} catch (err) {
			showToastErrorMessage("Failed to copy!");
		}
        
	};
	return (
		<div className="bg-base-100 w-full h-80 rounded-b-3xl relative sm:bg-primary">
            <ToastContainer />
			<div className="p-5">
				<div className="navbar bg-base-100 flex justify-between rounded-xl p-4">
					<a href="/" className="btn btn-outline btn-primary">
						Back to Editor
					</a>
					<button
						onClick={() => copyToClipBoard()}
						className="btn btn-primary"
					>
						Share Link
					</button>
				</div>
			</div>
			{user ? (
				<div className="card w-80 bg-base-100 sm:shadow-xl absolute top-52 m-auto left-0 right-0">
					<figure className="px-10 pt-10">
						<img
							src={user?.photoURL}
							alt="user profile"
							className="rounded-full w-32 h-32 border-solid border-4 border-primary"
						/>
					</figure>
					<div className="card-body items-center text-center">
						<h2 className="card-title">
							{user?.firstname} {user?.lastname}
						</h2>
						<p className="text-gray text-sm mb-6">{user?.email}</p>
						<div>
							{user?.links.map((link, idx) => (
								<LinkButton key={idx} link={link} />
							))}
						</div>
					</div>
				</div>
			) : (
				<span className="loading loading-dots loading-lg text-base-100 absolute m-auto left-0 right-0"></span>
			)}
		</div>
	);
};

export default Preview;
