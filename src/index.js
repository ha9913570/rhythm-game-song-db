export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		if(url.pathname == "/api/test-message") {
			return new Response("Hello World!!");
		}
		else if(url.pathname == "/api/get-song-db") {
			const { results } = await env.phigros_song_db.prepare(
			"SELECT * FROM Song"
			)
				.all();
			return Response.json(results);
		}

		return env.ASSETS.fetch(request);
	},
};
