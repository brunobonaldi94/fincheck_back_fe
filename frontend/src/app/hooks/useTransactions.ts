import { useQuery } from "@tanstack/react-query";
import { useQueryKeys } from "../config/useQueryKeys";
import { transactionsService } from "../services/transactionsService";
import { TransactionFilters } from "../entities/Transaction";

export function useTransactions(filters: TransactionFilters) {
	const { data, isFetching, isInitialLoading, refetch} = useQuery({
		queryKey: useQueryKeys.transactions,
		queryFn: () => transactionsService.getAll(filters),
	})
	return {
		transactions: data ?? [],
		isLoading: isFetching,
		isInitialLoading,
		refetchTransactions: refetch,
	}
}
