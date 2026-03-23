const foodQueryInput = document.getElementById("foodQuery");
const dietTypeSelect = document.getElementById("dietType");
const searchBtn = document.getElementById("searchBtn");
const resultContainer = document.getElementById("resultContainer");
const foodCountBadge = document.getElementById("foodCountBadge");

const logForm = document.getElementById("logForm");
const logsGrid = document.getElementById("logsGrid");
const clearBtn = document.getElementById("clearBtn");
const exportBtn = document.getElementById("exportBtn");
const trendChart = document.getElementById("trendChart");
const triggerInsights = document.getElementById("triggerInsights");

const stressInput = document.getElementById("stress");
const bloatingInput = document.getElementById("bloating");
const painInput = document.getElementById("pain");
const entryDateInput = document.getElementById("entryDate");
const entryTimeInput = document.getElementById("entryTime");

const stressValue = document.getElementById("stressValue");
const bloatingValue = document.getElementById("bloatingValue");
const painValue = document.getElementById("painValue");

const LOG_STORAGE_KEY = "gutcheck_entries_v1";

const statusLabels = {
  guvenli: "Güvenli",
  riskli: "Riskli",
  dikkatli: "Dikkat",
};

const dietNameMap = {
  fodmap: "Low FODMAP",
  glutenFree: "Glutensiz",
  lactoseFree: "Laktozsuz",
  vegan: "Vegan",
};

