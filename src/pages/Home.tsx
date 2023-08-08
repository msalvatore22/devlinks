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
const HomePage: React.FunctionComponent<HomePageProps> = ({
	activeBtnToggle,
}) => {
	const { user } = useAuth();
	return (
		<div className="grid grid-cols-40-auto gap-x-6 mt-6">
			{user?.links && user.links.length > 0 ? (
				<>
					<div>
						<PhoneMockUp />
					</div>
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
				<>
					<PhoneMockUp />
					<div className="bg-base-100 rounded-xl p-20">
						<AddLink />
						<HowTo />
						<div className="divider"></div>
					</div>
				</>
			)}
		</div>
	);
};

export default HomePage;
