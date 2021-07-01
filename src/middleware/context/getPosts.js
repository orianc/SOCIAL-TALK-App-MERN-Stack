export const getPosts = async () => {
	try {
		const res = await fetch('/api/posts');
		const posts = await res.json();
		return posts;
	} catch (e) {
		console.error('Posts load failed ', e);
	}
};
