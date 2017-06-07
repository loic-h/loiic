export default {
	key: '404',
	alias: [],
	out(data) {
		return `
${data.key}: command not found
		`;
	}
};
