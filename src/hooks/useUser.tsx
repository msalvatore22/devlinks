import {
	useReducer,
	useCallback,
	createContext,
	useContext,
	PropsWithChildren,
} from "react";


interface Link {
    link: string
    platform: string
}

interface User {
    email: string
    firstname: string
    lastname: string
    photoURL: string
    links: Link[]
}


