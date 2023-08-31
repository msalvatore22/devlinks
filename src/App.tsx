import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import AuthRoute from "./components/AuthRoute";
import SignUp from "./pages/SignUp";
import NavBar from "./components/NavBar";
import GetStarted from "./pages/GetStarted";
import { AuthProvider } from "./hooks/useAuth";
import Logout from "./pages/Logout";
import { useState } from "react";
import Preview from "./pages/Preview";

export interface IApplicationProps {}

const App: React.FunctionComponent<IApplicationProps> = () => {
	const [activeBtnToggle, setActiveBtnToggle] = useState(true);

	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<AuthRoute>
								<div className="p-5">
									<NavBar
										activeBtnToggle={activeBtnToggle}
										setActiveBtnToggle={setActiveBtnToggle}
									/>
									<HomePage
										activeBtnToggle={activeBtnToggle}
									/>
								</div>
							</AuthRoute>
						}
					/>
					<Route path="/getStarted" element={<GetStarted />} />
					<Route path="/:id" element={<Preview />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/logout" element={<Logout />} />
					<Route path="/signup" element={<SignUp />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
};

export default App;
