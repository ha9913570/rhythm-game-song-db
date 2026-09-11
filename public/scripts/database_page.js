// 検索結果から表を更新する関数
function updateSongList(items) {
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

// テキストボックス内でキーを押された時のイベントを設定する関数
function giveEventForTextbox() {
    const songNameTextbox = document.getElementById("search-song-name");
    const composerNameTextbox = document.getElementById("search-composer-name");
    const chapterNameTextbox = document.getElementById("search-chapter-name");

    songNameTextbox.addEventListener("keydown", searchEvent);
    composerNameTextbox.addEventListener("keydown", searchEvent);
    chapterNameTextbox.addEventListener("keydown", searchEvent);
}