const baseFoods = [
  { name: "sarımsak", tags: ["high-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "elma", tags: ["high-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "muz", tags: ["medium-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "pirinç", tags: ["low-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "yoğurt", tags: ["low-fodmap", "vegetarian", "glutensiz", "laktoslu"] },
  { name: "süt", tags: ["high-fodmap", "vegetarian", "glutensiz", "laktoslu"] },
  { name: "mercimek", tags: ["high-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "ekmek", tags: ["high-fodmap", "vegan", "glutenli", "laktozsuz"] },
  { name: "tavuk", tags: ["low-fodmap", "et", "glutensiz", "laktozsuz"] },
  { name: "yumurta", tags: ["low-fodmap", "vegetarian", "glutensiz", "laktozsuz"] },
  { name: "peynir", tags: ["low-fodmap", "vegetarian", "glutensiz", "medium-lactose"] },
  { name: "domates", tags: ["low-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "soğan", tags: ["high-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "patates", tags: ["low-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "makarna", tags: ["medium-fodmap", "vegan", "glutenli", "laktozsuz"] },
  { name: "kinoa", tags: ["low-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "karabuğday", tags: ["low-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "mısır", tags: ["dikkat-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "yulaf", tags: ["dikkat-fodmap", "vegan", "dikkat-gluten", "laktozsuz"] },
  { name: "ıspanak", tags: ["low-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "kabak", tags: ["low-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "havuç", tags: ["low-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "brokoli", tags: ["dikkat-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "karnabahar", tags: ["high-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "mantar", tags: ["high-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "salatalık", tags: ["low-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "marul", tags: ["low-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "çilek", tags: ["low-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "yaban mersini", tags: ["low-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "portakal", tags: ["dikkat-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "mandalina", tags: ["dikkat-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "kivi", tags: ["dikkat-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "üzüm", tags: ["dikkat-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "ananas", tags: ["dikkat-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "karpuz", tags: ["high-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "şeftali", tags: ["high-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "kayısı", tags: ["high-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "laktozsuz süt", tags: ["low-fodmap", "vegetarian", "glutensiz", "laktozsuz"] },
  { name: "laktozsuz yoğurt", tags: ["low-fodmap", "vegetarian", "glutensiz", "laktozsuz"] },
  { name: "kaşar peyniri", tags: ["low-fodmap", "vegetarian", "glutensiz", "dikkat-lactose"] },
  { name: "beyaz peynir", tags: ["dikkat-fodmap", "vegetarian", "glutensiz", "dikkat-lactose"] },
  { name: "tereyağı", tags: ["low-fodmap", "vegetarian", "glutensiz", "low-lactose"] },
  { name: "zeytinyağı", tags: ["low-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "avokado", tags: ["dikkat-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "hindi", tags: ["low-fodmap", "et", "glutensiz", "laktozsuz"] },
  { name: "dana eti", tags: ["low-fodmap", "et", "glutensiz", "laktozsuz"] },
  { name: "balık", tags: ["low-fodmap", "et", "glutensiz", "laktozsuz"] },
  { name: "nohut", tags: ["high-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "fasulye", tags: ["high-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "bulgur", tags: ["high-fodmap", "vegan", "glutenli", "laktozsuz"] },
  { name: "buğday ekmeği", tags: ["high-fodmap", "vegan", "glutenli", "laktozsuz"] },
  { name: "arpa", tags: ["high-fodmap", "vegan", "glutenli", "laktozsuz"] },
  { name: "çavdar", tags: ["high-fodmap", "vegan", "glutenli", "laktozsuz"] },
  { name: "glutensiz ekmek", tags: ["dikkat-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "badem", tags: ["dikkat-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "ceviz", tags: ["low-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "fındık", tags: ["dikkat-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "kaju", tags: ["high-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "antep fıstığı", tags: ["high-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "bal", tags: ["high-fodmap", "vegetarian", "glutensiz", "laktozsuz"] },
  { name: "şeker", tags: ["dikkat-fodmap", "vegan", "glutensiz", "laktozsuz"] },
  { name: "sucuk", tags: ["dikkat-fodmap", "et", "dikkat-gluten", "laktozsuz"] },
];

function createExpandedFoods(baseList, targetCount = 420) {
  const prefixes = ["organik", "ev yapımı", "hafif", "özel", "geleneksel"];
  const suffixes = [
    "haşlama",
    "ızgara",
    "fırın",
    "sote",
    "salatası",
    "çorbası",
    "püresi",
    "kasesi",
    "tabağı",
  ];

  const expanded = [...baseList];
  const nameSet = new Set(baseList.map((item) => item.name.toLocaleLowerCase("tr-TR")));

  for (const food of baseList) {
    for (const suffix of suffixes) {
      if (expanded.length >= targetCount) break;
      const candidateName = `${food.name} ${suffix}`;
      const key = candidateName.toLocaleLowerCase("tr-TR");
      if (nameSet.has(key)) continue;
      expanded.push({ name: candidateName, tags: [...food.tags] });
      nameSet.add(key);
    }
    if (expanded.length >= targetCount) break;
  }

  for (const food of baseList) {
    for (const prefix of prefixes) {
      if (expanded.length >= targetCount) break;
      const candidateName = `${prefix} ${food.name}`;
      const key = candidateName.toLocaleLowerCase("tr-TR");
      if (nameSet.has(key)) continue;
      expanded.push({ name: candidateName, tags: [...food.tags] });
      nameSet.add(key);
    }
    if (expanded.length >= targetCount) break;
  }

  return expanded;
}

const foods = createExpandedFoods(baseFoods, 420);

const foodDatabase = foods.map((food) => ({
  name: food.name,
  diets: buildDietResults(food.tags),
}));

function buildDietResults(tags) {
  return {
    fodmap: getFodmap(tags),
    glutenFree: getGlutenFree(tags),
    lactoseFree: getLactoseFree(tags),
    vegan: getVegan(tags),
  };
}

function getFodmap(tags) {
  if (tags.includes("high-fodmap")) {
    return {
      status: "riskli",
      message: "Yüksek FODMAP içeriği nedeniyle semptomları artırabilir.",
      note: "Şişkinlik ve gaz şikayetlerini tetikleyebilir.",
    };
  }
  if (tags.includes("medium-fodmap") || tags.includes("dikkat-fodmap")) {
    return {
      status: "dikkatli",
      message: "Porsiyona bağlı olarak semptom oluşturabilir.",
      note: "Küçük porsiyonla başlayıp toleransını gözlemleyin.",
    };
  }
  return {
    status: "guvenli",
    message: "Genellikle düşük FODMAP kabul edilir.",
    note: "Kişisel tolerans yine de değişebilir.",
  };
}

function getGlutenFree(tags) {
  if (tags.includes("glutenli")) {
    return {
      status: "riskli",
      message: "Gluten içerdiği için uygun değildir.",
      note: "Çölyak veya gluten hassasiyetinde kaçınılmalıdır.",
    };
  }
  if (tags.includes("dikkat-gluten")) {
    return {
      status: "dikkatli",
      message: "Çapraz bulaş riski olabilir.",
      note: "Sertifikalı glutensiz ürün tercih edin.",
    };
  }
  return {
    status: "guvenli",
    message: "Doğal olarak glutensizdir.",
    note: "İşlenmiş ürünlerde etiket kontrolü yapın.",
  };
}

function getLactoseFree(tags) {
  if (tags.includes("laktoslu")) {
    return {
      status: "riskli",
      message: "Laktoz içerdiği için semptom yapabilir.",
      note: "Laktozsuz alternatifler daha iyi tolere edilebilir.",
    };
  }
  if (tags.includes("dikkat-lactose") || tags.includes("medium-lactose") || tags.includes("low-lactose")) {
    return {
      status: "dikkatli",
      message: "Düşük miktarda laktoz içerebilir.",
      note: "Porsiyon miktarı semptom şiddetini etkileyebilir.",
    };
  }
  return {
    status: "guvenli",
    message: "Laktoz içermez veya çok düşüktür.",
    note: "",
  };
}

function getVegan(tags) {
  if (tags.includes("vegan")) {
    return {
      status: "guvenli",
      message: "Hayvansal içerik barındırmaz.",
      note: "",
    };
  }
  if (tags.includes("vegetarian")) {
    return {
      status: "riskli",
      message: "Süt/peynir/yumurta gibi hayvansal içerik barındırır.",
      note: "Vegan beslenmeye uygun değildir.",
    };
  }
  return {
    status: "riskli",
    message: "Hayvansal kaynaklı bir besindir.",
    note: "Vegan beslenmeye uygun değildir.",
  };
}

function escapeHtml(text = "") {
  return text
    .toString()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function toTitleCase(text) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function randomSuggestions(source, count = 3) {
  const cloned = [...source];
  const picks = [];
  while (cloned.length && picks.length < count) {
    const idx = Math.floor(Math.random() * cloned.length);
    picks.push(cloned.splice(idx, 1)[0]);
  }
  return picks;
}

function renderResultCard({ foodName, result }) {
  const shouldShowDoctorAdvice = result.status !== "guvenli";
  resultContainer.innerHTML = `
    <article class="result-card">
      <div class="result-top">
        <h3>${escapeHtml(toTitleCase(foodName))}</h3>
        <span class="risk-badge ${result.status}">${statusLabels[result.status]}</span>
      </div>
      <p class="result-message">${escapeHtml(result.message)}</p>
      ${result.note ? `<p class="result-note"><strong>Not:</strong> ${escapeHtml(result.note)}</p>` : ""}
      ${
        shouldShowDoctorAdvice
          ? `<p class="doctor-advice"><strong>Öneri:</strong> Belirtileriniz sürüyorsa veya şiddetleniyorsa doktora ve diyetisyene danışın.</p>`
          : ""
      }
    </article>
  `;
}

function renderNotFound() {
  const suggestions = randomSuggestions(foodDatabase, 3);
  resultContainer.innerHTML = `
    <article class="result-card">
      <div class="result-top">
        <h3>Besin bulunamadı</h3>
        <span class="risk-badge dikkatli">Uyarı</span>
      </div>
      <p class="result-message">Bu besin veri tabanında yok.</p>
      <div class="suggestions">
        <p>Bunları sorgulamayı deneyin:</p>
        <div class="suggestion-list">
          ${suggestions.map((item) => `<span class="chip">${escapeHtml(toTitleCase(item.name))}</span>`).join("")}
        </div>
      </div>
    </article>
  `;
}

function searchFood() {
  const query = foodQueryInput.value.trim().toLocaleLowerCase("tr-TR");
  const selectedDiet = dietTypeSelect.value;

  if (!query) {
    resultContainer.innerHTML = `<div class="empty">Lütfen bir besin adı girin.</div>`;
    return;
  }

  const exactMatch = foodDatabase.find((item) => item.name === query);
  const partialMatch = foodDatabase.find((item) => item.name.includes(query));
  const food = exactMatch || partialMatch;

  if (!food) {
    renderNotFound();
    return;
  }

  renderResultCard({
    foodName: food.name,
    result: food.diets[selectedDiet],
  });
}

function getEntries() {
  const raw = localStorage.getItem(LOG_STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveEntries(entries) {
  localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(entries));
}

function formatDateTime(date) {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  const h = date.getHours().toString().padStart(2, "0");
  const min = date.getMinutes().toString().padStart(2, "0");
  return `${d}.${m}.${y} - ${h}:${min}`;
}

function getNowDateTimeForInputs() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  return {
    date: `${yyyy}-${mm}-${dd}`,
    time: `${hh}:${min}`,
  };
}

function buildDateFromInputs(dateValue, timeValue) {
  if (!dateValue || !timeValue) return new Date();
  return new Date(`${dateValue}T${timeValue}:00`);
}

function renderEntries() {
  const entries = getEntries();
  if (!entries.length) {
    logsGrid.innerHTML = `<div class="empty">Henüz kayıt yok</div>`;
    renderTrendChart([]);
    renderTriggerInsights([]);
    return;
  }

  logsGrid.innerHTML = entries
    .map(
      (entry) => `
      <article class="entry-card">
        <p class="entry-time">${escapeHtml(entry.timeLabel)}</p>
        <p class="entry-metrics">Stres: ${entry.stress}/5 | Şişkinlik: ${entry.bloating}/5 | Ağrı: ${entry.pain}/5</p>
        ${entry.note ? `<p class="entry-note">${escapeHtml(entry.note)}</p>` : ""}
        ${entry.foodsEaten ? `<p class="entry-foods">Yedikleriniz: ${escapeHtml(entry.foodsEaten)}</p>` : ""}
      </article>
    `
    )
    .join("");

  renderTrendChart(entries);
  renderTriggerInsights(entries);
}

function resetDiaryForm() {
  logForm.reset();
  const nowValues = getNowDateTimeForInputs();
  entryDateInput.value = nowValues.date;
  entryTimeInput.value = nowValues.time;
  stressInput.value = "3";
  bloatingInput.value = "3";
  painInput.value = "3";
  stressValue.textContent = "3";
  bloatingValue.textContent = "3";
  painValue.textContent = "3";
}

function syncRangeValue(rangeInput, targetElement) {
  targetElement.textContent = rangeInput.value;
}

function initDiaryEvents() {
  stressInput.addEventListener("input", () => syncRangeValue(stressInput, stressValue));
  bloatingInput.addEventListener("input", () => syncRangeValue(bloatingInput, bloatingValue));
  painInput.addEventListener("input", () => syncRangeValue(painInput, painValue));

  logForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(logForm);
    const selectedDate = formData.get("entryDate")?.toString() || "";
    const selectedTime = formData.get("entryTime")?.toString() || "";
    const entryDateTime = buildDateFromInputs(selectedDate, selectedTime);

    const newEntry = {
      id: crypto.randomUUID(),
      timeLabel: formatDateTime(entryDateTime),
      stress: Number(formData.get("stress")),
      bloating: Number(formData.get("bloating")),
      pain: Number(formData.get("pain")),
      note: formData.get("note")?.toString().trim() || "",
      foodsEaten: formData.get("foodsEaten")?.toString().trim() || "",
    };

    const entries = getEntries();
    entries.unshift(newEntry);
    saveEntries(entries);
    renderEntries();
    resetDiaryForm();
  });

  clearBtn.addEventListener("click", () => {
    const approved = window.confirm("Tüm kayıtlar silinsin mi? Bu işlem geri alınamaz.");
    if (!approved) return;
    localStorage.removeItem(LOG_STORAGE_KEY);
    renderEntries();
  });

  exportBtn.addEventListener("click", () => {
    const entries = getEntries();
    if (!entries.length) {
      window.alert("İndirilecek kayıt bulunmuyor.");
      return;
    }
    exportEntriesAsCsv(entries);
  });
}

function initFoodEvents() {
  searchBtn.addEventListener("click", searchFood);
  foodQueryInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchFood();
    }
  });
}

function initApp() {
  const nowValues = getNowDateTimeForInputs();
  entryDateInput.value = nowValues.date;
  entryTimeInput.value = nowValues.time;
  foodCountBadge.textContent = `Toplam besin: ${foodDatabase.length}`;
  resultContainer.innerHTML = `<div class="empty">Bir besin ve diyet tipi seçip "Sorgula" butonuna basın.</div>`;
  initFoodEvents();
  initDiaryEvents();
  renderEntries();
}

function createLinePath(points) {
  if (!points.length) return "";
  return points.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

function renderTrendChart(entries) {
  if (!entries.length) {
    trendChart.innerHTML = `<div class="empty">Grafik için henüz yeterli kayıt yok</div>`;
    return;
  }

  const recent = [...entries].slice(0, 7).reverse();
  const width = 560;
  const height = 210;
  const padX = 34;
  const padY = 20;
  const stepX = recent.length === 1 ? 0 : (width - padX * 2) / (recent.length - 1);

  const scaleY = (value) => {
    const ratio = (value - 1) / 4;
    return height - padY - ratio * (height - padY * 2);
  };

  const makePoints = (key) =>
    recent.map((entry, idx) => ({
      x: padX + idx * stepX,
      y: scaleY(entry[key]),
    }));

  const stressPath = createLinePath(makePoints("stress"));
  const bloatingPath = createLinePath(makePoints("bloating"));
  const painPath = createLinePath(makePoints("pain"));

  const labels = recent
    .map((entry, idx) => {
      const [date] = entry.timeLabel.split(" - ");
      return `<text x="${padX + idx * stepX}" y="${height - 4}" text-anchor="middle" fill="#b8c8f0" font-size="10">${escapeHtml(date.slice(0, 5))}</text>`;
    })
    .join("");

  const gridLines = [1, 2, 3, 4, 5]
    .map((n) => {
      const y = scaleY(n);
      return `<line x1="${padX}" y1="${y}" x2="${width - padX}" y2="${y}" stroke="rgba(220,230,255,0.18)" stroke-width="1" />`;
    })
    .join("");

  trendChart.innerHTML = `
    <svg class="trend-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Haftalık semptom grafiği">
      ${gridLines}
      <path d="${stressPath}" class="line-stress"></path>
      <path d="${bloatingPath}" class="line-bloating"></path>
      <path d="${painPath}" class="line-pain"></path>
      ${labels}
    </svg>
    <div class="chart-legend">
      <span><i class="legend-dot" style="background:#7ea2ff"></i>Stres</span>
      <span><i class="legend-dot" style="background:#7ce0bf"></i>Şişkinlik</span>
      <span><i class="legend-dot" style="background:#ffb878"></i>Ağrı</span>
    </div>
  `;
}

function normalizeText(value) {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ı", "i")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c");
}

function extractFoods(text) {
  if (!text) return [];
  return text
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function renderTriggerInsights(entries) {
  if (!entries.length) {
    triggerInsights.innerHTML = `<div class="empty">Analiz için henüz kayıt yok</div>`;
    return;
  }

  const lookup = new Map(foodDatabase.map((f) => [normalizeText(f.name), f]));
  const stats = new Map();

  entries.forEach((entry) => {
    const parsedFoods = extractFoods(entry.foodsEaten);
    parsedFoods.forEach((foodName) => {
      const key = normalizeText(foodName);
      if (!stats.has(key)) {
        stats.set(key, { label: foodName, count: 0, total: 0, riskyCount: 0 });
      }
      const row = stats.get(key);
      row.count += 1;
      row.total += entry.stress + entry.bloating + entry.pain;
      const match = lookup.get(key);
      if (match && match.diets.fodmap.status === "riskli") {
        row.riskyCount += 1;
      }
    });
  });

  const ranked = [...stats.values()]
    .filter((item) => item.count >= 2)
    .map((item) => ({
      ...item,
      avgScore: item.total / item.count,
    }))
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, 3);

  if (!ranked.length) {
    triggerInsights.innerHTML = `
      <div class="empty">Tetikleyici analizi için aynı besini en az 2 gün kaydetmeniz gerekir.</div>
    `;
    return;
  }

  triggerInsights.innerHTML = ranked
    .map((item, idx) => {
      const likelyTrigger = item.avgScore >= 9 || item.riskyCount >= 1;
      return `
        <article class="insight-card">
          <p><strong>${idx + 1}. ${escapeHtml(toTitleCase(item.label))}</strong> için ortalama semptom skoru: <strong>${item.avgScore.toFixed(1)}/15</strong></p>
          <small>${likelyTrigger ? "Olası tetikleyici olarak öne çıkıyor." : "Şimdilik düşük-orta etkili görünüyor."} ${item.riskyCount ? "FODMAP açısından riskli sınıfta geçiyor." : ""}</small>
        </article>
      `;
    })
    .join("");
}

function exportEntriesAsCsv(entries) {
  const delimiter = ";";
  const header = ["TarihSaat", "Stres", "Siskinlik", "Agri", "YenenBesinler", "Not"];
  const rows = entries.map((entry) => [
    entry.timeLabel,
    entry.stress,
    entry.bloating,
    entry.pain,
    entry.foodsEaten || "",
    entry.note || "",
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(delimiter))
    .join("\n");

  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `gutcheck-kayitlar-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

initApp();
