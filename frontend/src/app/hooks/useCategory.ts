import { useQuery } from "@tanstack/react-query"
import { useQueryKeys } from "../config/useQueryKeys"
import { categoriesService } from "../services/categoriesService"

export function useCategory() {
	const { data, isFetching} = useQuery({
		queryKey: useQueryKeys.categories,
		queryFn: categoriesService.getAll,

	})
	return {
		categories: data ?? [],
		isFetching,
	}
}
