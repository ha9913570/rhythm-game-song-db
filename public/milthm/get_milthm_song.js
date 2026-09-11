document.addEventListener("DOMContentLoaded", pageLoad);

// ページがロードされたときに呼び出される関数
function pageLoad() {
	const songNameTextbox = document.getElementById("search-song-name");
	const composerNameTextbox = document.getElementById("search-composer-name");
	const chapterNameTextbox = document.getElementById("search-chapter-name");

	// 検索テキストボックスにイベントを付与
	songNameTextbox.addEventListener("keydown", searchEvent);
	composerNameTextbox.addEventListener("keydown", searchEvent);
	chapterNameTextbox.addEventListener("keydown", searchEvent);

	// データ取得
	getMilthmDataFromDb();
	getLatestVersion();
}

// 検索テキストボックス内でエンターキーを押すと検索されるイベント関数
function searchEvent(event) {
	if (event.key == "Enter") {
		getMilthmDataFromDb();
	}
}

// 追加されているデータの中で最新のバージョンを取得しHTMLの要素を変更する関数
async function getLatestVersion() {
	const apiUrl = "/api/getMilthmDb?sortBy=AddVersion&orderBy=DESC&limit=1";
	const response = await fetch(apiUrl);
	const item = await response.json();

	document.getElementById("latest-version").innerText = item[0].AddVersion;
}

// 検索用テキストボックスの値を消す関数
async function clearSearchParam() {
	document.getElementById("search-song-name").value = "";
	document.getElementById("search-composer-name").value = "";
	document.getElementById("search-chapter-name").value = "";

	await getMilthmDataFromDb();
}

// データベースからデータを取得し、表を作成する関数
async function getMilthmDataFromDb() {
	const apiUrl = getApiUrl("Milthm");

	// apiから曲データを取得
	const response = await fetch(apiUrl);
	const items = await response.json();

	const table = document.getElementById("song-list");

	// テーブルを初期化
	const tableChildren = table.children;
	const tableChildrenLen = tableChildren.length;
	for (let i = 2; i < tableChildrenLen; i++) {
		table.children[2].remove();
	}

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

	document.getElementById("detail-diff-dz").innerText = item.DiffDZ ?? "-";
	document.getElementById("detail-diff-sk").innerText = item.DiffSK ?? "-";
	document.getElementById("detail-diff-cb").innerText = item.DiffCB ?? "-";
	document.getElementById("detail-diff-cl").innerText = item.DiffCL ?? "-";
	document.getElementById("detail-diff-sp").innerText = item.DiffSP ?? "-";

	document.getElementById("detail-note-dz").innerText = item.NoteDZ ?? "-";
	document.getElementById("detail-note-sk").innerText = item.NoteSK ?? "-";
	document.getElementById("detail-note-cb").innerText = item.NoteCB ?? "-";
	document.getElementById("detail-note-cl").innerText = item.NoteCL ?? "-";
	document.getElementById("detail-note-sp").innerText = item.NoteSP ?? "-";

	document.getElementById("detail-add-version").innerText = item.AddVersion;

	document.getElementById("song-detail-modal").style.display = "flex";
}

// 詳細モーダルを閉じる関数
function closeSongDetail() {
	document.getElementById("song-detail-modal").style.display = "none";
}
