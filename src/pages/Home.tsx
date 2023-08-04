import React from "react";
import { useAuth } from "../hooks/useAuth";
import PhoneMockUp from "../components/PhoneMockUp";
import HowTo from "../components/HowTo";
import AddLink from "../components/AddLink";
import DevLinkDynamicForm from "../components/DevLinkDynamicForm";

export interface HomePageProps {}

const HomePage: React.FunctionComponent<HomePageProps> = (props) => {
	const { user } = useAuth()
		return (
			<div className="grid grid-cols-40-auto gap-x-6 mt-6">
				{user?.links && user.links.length > 0 ? (
					<>
						<div>
							<PhoneMockUp />
						</div>

						<div className="bg-base-100 rounded-xl p-20">
							<AddLink />
							<DevLinkDynamicForm />
						</div>
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
	} 


export default HomePage;
