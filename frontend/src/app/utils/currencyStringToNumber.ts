export function currencyStringToNumber(currencyString: string) {
	const sanitizedCurrencyString = currencyString.replace(/\./g, '').replace(',', '.');
	return Number(sanitizedCurrencyString);
}
