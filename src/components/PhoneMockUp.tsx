import { useAuth } from "../hooks/useAuth";
import LinkButton from "./LinkButton";

const PhoneMockUp = () => {
	const { user } = useAuth();

	return (
		<div className="flex justify-center bg-base-100 rounded-xl p-20 relative">
			<img
				className="max-h-630p max-w-310p"
				src="/illustration-phone-mockup.svg"
				alt="phone outline"
			></img>
			{user?.photoURL ? (
				<div className="absolute m-20 top-16">
					<img
						className="rounded-full w-24 h-24 border-solid border-4 border-primary"
						src={user.photoURL}
						alt="profile image"
					></img>
				</div>
			) : (
				<></>
			)}
			{user?.firstname ?? user?.lastname ? (
				<div className="absolute m-20 top-44 w-60 text-center bg-base-100 p-1">
					<h3 className="font-semibold tracking-wider">
						{user.firstname} {user.lastname}
					</h3>
				</div>
			) : (
				<></>
			)}
			{user?.email ? (
				<div className="absolute m-20 top-52 w-60 text-center bg-base-100 p-1">
					<p className="font-light text-sm text-gray">{user.email}</p>
				</div>
			) : (
				<></>
			)}
			{user?.links && user.links.length > 0 ? (
				<div className="flex flex-col absolute m-20 h-80 top-1/3 bg-base-100 w-60">
					{user?.links.map((link, idx) => (
						<LinkButton key={idx} link={link} />
					))}
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default PhoneMockUp;
