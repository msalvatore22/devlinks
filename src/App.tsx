import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import { initializeApp } from "firebase/app";
import { config } from "./firebase/config";
import AuthRoute from "./components/AuthRoute";
import SignUp from "./pages/SignUp";
import NavBar from "./components/NavBar";
import GetStarted from "./pages/GetStarted";

initializeApp(config.firebase);

export interface IApplicationProps {}

const App: React.FunctionComponent<IApplicationProps> = (props) => {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route
					path="/"
					element={
						<AuthRoute>
							<HomePage />
						</AuthRoute>
					}
				/>
				<Route path="/getStarted" element={<GetStarted />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
