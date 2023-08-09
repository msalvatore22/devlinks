import React from "react";

const HowTo: React.FC = () => {
	return (
		<div className="flex flex-col justify-center items-center bg-neutral p-10 rounded-xl mt-8">
			<img
				className="max-h-40"
				src="/illustration-empty.svg"
				alt="how to illustration"
			></img>
			<div className="flex flex-col justify-center w-5/6 my-8">
				<h1 className="text-3xl font-bold text-center">
					Let's get you started
				</h1>
				<p className="text-center text-gray mt-8">
					Use the "Add new link" button to get started. Once you have
					more than one link, you can reorder and edit them. We're
					here to help you share your profiles with everyone!
				</p>
			</div>
		</div>
	);
};

export default HowTo;
