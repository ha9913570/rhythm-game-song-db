export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		// 曲名でソート
		if(url.pathname == "/api/get-song-db/song-name-sort") {
			const {results} = await env.phigros_song_db.prepare(`
				SELECT *
				FROM Song NATURAL JOIN Composer NATURAL JOIN Chapter NATURAL JOIN Chart
				ORDER BY SongName;
			`)
			.all();
			return Response.json(results);
		}

		// 作曲者名でソート
		else if(url.pathname == "/api/get-song-db/composer-name-sort") {
			const {results} = await env.phigros_song_db.prepare(`
				SELECT *
				FROM Song NATURAL JOIN Composer NATURAL JOIN Chapter NATURAL JOIN Chart
				ORDER BY ComposerName;
			`)
			.all();
			return Response.json(results);
		}

		// チャプター名でソート
		else if(url.pathname == "/api/get-song-db/chapter-name-sort") {
			const {results} = await env.phigros_song_db.prepare(`
				SELECT *
				FROM Song NATURAL JOIN Composer NATURAL JOIN Chapter NATURAL JOIN Chart
				ORDER BY ChapterName;
			`)
			.all();
			return Response.json(results);
		}

		// BPMでソート
		else if(url.pathname == "/api/get-song-db/bpm-sort") {
			const {results} = await env.phigros_song_db.prepare(`
				SELECT *
				FROM Song NATURAL JOIN Composer NATURAL JOIN Chapter NATURAL JOIN Chart
				ORDER BY Bpm;
			`)
			.all();
			return Response.json(results);
		}

		// 曲の長さでソート
		else if(url.pathname == "/api/get-song-db/song-length-sort") {
			const {results} = await env.phigros_song_db.prepare(`
				SELECT *
				FROM Song NATURAL JOIN Composer NATURAL JOIN Chapter NATURAL JOIN Chart
				ORDER BY SongLength;
			`)
			.all();
			return Response.json(results);
		}

		// 追加バージョンでソート
		else if(url.pathname == "/api/get-song-db/add-version-sort") {
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
