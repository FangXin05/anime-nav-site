console.log("Zhu-Ye-Mian-5.js 已加载 - stable1");

function createParticles() {
  const container = document.getElementById("bgAnimation");
  const particleCount = 50;

  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    particle.style.animationDelay = Math.random() * 10 + "s";
    container.appendChild(particle);
  }
}

async function loadSites() {
  try {
    const response = await fetch("/api/sites");

    if (!response.ok) {
      throw new Error(`加载失败，状态码：${response.status}`);
    }

    const data = await response.json();
    renderResults(data);
  } catch (error) {
    console.error("加载站点失败:", error);
    showToast("加载站点失败");
  }
}

async function handleSearch() {
  const input = document.getElementById("searchInput");
  const keyword = input.value.trim();

  if (!keyword) {
    loadSites();
    showToast("已恢复全部站点");
    input.focus();
    return;
  }

  try {
    const response = await fetch(
      `/api/search?q=${encodeURIComponent(keyword)}`,
    );

    if (!response.ok) {
      throw new Error(`搜索失败，状态码：${response.status}`);
    }

    const data = await response.json();
    renderResults(data.results);
    showToast(`找到 ${data.total} 个相关结果`);
  } catch (error) {
    console.error("搜索失败:", error);
    showToast("搜索失败，请稍后再试");
  }
}

function renderResults(results) {
  const resultBox = document.getElementById("searchResults");

  if (!resultBox) return;

  if (!results.length) {
    resultBox.innerHTML = `
      <div class="card">
        <div class="card-title">没有找到结果</div>
        <div class="card-desc">换个关键词试试，比如“正版”“评分”“追番”。</div>
      </div>
    `;
    return;
  }

  resultBox.innerHTML = results
    .map(
      (item) => `
      <div class="card">
        <div class="card-title">${item.title}</div>
        <div class="card-desc">${item.desc}</div>
        <div class="card-tag">${item.tag}</div>
        <div style="margin-top: 16px;">
          <button
            class="search-btn"
            type="button"
            onclick="window.open('${item.url}', '_blank')"
          >
            打开站点
          </button>
        </div>
      </div>
    `,
    )
    .join("");
}

async function addSite(event) {
  event.preventDefault();

  const title = document.getElementById("siteTitle").value.trim();
  const desc = document.getElementById("siteDesc").value.trim();
  const tag = document.getElementById("siteTag").value.trim();
  const url = document.getElementById("siteUrl").value.trim();

  if (!title || !desc || !tag || !url) {
    showToast("请把表单填写完整");
    return;
  }

  try {
    const response = await fetch("/api/sites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, desc, tag, url }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("新增接口返回：", text);
      throw new Error("新增失败");
    }

    await response.json();
    showToast("新增成功");
    document.getElementById("addSiteForm").reset();
    loadSites();
  } catch (error) {
    console.error("新增失败:", error);
    showToast("新增失败，请稍后再试");
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
}

const addSiteForm = document.getElementById("addSiteForm");
if (addSiteForm) {
  addSiteForm.addEventListener("submit", addSite);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".bg-animation");

  if (parallax) {
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

createParticles();
loadSites();
