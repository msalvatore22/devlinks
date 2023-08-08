import { useAuth } from "../hooks/useAuth";
import LinkButton from "./LinkButton";

const PhoneMockUp = () => {
	const { user } = useAuth();
	return (
		<div className="flex justify-center bg-base-100 rounded-xl p-20 relative">
			<img
				className="object-contain max-h-630p max-w-310p"
				src="/illustration-phone-mockup.svg"
				alt="phone outline"
			></img>
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
