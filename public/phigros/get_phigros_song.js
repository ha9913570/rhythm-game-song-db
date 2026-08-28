// 追加されているデータの中で最新のバージョンを取得しHTMLの要素を変更する関数
async function getLatestVersion() {
	const apiUrl = "/api/getPhigrosDb?sortBy=AddVersion&orderBy=DESC&limit=1";
	const response = await fetch(apiUrl);
	const item = await response.json();

	document.getElementById("latest-version").innerText = item[0].AddVersion;
}

// 検索用テキストボックスの値を消す関数
async function clearSearchParam() {
	document.getElementById("search-song-name").value = "";
	document.getElementById("search-composer-name").value = "";
	document.getElementById("search-chapter-name").value = "";

	await getPhigrosDataFromDb();
}

// データベースからデータを取得し、表を作成する関数
async function getPhigrosDataFromDb() {
	const sortType = document.getElementById("sort-type").value;
	const orderBy = document.getElementById("order-by").value;

	const searchWordSongName = document.getElementById("search-song-name").value;
	const searchWordComposerName = document.getElementById("search-composer-name").value;
	const searchWordChapterName = document.getElementById("search-chapter-name").value;

	let apiUrl = "/api/getPhigrosDb";

	// ソート対象をurlクエリに追加
	switch (sortType) {
		case "song-name":
			apiUrl += "?sortBy=SongName";
			break;
		case "composer-name":
			apiUrl += "?sortBy=ComposerName";
			break;
		case "chapter-name":
			apiUrl += "?sortBy=ChapterName";
			break;
		case "bpm":
			apiUrl += "?sortBy=Bpm";
			break;
		case "song-length":
			apiUrl += "?sortBy=SongLength";
			break;
		case "add-version":
			apiUrl += "?sortBy=AddVersion";
			break;
	}

	// ソート順をurlクエリに追加
	if (orderBy == "desc") {
		apiUrl += "&orderBy=DESC";
	} else {
		apiUrl += "&orderBy=ASC";
	}

	// 検索文字をurlクエリに追加
	if (searchWordSongName.length != 0) {
		apiUrl += "&songName=";
		apiUrl += searchWordSongName;
	}
	if (searchWordComposerName.length != 0) {
		apiUrl += "&composerName=";
		apiUrl += searchWordComposerName;
	}
	if (searchWordChapterName.length != 0) {
		apiUrl += "&chapterName=";
		apiUrl += searchWordChapterName;
	}

	// apiから曲データを取得
	const response = await fetch(apiUrl);
	const items = await response.json();

	const table = document.getElementById("song-list");
	// テーブルを初期化
	table.innerText = "";

	// 表見出しを追加
	const trTop = document.createElement("tr");
	const thSongNameTop = document.createElement("th")
	const thComposerNameTop = document.createElement("th");
	const thChapterNameTop = document.createElement("th");
	const thDifficultyTop = document.createElement("th");
	const thBpmTop = document.createElement("th");
	const thSongLengthTop = document.createElement("th");
	const thAddVersionTop = document.createElement("th");

	thSongNameTop.innerText = "曲名";
	thComposerNameTop.innerText = "作曲者名";
	thChapterNameTop.innerText = "チャプター名";
	thDifficultyTop.innerText = "難易度(EZ,HD,IN,AT)";
	thBpmTop.innerText = "BPM";
	thSongLengthTop.innerText = "長さ";
	thAddVersionTop.innerText = "追加バージョン";

	trTop.setAttribute("class", "table-header");

	trTop.appendChild(thSongNameTop);
	trTop.appendChild(thComposerNameTop);
	trTop.appendChild(thChapterNameTop);
	trTop.appendChild(thDifficultyTop);
	trTop.appendChild(thBpmTop);
	trTop.appendChild(thSongLengthTop);
	trTop.appendChild(thAddVersionTop);

	table.appendChild(trTop);

	// 曲データを表に追加
	let i;
	for (i = 0; i < items.length; i++) {
		let tr = document.createElement("tr");
		tr.setAttribute("align", "left");

		// 要素の作成
		let tdSongName = document.createElement("td");
		let tdComposerName = document.createElement("td");
		let tdChapterName = document.createElement("td");
		let tdDifficulty = document.createElement("td");
		let tdBpm = document.createElement("td");
		let tdSongLength = document.createElement("td");
		let tdAddVersion = document.createElement("td");

		// 要素にclassを付与
		tdSongName.setAttribute("class", "song-name-value");
		tdComposerName.setAttribute("class", "composer-name-value");
		tdChapterName.setAttribute("class", "chapter-name-value");
		tdDifficulty.setAttribute("class", "difficulty-value")
		tdBpm.setAttribute("class", "bpm-value");
		tdSongLength.setAttribute("class", "song-length-value");
		tdAddVersion.setAttribute("class", "add-version-value");

		// 値を設定
		tdSongName.innerText = items[i].SongName;
		tdComposerName.innerText = items[i].ComposerName;
		tdChapterName.innerText = items[i].ChapterName;
		const diffEZ = String(items[i].DiffEZ);
		const diffHD = String(items[i].DiffHD);
		const diffIN = String(items[i].DiffIN);
		const diffAT = items[i].DiffAT == null ? "" : String(items[i].DiffAT);
		if (diffAT.length == 0) {
			tdDifficulty.innerText = diffEZ + ", " + diffHD + ", " + diffIN;
		} else {
			tdDifficulty.innerText = diffEZ + ", " + diffHD + ", " + diffIN + ", " + diffAT;
		}
		tdBpm.innerText = items[i].Bpm;
		const songLength = items[i].SongLength;
		const songLengthMinute = Math.floor(parseInt(songLength) / 60);
		let songLengthSecond = parseInt(songLength) % 60;
		// 1桁の場合は0を結合
		if (songLengthSecond < 10) {
			songLengthSecond = "0" + songLengthSecond;
		}
		tdSongLength.innerText = songLengthMinute + ":" + songLengthSecond;
		tdAddVersion.innerText = items[i].AddVersion;

		tr.appendChild(tdSongName);
		tr.appendChild(tdComposerName);
		tr.appendChild(tdChapterName);
		tr.appendChild(tdDifficulty);
		tr.appendChild(tdBpm);
		tr.appendChild(tdSongLength);
		tr.appendChild(tdAddVersion);
		table.appendChild(tr);
	}

	// 表示されているデータの数を表示
	document.getElementById("column-num").innerText = i;
}
