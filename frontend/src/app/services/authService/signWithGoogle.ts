export function signWithGoogle(){
	const apiUrl = import.meta.env.VITE_API_URL;
	window.location.assign(`${apiUrl}/auth/google`);
}
