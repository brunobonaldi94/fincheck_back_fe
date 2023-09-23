import { useQuery } from "@tanstack/react-query"
import { useQueryKeys } from "../config/useQueryKeys"
import { bankAccountsService } from "../services/backAccountsService"

export function useBankAccount() {
	const { data, isFetching} = useQuery({
		queryKey: useQueryKeys.backAccounts,
		queryFn: bankAccountsService.getAll,

	})
	return {
		accounts: data ?? [],
		isFetching,
	}
}
