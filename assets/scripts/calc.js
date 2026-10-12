const CALC_KEY = "Calc";
const AIR_RATIO = 6000;

function getHistory() {
  const data = localStorage.getItem(CALC_KEY);
  return data ? JSON.parse(data) : [];
}

function saveHistory(history) {
  localStorage.setItem(CALC_KEY, JSON.stringify(history));
}

function renderCalcInterface(container) {
  container.innerHTML = `
    <div class="calc__wrapper">
      <div class="calc__block">
        <fieldset class="name_result">
          <label for="case_name">Название/Номер груза (необязательно):</label>
          <input type="text" id="case_name" class="name__field" placeholder="Например номер кейкки или имя отправителя">
        </fieldset>

        <div class="dim__lines" id="dim_lines"></div>
  
        <div class="btn btn__calc_group">
          <button name="" id="add_line_btn">➕ Добавить место</button>
          <button name="" id="save_calc_btn">💾 Сохранить расчет</button>
        </div>
      </div>

      <div id="calc_result_block">
        <h3>Итого</h3>
        <p>Объём: <strong id="total_cbm">0000</strong> m<sup>3</sup></p>
        <p>Фактический вес <strong id="total_gross">0000</strong> kg</p>
        <p>Chargeable weight: <strong id="total_chargeable">0000</strong> kg</p>
        <span id="calc_method_badge">По объёму / По весу</span>
      </div>

      <div id="history_block">
        <h3>История сохранённых расчётов</h3>
        <div id="calc_history_list"></div>
      </div>
    </div>
  `;
}

function createLineHTML(
  index,
  data = { pcs: 1, l: "", w: "", h: "", weight: "" },
) {
  return `
        <div class="dimension-line" data-index="${index}">
            <div>
                <label for="line_qty_${index}">Кол-во (Pcs)</label>
                <input type="number" class="input-pcs" value="${data.pcs}" min="1" id="line_qty_${index}">
            </div>
            <div>
                <label for="line_l_${index}">Длина (Д, см)</label>
                <input type="number" class="input-l" value="${data.l}" min="0" placeholder="см" id="line_l_${index}">
            </div>
            <div>
                <label for="line_w_${index}">Ширина (Ш, см)</label>
                <input type="number" class="input-w" value="${data.w}" min="0" placeholder="см" id="line_w_${index}">
            </div>
            <div>
                <label for="line_h_${index}">Высота (В, см)</label>
                <input type="number" class="input-h" value="${data.h}" min="0" placeholder="см" id="line_h_${index}">
            </div>
            <div>
                <label for="line_weight_${index}">Вес 1 места (кг)</label>
                <input type="number" class="input-weight" value="${data.weight}" min="0" placeholder="кг" id="line_weight_${index}">
            </div>
            <div>
                <button class="delete-line-btn">❌</button>
            </div>
        </div>
    `;
}

function calculateTotals() {
  let totalGross = 0;
  let totalVolume = 0;
  let totalVolumetricWeight = 0;

  const lines = document.querySelectorAll(".dimension-line");

  lines.forEach((line) => {
    const pcs = parseFloat(line.querySelector(".input-pcs").value);
    const l = parseFloat(line.querySelector(".input-l").value);
    const w = parseFloat(line.querySelector(".input-w").value);
    const h = parseFloat(line.querySelector(".input-h").value);
    const weight = parseFloat(line.querySelector(".input-weight").value);

    if (pcs > 0) {
      const lineCBM = ((l * w * h) / 1000000) * pcs;
      totalVolume += lineCBM;
      totalGross += weight * pcs;
      const lineVolumetric = (l * w * h) / 6000;
      totalVolumetricWeight += lineVolumetric;
    }
  });

  const chargeable = Math.max(totalGross, totalVolumetricWeight);

  document.getElementById("total_cbm").textContent = totalVolume.toFixed(3);
  document.getElementById("total_gross").textContent = totalGross.toFixed(2);
  document.getElementById("total_chargeable").textContent =
    chargeable.toFixed(2);

  const badge = document.getElementById("calc_method_badge");

  if (totalGross < totalVolumetricWeight) {
    badge.textContent = "Вес, рассчитанный по объёму больше фактического";
    badge.style.color = "rgba(100,100,220,1)";
  } else if (totalGross > 0) {
    badge.textContent = "Фактический вес более объёмного";
    badge.style.color = "rgba(100,220,100,1)";
  } else {
    badge.textContent = "Ожидание ввода данных...";
    badge.style.color = "rgba(100,100,100,1)";
  }
}

