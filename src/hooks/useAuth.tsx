import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import {
	query,
	doc,
	getDocs,
	collection,
	where,
	writeBatch,
} from "firebase/firestore";
import { User as FirebaseUser, UserCredential } from "firebase/auth";

// define the shape of the data provided by AuthContext
interface AuthContextType {
	user: FirebaseUser | null;
	signUp: (
		email: string,
		password: string
	) => Promise<UserCredential>;
	signIn: (
		email: string,
		password: string
	) => Promise<UserCredential>;
	signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// custom hook to import into components to unpack the AuthContext
export const useAuth = () => {
	return useContext(AuthContext)!;
};

type Props = {
	children?: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
	const [user, setUser] = useState<FirebaseUser | null>(null);

	useEffect(() => {
		// Set up an observer to monitor authentication state changes
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
		});

		// Clean up the observer on unmount
		return () => unsubscribe();
	}, []);

	const signUp = async (email: string, password: string) => {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const authUser = res.user;

		const q = query(
			collection(db, "users"),
			where("uid", "==", authUser.uid)
		);
		const docs = await getDocs(q);

		if (docs.docs.length === 0) {
			const batch = writeBatch(db);

			batch.set(doc(db, "users", authUser.uid), {
				email: authUser.email,
				photoURL: authUser?.photoURL ?? null,
				links: [],
				firstname: "",
				lastname: "",
			});
			await batch.commit();
		}
        return res
	};

	const signIn = async (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const signOutUser = async (): Promise<void> => {
		return signOut(auth);
	};

	const value: AuthContextType = {
		user,
		signUp,
		signIn,
		signOutUser,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

