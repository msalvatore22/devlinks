import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

type Props = {
	children?: React.ReactNode;
};

const AuthRoute: React.FC<Props> = ({ children }) => {
	const navigate = useNavigate();

	useEffect(() => {
		const AuthCheck = onAuthStateChanged(auth, (user) => {
			if (user) {
			} else {
				console.log("unauthorized");
				navigate("/getStarted");
			}
		});

		return () => AuthCheck();
	}, [auth]);

	return <>{children}</>;
};

export default AuthRoute;
