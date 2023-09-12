export function formatDate(data: Date) {
	return Intl.DateTimeFormat("pt-BR").format(data);
}
