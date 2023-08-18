
class CookieHandler {
		static getCookieValueByName(cookieKey: string) {
		const cookieValue = document.cookie
		.split("; ")
		.find((row) => row.startsWith(`${cookieKey}=`))
		?.split("=")[1];
		return cookieValue;
	}
	static expireCookie(cookieKey: string) {
		document.cookie = `${cookieKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
	}
}

export default CookieHandler;
