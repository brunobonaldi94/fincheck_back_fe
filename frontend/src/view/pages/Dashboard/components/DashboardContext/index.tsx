import { createContext, useCallback, useState } from "react";
import { localStorageKeys } from "../../../../../app/config/localStorageKeys";
import { BankAccount } from "../../../../../app/entities/BankAccount";
import { Transaction } from "../../../../../app/entities/Transaction";

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
	isEditAccountModalOpen: boolean;
	accountBeingEdited: BankAccount | null;
	openEditAccountModal: (bankAccount: BankAccount) => void;
	closeEditAccountModal: () => void;
	isEditTransactionModalOpen: boolean;
	transactionBeingEdited: Transaction | null;
	closeEditTransactionModal: () => void;
	openEditTransactionModal: (transaction: Transaction) => void;
	resetTransactionBeingEdited: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardContextProvider({children}: {children: React.ReactNode}) {
	const [areValuesVisible, setAreValuesVisible] = useState(() => {
		const isValuesVisible = localStorage.getItem(localStorageKeys.VISIBLE_VALUES);
		return isValuesVisible ? Boolean(JSON.parse(isValuesVisible)) : true;
	});
	const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
	const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
	const [accountBeingEdited, setAccountBeingEdited] = useState<BankAccount | null>(null);
	const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
	const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null);
	const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState<boolean>(false);
	const [transactionBeingEdited, setTransactionBeingEdited] = useState<Transaction | null>(null);

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


	const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
		setAccountBeingEdited((prevState) => ({
			...prevState,
			...bankAccount
		}))
		setIsEditAccountModalOpen(true);
	}, []);

	const closeEditAccountModal = useCallback(() => {
		setAccountBeingEdited(null);
		setIsEditAccountModalOpen(false);
	}, []);

	const resetTransactionBeingEdited = useCallback(() => {
		setTransactionBeingEdited(null);
	}, []);

	const openEditTransactionModal = useCallback((transaction: Transaction) => {
		setTransactionBeingEdited((prevState) => ({
			...prevState,
			...transaction
		}))
		setIsEditTransactionModalOpen(true);
	}, []);

	const closeEditTransactionModal = useCallback(() => {
		setTransactionBeingEdited(null);
		setIsEditTransactionModalOpen(false);
	}, [])

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
			openNewTransactionModal,
			openEditAccountModal,
			closeEditAccountModal,
			isEditAccountModalOpen,
			accountBeingEdited,
			isEditTransactionModalOpen,
			transactionBeingEdited,
			closeEditTransactionModal,
			openEditTransactionModal,
			resetTransactionBeingEdited,
		}}>
			{children}
		</DashboardContext.Provider>
	)
}
