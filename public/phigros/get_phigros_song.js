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

// テキストボックスの値などに応じてAPIのURLを取得する関数
function getApiUrl() {
	let apiUrl = "/api/getPhigrosDb";

	const sortType = document.getElementById("sort-type").value;
	const orderBy = document.getElementById("order-by").value;
	const searchWordSongName = document.getElementById("search-song-name").value;
	const searchWordComposerName = document.getElementById("search-composer-name").value;
	const searchWordChapterName = document.getElementById("search-chapter-name").value;

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

	return apiUrl;
}

// データベースからデータを取得し、表を作成する関数
async function getPhigrosDataFromDb() {
	const apiUrl = getApiUrl();

	// apiから曲データを取得
	const response = await fetch(apiUrl);
	const items = await response.json();

	const table = document.getElementById("song-list");
	// テーブルを初期化
	table.innerText = "";

	// 表見出しを追加
	const trTop = document.createElement("tr");
	const thSongNameTop = document.createElement("th");
	const thComposerNameTop = document.createElement("th");
	const thChapterNameTop = document.createElement("th");
	const thAddVersionTop = document.createElement("th");

	thSongNameTop.innerText = "曲名";
	thComposerNameTop.innerText = "作曲者名";
	thChapterNameTop.innerText = "チャプター名";
	thAddVersionTop.innerText = "追加バージョン";

	trTop.setAttribute("class", "table-header");

	trTop.appendChild(thSongNameTop);
	trTop.appendChild(thComposerNameTop);
	trTop.appendChild(thChapterNameTop);
	trTop.appendChild(thAddVersionTop);

	table.appendChild(trTop);

	// 曲データを表に追加
	let i;
	for (i = 0; i < items.length; i++) {
		let tr = document.createElement("tr");
		tr.setAttribute("align", "left");
		tr.style.cursor = "pointer";

		let tdSongName = document.createElement("td");
		let tdComposerName = document.createElement("td");
		let tdChapterName = document.createElement("td");
		let tdAddVersion = document.createElement("td");

		tdSongName.setAttribute("class", "song-name-value");
		tdComposerName.setAttribute("class", "composer-name-value");
		tdChapterName.setAttribute("class", "chapter-name-value");
		tdAddVersion.setAttribute("class", "add-version-value");

		tdSongName.innerText = items[i].SongName;
		tdComposerName.innerText = items[i].ComposerName;
		tdChapterName.innerText = items[i].ChapterName;
		tdAddVersion.innerText = items[i].AddVersion;

		tr.appendChild(tdSongName);
		tr.appendChild(tdComposerName);
		tr.appendChild(tdChapterName);
		tr.appendChild(tdAddVersion);

		// 行クリックで詳細モーダルを表示
		const currentItem = items[i];
		tr.addEventListener("click", () => showSongDetail(currentItem));

		table.appendChild(tr);
	}

	// 表示されているデータの数を表示
	document.getElementById("column-num").innerText = i;
}

// 行クリック時に詳細モーダルを表示する関数
function showSongDetail(item) {
	document.getElementById("detail-song-name").innerText = item.SongName;
	document.getElementById("detail-composer-name").innerText = item.ComposerName;
	document.getElementById("detail-chapter-name").innerText = item.ChapterName;

	if (item.Bpm == 0) {
		document.getElementById("detail-bpm").innerText = "-";
	} else {
		document.getElementById("detail-bpm").innerText = item.Bpm;
	}

	const songLengthMinute = Math.floor(parseInt(item.SongLength) / 60);
	let songLengthSecond = parseInt(item.SongLength) % 60;
	if (songLengthSecond < 10) {
		songLengthSecond = "0" + songLengthSecond;
	}
	document.getElementById("detail-song-length").innerText = songLengthMinute + ":" + songLengthSecond;

	document.getElementById("detail-diff-ez").innerText = item.DiffEZ ?? "-";
	document.getElementById("detail-diff-hd").innerText = item.DiffHD ?? "-";
	document.getElementById("detail-diff-in").innerText = item.DiffIN ?? "-";
	document.getElementById("detail-diff-at").innerText = item.DiffAT ?? "-";

	document.getElementById("detail-note-ez").innerText = item.NoteEZ ?? "-";
	document.getElementById("detail-note-hd").innerText = item.NoteHD ?? "-";
	document.getElementById("detail-note-in").innerText = item.NoteIN ?? "-";
	document.getElementById("detail-note-at").innerText = item.NoteAT ?? "-";

	document.getElementById("detail-add-version").innerText = item.AddVersion;

	document.getElementById("song-detail-modal").style.display = "flex";
}

// 詳細モーダルを閉じる関数
function closeSongDetail() {
	document.getElementById("song-detail-modal").style.display = "none";
}
