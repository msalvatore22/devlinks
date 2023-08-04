import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
	const { signOutUser } = useAuth();
    const navigate = useNavigate()
    const handleSignOut = () => {
        signOutUser()
        navigate("/getStarted")
    }

	return (
		<div>
			<button className="btn btn-ghost" onClick={handleSignOut}>
				Logout
			</button>
		</div>
	);
};

export default Logout;
