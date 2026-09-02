// テキストボックスの値などに応じてAPIのURLを取得する関数
function getApiUrl(gameName) {
    let apiUrl = "/api/get" + gameName + "Db";

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