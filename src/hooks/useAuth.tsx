import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, storage } from "../firebase/firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import {
	doc,
	setDoc,
	onSnapshot,
	updateDoc,
	arrayUnion,
	arrayRemove,
} from "firebase/firestore";
import { User as FirebaseUser, UserCredential } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export interface Link {
	url: string;
	platform: string;
	iconPath: string;
	id: string;
}

interface User {
	uid: string;
	email: string;
	firstname: string;
	lastname: string;
	photoURL: string;
	links: Link[];
}

export type ProfileDetails = Pick<User, "email" | "firstname" | "lastname">;

// define the shape of the data provided by AuthContext
interface AuthContextType {
	user: User | null;
	signUp: (email: string, password: string) => Promise<UserCredential>;
	signIn: (email: string, password: string) => Promise<UserCredential>;
	signOutUser: () => Promise<void>;
	addLink: (link: Link) => Promise<void>;
	deleteLink: (link: Link) => Promise<void>;
	updateLinks: (links: Link[]) => Promise<void>;
	uploadImage: (imageFile: any) => Promise<void>;
	updateProfile: (profileDetails: ProfileDetails) => Promise<void>;
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
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
			if (firebaseUser) {
				// If user is authenticated, fetch the User data from Firestore
				const unsubscribeUser = onSnapshot(
					doc(db, "users", firebaseUser.uid),
					(doc) => {
						const userData = doc.data() as User | undefined;
						setUser(userData || null);
					}
				);

				return () => unsubscribeUser(); // Cleanup the listener when user unmounts
			} else {
				setUser(null); // If user is not authenticated, set user to null
			}
		});

		return () => {
			unsubscribeAuth();
		};
	}, []);

	const signUp = async (email: string, password: string) => {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const authUser = res.user;

		await setDoc(doc(db, "users", authUser.uid), {
			email: authUser.email,
			photoURL: authUser?.photoURL ?? null,
			links: [],
			firstname: "",
			lastname: "",
		});

		return res;
	};

	const signIn = async (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const signOutUser = async (): Promise<void> => {
		return signOut(auth);
	};

	const addLink = async (link: Link): Promise<void> => {
		if (!auth.currentUser) {
			throw new Error("User not authenticated.");
		} else {
			try {
				const userRef = doc(db, "users", auth.currentUser.uid);
				await updateDoc(userRef, {
					links: arrayUnion(link),
				});
			} catch (error) {
				throw new Error("Failed to add link");
			}
		}
	};

	const deleteLink = async (link: Link): Promise<void> => {
		if (!auth.currentUser) {
			throw new Error("User not authenticated.");
		} else {
			try {
				const userRef = doc(db, "users", auth.currentUser.uid);
				await updateDoc(userRef, {
					links: arrayRemove(link),
				});
			} catch (error) {
				throw new Error("Failed to add Link.");
			}
		}
	};

	const updateLinks = async (links: Link[]): Promise<void> => {
		if (!auth.currentUser) {
			throw new Error("User not authenticated.");
		} else {
			try {
				const userRef = doc(db, "users", auth.currentUser.uid);
				await updateDoc(userRef, {
					links: links,
				});
			} catch (error) {
				throw new Error("Failed to add Link.");
			}
		}
	};

	const uploadImage = async (imageFile: any): Promise<void> => {
		if (!auth.currentUser) {
			throw new Error("User not authenticated.");
		} else {
			try {
				const storageRef = ref(
					storage,
					`users/${auth.currentUser.uid}/profile.png`
				);
				const result = await uploadBytes(storageRef, imageFile);
				const url = await getDownloadURL(result.ref);

				await updateDoc(doc(db, "users", auth.currentUser.uid), {
					photoURL: url,
				});
			} catch (error) {
				throw new Error("Failed to add Image.");
			}
		}
	};

	const updateProfile = async (
		profileDetails: ProfileDetails
	): Promise<void> => {
		if (!auth.currentUser) {
			throw new Error("User not authenticated.");
		} else {
			try {

				const userRef = doc(db, "users", auth.currentUser.uid);
				await updateDoc(userRef, {
					email: profileDetails.email,
					firstname: profileDetails.firstname,
					lastname: profileDetails.lastname,
				});
			} catch (error) {
				throw new Error("Failed to add Link.");
			}
		}
	};

	const value: AuthContextType = {
		user,
		signUp,
		signIn,
		signOutUser,
		addLink,
		deleteLink,
		updateLinks,
		uploadImage,
		updateProfile,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
