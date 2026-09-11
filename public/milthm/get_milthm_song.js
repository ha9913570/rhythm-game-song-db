document.addEventListener("DOMContentLoaded", pageLoad);

// ページがロードされたときに呼び出される関数
function pageLoad() {
	giveEventForTextbox();

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

	updateSongList(items);
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
