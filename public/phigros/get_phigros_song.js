document.addEventListener("DOMContentLoaded", pageLoad);

// ページがロードされたときに呼び出される関数
function pageLoad() {
	giveEventForTextbox();

	// データ取得
	getPhigrosDataFromDb();
	getLatestVersion();
}

// 検索テキストボックス内でエンターキーを押すと検索されるイベント関数
function searchEvent(event) {
	if (event.key == "Enter") {
		getPhigrosDataFromDb();
	}
}

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
	const apiUrl = getApiUrl("Phigros");

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