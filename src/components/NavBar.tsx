import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../firebase/firebase";

type NavBarProps = {
	activeBtnToggle: boolean;
	setActiveBtnToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavBar = ({ activeBtnToggle, setActiveBtnToggle }: NavBarProps) => {
	const navigate = useNavigate();
	const { signOutUser } = useAuth();
	async function handleSignOut() {
		signOutUser();
		navigate("/getStarted");
	}

	const handleLinksClick = () => {
		setActiveBtnToggle(true);
	};

	const handleProfileClick = () => {
		setActiveBtnToggle(false);
	};

	return (
		<div className="navbar bg-base-100 flex justify-between rounded-xl p-4">
			<img src="/logo-devlinks-large.svg" alt="devlinks logo"></img>
			<div>
				<button
					onClick={handleLinksClick}
					className={
						activeBtnToggle
							? "btn btn-accent text-primary"
							: "btn btn-ghost text-gray mr-2"
					}
				>
					<img src="/icon-links-header.svg" alt="icon for link"></img>
					Links
				</button>
				<button
					onClick={handleProfileClick}
					className={
						!activeBtnToggle
							? "btn btn-accent text-primary"
							: "btn btn-ghost text-gray ml-2"
					}
				>
					<img
						src="/icon-profile-details-header.svg"
						alt="icon for link"
					></img>
					Profile Details
				</button>
			</div>
			<div>
				{auth.currentUser ? (
					<a
						href={`/${auth.currentUser.uid}`}
						className="btn btn-outline btn-primary lg:btn-wide"
					>
						Preview
					</a>
				) : (
					<span className="loading loading-dots loading-lg text-primary"></span>
				)}

				<button className="btn btn-ghost ml-2" onClick={handleSignOut}>
					Logout
				</button>
			</div>
		</div>
	);
};

export default NavBar;
