async function getDataFromDb() {
	// apiから曲データを取得
	const response = await fetch("/api/get-song-db");
	const items = await response.json();

	const table = document.getElementById("song_list");

	// 表見出しを追加
	const trTop = document.createElement("tr");
	const thSongNameTop = document.createElement("th")
	const thComposerNameTop = document.createElement("th");
	const thChapterNameTop = document.createElement("th");
	const thBpmTop = document.createElement("th");
	const thSongLengthTop = document.createElement("th");
	const thAddVersionTop = document.createElement("th");

	thSongNameTop.innerText = "曲名";
	thComposerNameTop.innerText = "作曲者名";
	thChapterNameTop.innerText = "チャプター名";
	thBpmTop.innerText = "BPM";
	thSongLengthTop.innerText = "長さ";
	thAddVersionTop.innerText = "追加バージョン";

	trTop.appendChild(thSongNameTop);
	trTop.appendChild(thComposerNameTop);
	trTop.appendChild(thChapterNameTop);
	trTop.appendChild(thBpmTop);
	trTop.appendChild(thSongLengthTop);
	trTop.appendChild(thAddVersionTop);

	table.appendChild(trTop);

	// 曲データを表に追加
	for(let i = 0; i < items.length; i++){
		let tr = document.createElement("tr");
		tr.setAttribute("align", "left");

		let thSongName = document.createElement("th");
		let thComposerName = document.createElement("th");
		let thChapterName = document.createElement("th");
		let thBpm = document.createElement("th");
		let thSongLength= document.createElement("th");
		let thAddVersion= document.createElement("th");

		thSongName.innerText = items[i].SongName;
		thComposerName.innerText = items[i].ComposerName;
		thChapterName.innerText = items[i].ChapterName;
		thBpm.innerText = items[i].Bpm;
		const songLength = items[i].SongLength;
		const songLengthMinute = Math.floor(parseInt(songLength) / 60);
		let songLengthSecond = parseInt(songLength) % 60;
		// 1桁の場合は0を結合
		if(songLengthSecond < 10) {
			songLengthSecond = "0" + songLengthSecond;
		}
		thSongLength.innerText = songLengthMinute + ":" + songLengthSecond;
		thAddVersion.innerText = items[i].AddVersion;

		tr.appendChild(thSongName);
		tr.appendChild(thComposerName);
		tr.appendChild(thChapterName);
		tr.appendChild(thBpm);
		tr.appendChild(thSongLength);
		tr.appendChild(thAddVersion);
		table.appendChild(tr);
	}
}

