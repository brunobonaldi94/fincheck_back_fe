import { createContext, useCallback, useState } from "react";
import { localStorageKeys } from "../../../../../app/config/localStorageKeys";

interface DashboardContextValue {
	areValuesVisible: boolean;
	toggleValueVisibility: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardContextProvider({children}: {children: React.ReactNode}) {
	const [areValuesVisible, setAreValuesVisible] = useState(() => {
		const isValuesVisible = localStorage.getItem(localStorageKeys.VISIBLE_VALUES);
		return isValuesVisible ? Boolean(JSON.parse(isValuesVisible)) : true;
	});

	const toggleValueVisibility = useCallback(() => {
		setAreValuesVisible((prevState) => {
			localStorage.setItem(localStorageKeys.VISIBLE_VALUES, String(!prevState));
			return !prevState;
		});

	}, [])
	return (
		<DashboardContext.Provider value={{
			areValuesVisible,
			toggleValueVisibility,
		}}>
			{children}
		</DashboardContext.Provider>
	)
}