function renderHistory() {
  const container = document.getElementById("calc_history_list");

  if (!container) return;

  const history = getHistory();

  if (history.length === 0) {
    container.innerHTML = '<p class="history-empty">История пуста</p>';
    return;
  }
  // TODO: Отредактировать теги и вынести вложеннные стили в файл стилей
  container.innerHTML = history
    .map(
      (item, index) => `
      <div class="history-item">
          <div class="history-item-info">
              <strong class="history-item-name">${item.name || `Расчет #${history.length - index}`}</strong>
              <span class="history-item-date">(${item.date})</span>
              <div style="margin-top: 4px; color: #333;">
                  ${item.totalCBM} CBM | Брутто: ${item.totalGross} кг | <strong>Ch. Weight: ${item.totalChargeable} кг</strong>
              </div>
          </div>
          <div class="history-item-actions" style="display: flex; gap: 8px;">
              <button class="load-calc-btn" data-index="${index}" style="background: #007bff; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">✏️ Редактировать</button>
              <button class="delete-calc-btn" data-index="${index}" style="background: none; border: none; color: red; cursor: pointer;">❌</button>
          </div>
      </div>
  `,
    )
    .join("");
}

export function initCalc() {
  const container = document.getElementById("calc__content");

  if (!container) return;

  renderCalcInterface(container);
  const linesContainer = document.getElementById("dim_lines");
  const addLineBtn = document.getElementById("add_line_btn");
  const saveBtn = document.getElementById("save_calc_btn");
  let counter = 0;

  function addLine(data) {
    const tmpDiv = document.createElement("div");
    tmpDiv.innerHTML = createLineHTML(counter++, data);

    linesContainer.appendChild(tmpDiv);
    calculateTotals();
  }

  addLine();

  addLineBtn.addEventListener("click", () => addLine());

  container.addEventListener("input", (e) => {
    if (e.target.tagName === "INPUT") {
      calculateTotals();
    }
  });

  linesContainer.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-line-btn");
    if (!deleteBtn) return;

    const line = deleteBtn.closest(".dimension-line");

    if (document.querySelectorAll(".dimension-line").length > 1) {
      line.remove();
      calculateTotals();
    } else {
      // TODO: Подумать как выдавать ошибку пользователю
      alert("Последнее место не удалять!!!");
    }

    // console.log(line);
  });

  saveBtn.addEventListener("click", () => {
    const caseName = document.getElementById("case_name");

    if (caseName.value === "") {
      caseName.classList.add("empty_warning");
      return;
    }

    const lineData = [];

    document.querySelectorAll(".dimension-line").forEach((row) => {
      console.log(row);
      lineData.push({
        pcs: row.querySelector(".input-pcs").value,
        l: row.querySelector(".input-l").value,
        w: row.querySelector(".input-w").value,
        h: row.querySelector(".input-h").value,
        weight: row.querySelector(".input-weight").value,
      });
    });

    const record = {
      name: caseName.value.trim(),
      date: new Date().toLocaleString("fi-FI", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
      }),
      lines: lineData,
      totalCBM: document.getElementById("total_cbm").textContent,
      totalGross: document.getElementById("total_gross").textContent,
      totalChargeable: document.getElementById("total_chargeable").textContent,
    };

    const tmpData = getHistory();

    tmpData.push(record);
    saveHistory(tmpData);
    console.log(tmpData);

    caseName.value = "";
    // TODO: Очистить все строки расчёта, кроме одной пустой
    linesContainer.innerHTML = "";
    addLine();
    renderHistory();
    alert("Записано");
  });

  const historyList = document.getElementById("calc_history_list");
  historyList.addEventListener("click", (e) => {
    const loadBtn = e.target.closest(".load-calc-btn");
    const deleteBtn = e.target.closest(".delete-calc-btn"); 
  });

  renderHistory();
}
