const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/test", (req, res) => {
  res.send("xin-fang-test-2026");
});

app.get("/api/sites", (req, res) => {
  const sites = db.prepare("SELECT * FROM sites ORDER BY id DESC").all();
  res.json(sites);
});

app.get("/api/search", (req, res) => {
  const q = (req.query.q || "").trim();

  if (!q) {
    return res.status(400).json({
      message: "请提供搜索关键词",
      results: [],
    });
  }

  const results = db
    .prepare(
      `
      SELECT * FROM sites
      WHERE title LIKE ?
         OR desc LIKE ?
         OR tag LIKE ?
      ORDER BY id DESC
    `,
    )
    .all(`%${q}%`, `%${q}%`, `%${q}%`);

  res.json({
    keyword: q,
    total: results.length,
    results,
  });
});

app.post("/api/sites", (req, res) => {
  const { title, desc, tag, url } = req.body;

  if (!title || !desc || !tag || !url) {
    return res.status(400).json({ message: "字段不能为空" });
  }

  const result = db
    .prepare(
      `
      INSERT INTO sites (title, desc, tag, url)
      VALUES (?, ?, ?, ?)
    `,
    )
    .run(title, desc, tag, url);

  res.status(201).json({
    id: result.lastInsertRowid,
    title,
    desc,
    tag,
    url,
  });
});

app.put("/api/sites/:id", (req, res) => {
  const { id } = req.params;
  const { title, desc, tag, url } = req.body;

  const result = db
    .prepare(
      `
      UPDATE sites
      SET title = ?, desc = ?, tag = ?, url = ?
      WHERE id = ?
    `,
    )
    .run(title, desc, tag, url, id);

  if (result.changes === 0) {
    return res.status(404).json({ message: "未找到该站点" });
  }

  res.json({ message: "更新成功" });
});

app.delete("/api/sites/:id", (req, res) => {
  const { id } = req.params;

  const result = db.prepare("DELETE FROM sites WHERE id = ?").run(id);

  if (result.changes === 0) {
    return res.status(404).json({ message: "未找到该站点" });
  }

  res.json({ message: "删除成功" });
});

app.listen(PORT, () => {
  console.log("=== 我现在运行的是最新 server.js ===");
  console.log(`Server running: http://localhost:${PORT}`);
});
