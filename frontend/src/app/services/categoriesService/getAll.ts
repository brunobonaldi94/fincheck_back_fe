import httpClient from "../HttpClient";
import { Category } from "../../entities/Category";


type CategoryResponse = Array<Category>

export async function getAll() {
	const { data } = await httpClient.get<CategoryResponse>("/categories");

	return data;
}
