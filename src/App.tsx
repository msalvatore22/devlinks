import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import AuthRoute from "./components/AuthRoute";
import SignUp from "./pages/SignUp";
import NavBar from "./components/NavBar";
import GetStarted from "./pages/GetStarted";
import { AuthProvider } from "./hooks/useAuth";
import Logout from "./pages/Logout";

export interface IApplicationProps {}

const App: React.FunctionComponent<IApplicationProps> = (props) => {
	return (
		<AuthProvider>
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
					<Route path="/logout" element={<Logout />} />
					<Route path="/signup" element={<SignUp />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
};

export default App;
