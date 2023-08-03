import React from "react";

export interface GetStartedProps {}

const GetStarted: React.FunctionComponent<GetStartedProps> = (props) => {
	return (
		<div className="flex flex-col justify-center items-center w-screen h-screen bg-neutral">
			<a
				className="absolute top-6 right-8 btn btn-outline btn-primary"
				href="/login"
			>
				Login
			</a>
			<div className="flex flex-col justify-center items-center">
				<h1 className="text-4xl font-bold">Welcome to </h1>
				<img
					className="w-96 my-10"
					src="/logo-devlinks-large.svg"
					alt="devlinks logo"
				></img>
				<p className="text-primary text-lg mb-6">
					Customize and share your links to the world!
				</p>
				<a href="/signUp" className="btn btn-primary">
					Get started
				</a>
			</div>
		</div>
	);
};

export default GetStarted;
