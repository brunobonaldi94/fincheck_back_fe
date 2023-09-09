import axios from "axios";
import { localStorageKeys } from "../config/localStorageKeys";
import { sleep } from "../utils/sleep";

const httpClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
})


httpClient.interceptors.request.use((config) => {
	const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
	if (accessToken) {
		config.headers["Authorization"] = `Bearer ${accessToken}`;
	}
	return config;
});

httpClient.interceptors.response.use(async (response) => {
	await sleep(500);
	return response;
})

export default httpClient;
