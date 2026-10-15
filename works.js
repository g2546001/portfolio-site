fetch("works.csv")
    .then(function(response){
        return response.text();
    })
    .then(function(data){

        // CSVを行ごとに分割
        var rows = data.trim().split("\n");

        //1行目は見出し
        var headers = rows[0].split(",");

        //2行目以降を作品データにする
        var works = rows.slice(1).map(function(row) {
            
            var values = row.split(",");

            var work = {};

            headers.forEach(function(header, index) {
                work[header] = values[index];
            });

            return work;
        });

        // Worksを表示する場所
        var grid = document.getElementById("works-grid");

        var categorySelect = document.getElementById("category");

        var sortSelect = document.getElementById("sort");

        //作品を１つずつ表示
        works.forEach(function(work) {

            var card = document.createElement("article");

            card.className = "work-card";

            card.innerHTML =
                '<a href="' + work.link + '">' +
                    '<img src="' + work.image + '" alt="' + work.title + '">' +
                    '<h4>' + work.title + '</h4>' +
                    '<p>' + work.description + '</p>' +
                '</a>';

            grid.appendChild(card);
        });


//カテゴリー一覧を作る
var categories = [];

works.forEach(function(work) {
    //まだ追加されていないカテゴリならリストに追加
    if (!categories.includes(work.category)) {
        categories.push(work.category);
    }
});
//selectにカテゴリを追加しWebページに表示させる
categories.forEach(function(category) {
    var option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
});

//作品を表示する関数
function displayWorks() {

    //選択されたカテゴリを取得
    var selectedCategory = categorySelect.value;

    //選択されたソート方法を取得
    var sortType = sortSelect.value;

    //元のWorksをコピー
    var filteredWorks = works.slice();

    //カテゴリ絞り込み
    if (selectedCategory !== "all") {
        filteredWorks = filteredWorks.filter(function(work) {
            return work.category === selectedCategory;            
        });
    }

//ソート
if (sortType === "new") {
    filteredWorks.sort(function(a, b) {
        return Number(b.year) - Number(a.year);
    });
}
else if (sortType === "old") {
    filteredWorks.sort(function(a, b) {
        return Number(a.year) - Number(b.year);
    });
}
else if (sortType === "title") {
    filteredWorks.sort(function(a, b) {
        return a.title.localeCompare(b.title, "Ja");
    });
}

//画像を一度空にする
grid.innerHTML = "";

//作品を一つずつ表示
filteredWorks.forEach(function(work) {

    var card = document.createElement("article");

    card.className = "work-card";

    card.innerName = "work-card";

    card.innerHTML =
        '<a href="' + work.link + '">' +
            '<img src="' + work.image + '" alt="' + work.title + '">' +
            '<div class="work-info">' +
                '<p class="work-category">' + work.category + '</p>' +
                '<h4>' + work.title + '</h4>' +
                '<p>' + work.description + '</p>' +
                '<p class="work-year">' + work.year + '</p>' +
            '</div>' +
        '</a>';

    grid.appendChild(card);
});

}

//最初に表示
displayWorks();

//カテゴリ変更時
categorySelect.addEventListener("change", function() {
    displayWorks();
});

//ソート変更時
sortSelect.addEventListener("change", function() {
    displayWorks();
});
    });
// Y2K カラーチェンジ機能
const moodButton = document.getElementById("mood-button");

const moodColors = [
    ["#ffffff", "#ffffff", "#ffb6d5"],
    ["#ffd6e7", "#ffb6d5", "#ff69b4"],
    ["#e3d5ff", "#c9b6ff", "#a78bfa"],
    ["#fff0b3", "#ffe080", "#ffb347"],
    ["#d8f3dc", "#a8e6b0", "#70c989"]
];

let moodIndex = 0;

moodButton.addEventListener("click", function() {
    moodIndex = (moodIndex + 1) % moodColors.length;

    document.body.style.backgroundColor = moodColors[moodIndex][0];

    document.querySelector("header").style.backgroundColor =
        moodColors[moodIndex][1];

    moodButton.style.backgroundColor = moodColors[moodIndex][2];
});
// Y2K キラキラカーソル
const sparkleSymbols = ["✦", "★", "✧", "♡", "✳"];
let lastSparkleTime = 0;

document.addEventListener("pointermove", function(e) {
    // マウス操作のときだけ表示
    if (e.pointerType !== "mouse") return;

    // 星が出すぎないように調整
    const now = Date.now();
    if (now - lastSparkleTime < 60) return;
    lastSparkleTime = now;

    const sparkle = document.createElement("span");
    sparkle.className = "cursor-sparkle";

    // ランダムな星やハートを表示
    sparkle.textContent =
        sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];

    sparkle.style.left = e.clientX + "px";
    sparkle.style.top = e.clientY + "px";

    // ランダムな色
    const colors = ["#ff69b4", "#a78bfa", "#ffb347", "#ffffff"];
    sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];

    document.body.appendChild(sparkle);

    // アニメーション終了後に削除
    setTimeout(function() {
        sparkle.remove();
    }, 700);
});