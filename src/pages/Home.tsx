import React from "react";
import { auth } from "../firebase/firebase";

export interface HomePageProps {}

const HomePage: React.FunctionComponent<HomePageProps> = (props) => {

	if (auth.currentUser) {
		return (
			<div className="grid grid-cols-40-auto gap-x-6 mt-8">
				<div className="flex justify-center bg-base-100 rounded-xl p-20">
					<img
						className=""
						src="/illustration-phone-mockup.svg"
						alt="phone outline"
					></img>
				</div>
				<div className="bg-base-100 rounded-xl p-20">
					<h1 className="text-3xl font-bold">Customize your links</h1>
					<p className="text-gray mt-2">
						Add/edit/remove links below and then share all your
						profiles with the world!
					</p>
					<button className="btn btn-outline btn-primary w-full mt-10">
						+ Add new link
					</button>

					<div className="flex flex-col justify-center items-center bg-neutral p-10 rounded-xl mt-8">
						<img
							className="w-2/4"
							src="/illustration-empty.svg"
							alt="how to illustration"
						></img>
						<div className="flex flex-col justify-center w-5/6 my-8">
							<h1 className="text-3xl font-bold text-center">
								Let's get you started
							</h1>
							<p className="text-center text-gray mt-8">
								Use the "Add new link" button to get started.
								Once you have more than one link, you can
								reorder and edit them. We're here to help you
								share your profiles with everyone!
							</p>
						</div>
					</div>
					<div className="divider"></div>
					<div className="flex justify-end w-full">
						<button className="btn btn-primary">Save</button>
					</div>
				</div>
			</div>
		);
	} else {
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
	}
};

export default HomePage;
