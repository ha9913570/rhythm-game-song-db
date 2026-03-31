export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		if(url.pathname == "/api/test-message") {
			return new Response("Hello World!!");
		}
		else if(url.pathname == "/api/get-song-db") {
			// .の位置をDot1,Dot2に格納し、それらを使って.と.の間の文字を整数値として扱い並べ替える
			const { results } = await env.phigros_song_db.prepare(`
				WITH Parsed AS (
					SELECT *,
					INSTR(AddVersion, '.') AS Dot1,
					INSTR(AddVersion, '.') + INSTR(SUBSTR(AddVersion, INSTR(AddVersion, '.') + 1), '.') AS Dot2
					FROM Song NATURAL JOIN Composer NATURAL JOIN Chapter NATURAL JOIN Chart
				)
				SELECT *
				FROM Parsed
				ORDER BY
				CAST(SUBSTR(AddVersion, 1, Dot1 - 1) AS INTEGER) ASC,
				CAST(SUBSTR(AddVersion, dot1 + 1, dot2 - dot1 - 1) AS INTEGER) ASC,
				CAST(SUBSTR(AddVersion, dot2 + 1) AS INTEGER) ASC;
			`)
			.all();
			return Response.json(results);
		}

		return env.ASSETS.fetch(request);
	},
};
