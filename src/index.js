export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		if(url.pathname == "/api/get-phigros-db") {
			const SORT_COLUMNS = new Set(["SongName", "ComposerName", "ChapterName", "Bpm", "SongLength"]);

			// ソート対象を取得(デフォルトは追加バージョン)
			const sortBy = url.searchParams.get("sort_by") ?? "AddVersion";
			const sortColumn = SORT_COLUMNS.has(sortBy) ? sortBy : "AddVersion";
			// ソート順を取得(デフォルトは昇順)
			const orderBy = url.searchParams.get("order_by")?.toUpperCase() == "DESC" ? "DESC" : "ASC";
			// 表示件数を取得
			const limit = url.searchParams.get("limit") ?? 9999;

			// 曲名検索単語を取得
			const searchWordSongName = url.searchParams.get("song_name") ?? "";

			// ソート対象が追加バージョンの時
			if(sortColumn == "AddVersion") {
				// .の位置をDot1,Dot2に格納し、それらを使って.と.の間の文字を整数値として扱い並べ替える
				const { results } = await env.phigros_song_db.prepare(`
					WITH Parsed AS (
						SELECT SongName, ComposerName, ChapterName, Bpm, SongLength, AddVersion,
						INSTR(AddVersion, '.') AS Dot1,
						INSTR(AddVersion, '.') + INSTR(SUBSTR(AddVersion, INSTR(AddVersion, '.') + 1), '.') AS Dot2
						FROM Song NATURAL JOIN Composer NATURAL JOIN Chapter NATURAL JOIN Chart
					)
					SELECT SongName, ComposerName, ChapterName, Bpm, SongLength, AddVersion
					FROM Parsed
					WHERE SongName LIKE '%${searchWordSongName}%'
					ORDER BY
					CAST(SUBSTR(AddVersion, 1, Dot1 - 1) AS INTEGER) ${orderBy},
					CAST(SUBSTR(AddVersion, dot1 + 1, dot2 - dot1 - 1) AS INTEGER) ${orderBy},
					CAST(SUBSTR(AddVersion, dot2 + 1) AS INTEGER) ${orderBy}
					LIMIT ${limit};
				`).all();
				return Response.json(results);
			}
			// ソート対象が追加バージョン以外の時
			else {
				const {results} = await env.phigros_song_db.prepare(`
					SELECT SongName, ComposerName, ChapterName, Bpm, SongLength, AddVersion
					FROM Song NATURAL JOIN Composer NATURAL JOIN Chapter NATURAL JOIN Chart
					WHERE SongName LIKE '%${searchWordSongName}%'
					ORDER BY ${sortColumn} ${orderBy}
					LIMIT ${limit};
				`).all();
				return Response.json(results);
			}
		}

		return env.ASSETS.fetch(request);
	},
};
