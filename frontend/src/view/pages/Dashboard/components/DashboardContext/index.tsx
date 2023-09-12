import { createContext, useCallback, useState } from "react";
import { localStorageKeys } from "../../../../../app/config/localStorageKeys";

interface DashboardContextValue {
	areValuesVisible: boolean;
	toggleValueVisibility: () => void;
	isNewAccountModalOpen: boolean;
	closeNewAccountModal: () => void;
	openNewAccountModal: () => void;
	isNewTransactionModalOpen: boolean;
	closeNewTransactionModal: () => void;
	newTransactionType: 'INCOME' | 'EXPENSE' | null;
	openNewTransactionModal: (type: 'INCOME' | 'EXPENSE') => void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardContextProvider({children}: {children: React.ReactNode}) {
	const [areValuesVisible, setAreValuesVisible] = useState(() => {
		const isValuesVisible = localStorage.getItem(localStorageKeys.VISIBLE_VALUES);
		return isValuesVisible ? Boolean(JSON.parse(isValuesVisible)) : true;
	});
	const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
	const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(true);
	const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null);

	const toggleValueVisibility = useCallback(() => {
		setAreValuesVisible((prevState) => {
			localStorage.setItem(localStorageKeys.VISIBLE_VALUES, String(!prevState));
			return !prevState;
		});

	}, [])
	const openNewAccountModal = useCallback(() => {
		setIsNewAccountModalOpen(true);
	}, []);

	const closeNewAccountModal = useCallback(() => {
		setIsNewAccountModalOpen(false);
	}, []);

	const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
		setNewTransactionType(type);
		setIsNewTransactionModalOpen(true);
	}, []);

	const closeNewTransactionModal = useCallback(() => {
		setNewTransactionType(null);
		setIsNewTransactionModalOpen(false);
	}, []);


	return (
		<DashboardContext.Provider value={{
			areValuesVisible,
			toggleValueVisibility,
			isNewAccountModalOpen,
			closeNewAccountModal,
			openNewAccountModal,
			newTransactionType,
			isNewTransactionModalOpen,
			closeNewTransactionModal,
			openNewTransactionModal
		}}>
			{children}
		</DashboardContext.Provider>
	)
}
