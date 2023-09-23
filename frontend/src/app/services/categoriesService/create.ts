import { Category } from "../../entities/Category";
import httpClient from "../HttpClient";


export interface CreateCategoryParams extends Omit<Category, "id"> {}

export async function create(params: CreateCategoryParams) {
	const { data } = await httpClient.post("/categories", params);

	return data;
}
