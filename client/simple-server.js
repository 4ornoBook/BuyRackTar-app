const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('mock-db.json');
const middlewares = jsonServer.defaults();

router.render = (req, res) => {
	setTimeout(() => {
		res.jsonp({
			success: true,
			data: res.locals.data,
		});
	}, 1000);
};

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
	console.log('JSON Server is running');
});
