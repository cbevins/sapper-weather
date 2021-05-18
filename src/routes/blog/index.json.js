import posts from './_posts.js';

const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		slug: post.slug
	};
}));

export function get(req, res) {
  console.log('server: BEGIN blog/index.json.js')
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
  console.log('server: END blog/index.json.js')
	res.end(contents);
}