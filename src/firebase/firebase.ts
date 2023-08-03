import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { config } from "./config";

export const app = initializeApp(config.firebase);
export const db = getFirestore();
export const auth = getAuth(app);
export const storage = getStorage();
