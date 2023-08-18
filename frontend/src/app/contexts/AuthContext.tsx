import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/usersService";
import { toast } from "react-hot-toast";
import { LaunchScreen } from "../../view/components/LaunchScreen";
import { cookiesKeys } from "../config/cookiesKeys";
import CookieHandler from "../utils/CookieHandler";

interface AuthContextValue {
	signedIn: boolean;
	signin: (accessToken: string) => void;
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

	const { isError, isFetching, isSuccess, remove} = useQuery({
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
	}, [remove]);

	useEffect(() => {
		if (isError) {
			toast.error("Your session has expired");
			signout();
		}
	}, [signout, isError])

	return (
		<AuthContext.Provider value={{ signedIn: isSuccess && signedIn, signin, signout }}>
			<LaunchScreen
				isLoading={isFetching}
			/>
			{!isFetching && children}
		</AuthContext.Provider>
	)
}
