async function getDataFromDb() {
	// apiから曲データを取得
	const response = await fetch("/api/get-song-db");
	const items = await response.json();

	const table = document.getElementById("song_list");
	for(let i = 0; i < items.length; i++){
		let tr = document.createElement("tr");
		let thSongName = document.createElement("th");
		let thBpm = document.createElement("th");
		let thSongLength= document.createElement("th");
		let thAddVersion= document.createElement("th");

		thSongName.innerText = items[i].SongName;
		thBpm.innerText = items[i].Bpm;
		const songLength = items[i].SongLength;
		const songLengthMinute = Math.floor(parseInt(songLength) / 60);
		const songLengthSecond = parseInt(songLength) % 60;
		thSongLength.innerText = songLengthMinute + ":" + songLengthSecond;
		thAddVersion.innerText = items[i].AddVersion;

		tr.appendChild(thSongName);
		tr.appendChild(thBpm);
		tr.appendChild(thSongLength);
		tr.appendChild(thAddVersion);
		table.appendChild(tr);
	}
}

