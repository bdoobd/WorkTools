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

  console.log(lines);
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
    // TODO: Включить расчёт
    calculateTotals();
  }

  addLine();

  addLineBtn.addEventListener("click", () => addLine());

  linesContainer.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-line-btn");
    if (!deleteBtn) return;

    const line = deleteBtn.closest(".dimension-line");

    if (document.querySelectorAll(".dimension-line").length > 1) {
      line.remove();
      // TODO: Включить расчёт
      calculateTotals();
    } else {
      // TODO: Подумать как выдавать ошибку пользователю
      alert("Последнее место не удалять!!!");
    }

    console.log(line);
  });
}
