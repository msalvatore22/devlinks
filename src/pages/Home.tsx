import React from "react";
import { useAuth } from "../hooks/useAuth";
import PhoneMockUp from "../components/PhoneMockUp";
import DevLinkDynamicForm from "../components/DevLinkDynamicForm";
import ProfileForm from "../components/ProfileForm";

type HomePageProps = {
	activeBtnToggle: boolean;
};
const HomePage: React.FC<HomePageProps> = ({ activeBtnToggle }) => {
	const { user } = useAuth();
	return (
		<div className="grid lg:grid-cols-40-auto grid-cols-none gap-x-6 mt-6">
			<div>
				<PhoneMockUp />
			</div>
			{user ? (
				<>
					{activeBtnToggle ? (
						<div className="bg-base-100 rounded-xl p-10">
							<DevLinkDynamicForm />
						</div>
					) : (
						<div className="bg-base-100 rounded-xl p-10">
							<ProfileForm />
						</div>
					)}
				</>
			) : (
				<div className="flex h-full w-full justify-center items-center">
					<span className="loading loading-dots loading-lg text-primary"></span>
				</div>
			)}
		</div>
	);
};

export default HomePage;
