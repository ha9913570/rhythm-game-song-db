export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		if(url.pathname == "/api/test-message") {
			return new Response("Hello World!!");
		}

		return env.ASSETS.fetch(request);
	},
};
