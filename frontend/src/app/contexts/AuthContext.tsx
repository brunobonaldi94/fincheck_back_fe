import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/usersService";
import { toast } from "react-hot-toast";
import { LaunchScreen } from "../../view/components/LaunchScreen";
import { cookiesKeys } from "../config/cookiesKeys";
import CookieHandler from "../utils/CookieHandler";



export interface User {
	name: string;
	email: string;
	signedIn: boolean;
	role: string;
}

interface AuthContextValue {
	user: User;
	signin: (accessToken: string) => void;
	updateUser: (user: User) => void;
	signout: () => void;
}
export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export function AuthProvider({ children } : { children: React.ReactNode}) {

	const [signedIn, setSignedIn] = useState<boolean>(() => {
		const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
		const storedAccessTokenFromCookie = CookieHandler.getCookieValueByName(cookiesKeys.ACCESS_TOKEN)
		if (storedAccessTokenFromCookie) {
			localStorage.setItem(localStorageKeys.ACCESS_TOKEN, storedAccessTokenFromCookie);
			CookieHandler.expireCookie(cookiesKeys.ACCESS_TOKEN);
			return true;
		}
		return !!storedAccessToken;
	});
	const [user, setUser] = useState<User>({
		name: "",
		email: "",
		signedIn: false,
		role: "",
	});

	const { isError, isFetching, isSuccess, remove, data} = useQuery({
		queryKey: ["users", "me"],
		queryFn: () => userService.me(),
		enabled: signedIn,
		staleTime:Infinity,
	})

	const signin = useCallback((accessToken: string) => {
		localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
		setSignedIn(true);
	}, []);

	const signout = useCallback(() => {
		localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
		remove();
		setSignedIn(false);
		setUser(prevState => ({
			...prevState,
			signedIn: false,
		}))
	}, [remove]);

	useEffect(() => {
		if (isError) {
			toast.error("Your session has expired");
			signout();
		}
	}, [signout, isError])

	useEffect(() => {
		if (data) {
			const user: User = {
				email: data?.email || "",
				name: data?.name || "",
				role: data?.role || "",
				signedIn: isSuccess && signedIn
			}
			setUser(user);
		}
	}, [data, isSuccess, signedIn]);
	const updateUser = useCallback((user: User) => {
		setUser((prevUser) => ({
			...prevUser,
			...user,
		}));
	}, [])
	return (
		<AuthContext.Provider value={{ user, signin,updateUser, signout }}>
			<LaunchScreen
				isLoading={isFetching}
			/>
			{!isFetching && children}
		</AuthContext.Provider>
	)
}
