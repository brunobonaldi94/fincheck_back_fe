export function atLeastOneDefined(obj: Record<string | number | symbol, unknown>, allowEmptyString = false) {
	const hasAnyValue = Object.values(obj).some((value) => {
		if (allowEmptyString) {
			return value !== undefined;
		}
		return value !== undefined && value !== "";
	});
	return hasAnyValue;
}
