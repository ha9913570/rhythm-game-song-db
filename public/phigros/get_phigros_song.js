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
		let thSongName = document.createElement("th");
		let thComposerName = document.createElement("th");
		let thChapterName = document.createElement("th");
		let thDifficulty = document.createElement("th");
		let thBpm = document.createElement("th");
		let thSongLength = document.createElement("th");
		let thAddVersion = document.createElement("th");

		// 要素にclassを付与
		thSongName.setAttribute("class", "song-name-value");
		thComposerName.setAttribute("class", "composer-name-value");
		thChapterName.setAttribute("class", "chapter-name-value");
		thDifficulty.setAttribute("class", "difficulty-value")
		thBpm.setAttribute("class", "bpm-value");
		thSongLength.setAttribute("class", "song-length-value");
		thAddVersion.setAttribute("class", "add-version-value");

		// 値を設定
		thSongName.innerText = items[i].SongName;
		thComposerName.innerText = items[i].ComposerName;
		thChapterName.innerText = items[i].ChapterName;
		const diffEZ = String(items[i].DiffEZ);
		const diffHD = String(items[i].DiffHD);
		const diffIN = String(items[i].DiffIN);
		const diffAT = items[i].DiffAT == null ? "" : String(items[i].DiffAT);
		if (diffAT.length == 0) {
			thDifficulty.innerText = diffEZ + ", " + diffHD + ", " + diffIN;
		} else {
			thDifficulty.innerText = diffEZ + ", " + diffHD + ", " + diffIN + ", " + diffAT;
		}
		thBpm.innerText = items[i].Bpm;
		const songLength = items[i].SongLength;
		const songLengthMinute = Math.floor(parseInt(songLength) / 60);
		let songLengthSecond = parseInt(songLength) % 60;
		// 1桁の場合は0を結合
		if (songLengthSecond < 10) {
			songLengthSecond = "0" + songLengthSecond;
		}
		thSongLength.innerText = songLengthMinute + ":" + songLengthSecond;
		thAddVersion.innerText = items[i].AddVersion;

		tr.appendChild(thSongName);
		tr.appendChild(thComposerName);
		tr.appendChild(thChapterName);
		tr.appendChild(thDifficulty);
		tr.appendChild(thBpm);
		tr.appendChild(thSongLength);
		tr.appendChild(thAddVersion);
		table.appendChild(tr);
	}

	// 表示されているデータの数を表示
	document.getElementById("column-num").innerText = i;
}
