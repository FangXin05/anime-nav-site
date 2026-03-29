const Database = require("better-sqlite3");

const db = new Database("anime.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS sites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    desc TEXT NOT NULL,
    tag TEXT NOT NULL,
    url TEXT NOT NULL
  )
`);

const count = db.prepare("SELECT COUNT(*) AS count FROM sites").get();

if (count.count === 0) {
  const insert = db.prepare(`
    INSERT INTO sites (title, desc, tag, url)
    VALUES (?, ?, ?, ?)
  `);

  const seedData = [
    [
      "哔哩哔哩番剧",
      "国内大型二次元社区，支持追番与弹幕。",
      "正版平台",
      "https://www.bilibili.com",
    ],
    ["Bangumi", "ACG 数据库与追番管理工具。", "评分社区", "https://bgm.tv"],
    [
      "MyAnimeList",
      "全球动漫评分与追踪社区。",
      "国际社区",
      "https://myanimelist.net",
    ],
    [
      "AniList",
      "现代化动漫追踪平台，支持统计。",
      "数据统计",
      "https://anilist.co",
    ],
  ];

  for (const item of seedData) {
    insert.run(...item);
  }
}

module.exports = db;
