import { Category } from "../../entities/Category";
import httpClient from "../HttpClient";


export interface UpdateCategoryParams extends Category {}
export async function update({
	id,
	...params
}: UpdateCategoryParams) {
	const { data } = await httpClient.put<Category>(`/categories/${id}`, params);

	return data;
}
