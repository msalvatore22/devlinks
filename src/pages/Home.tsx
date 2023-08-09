import React from "react";
import { useAuth } from "../hooks/useAuth";
import PhoneMockUp from "../components/PhoneMockUp";
import HowTo from "../components/HowTo";
import AddLink from "../components/AddLink";
import DevLinkDynamicForm from "../components/DevLinkDynamicForm";
import ProfileForm from "../components/ProfileForm";

type HomePageProps = {
	activeBtnToggle: boolean;
};
const HomePage: React.FC<HomePageProps> = ({ activeBtnToggle }) => {
	const { user } = useAuth();
	return (
		<div className="grid grid-cols-40-auto gap-x-6 mt-6">
			<div>
				<PhoneMockUp />
			</div>
			{user ? (
				<>
					{user?.links && user.links.length > 0 ? (
						<>
							{activeBtnToggle ? (
								<div className="bg-base-100 rounded-xl p-10">
									<AddLink />
									<DevLinkDynamicForm />
								</div>
							) : (
								<div className="bg-base-100 rounded-xl p-10">
									<ProfileForm />
								</div>
							)}
						</>
					) : (
						<div className="bg-base-100 rounded-xl p-10">
							<AddLink />
							<HowTo />
							<div className="divider"></div>
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
