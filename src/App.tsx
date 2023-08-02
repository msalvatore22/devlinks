import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import { initializeApp } from "firebase/app";
import { config } from "./config/config";
import AuthRoute from "./components/AuthRoute";
import SignUp from './pages/SignUp';

initializeApp(config.firebase);

export interface IApplicationProps {}

const App: React.FunctionComponent<IApplicationProps> = (props) => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<AuthRoute>
							<HomePage />
						</AuthRoute>
					}
				/>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App
