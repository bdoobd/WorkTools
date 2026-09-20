const CALC_KEY = "Calc";
const AIR_RATIO = 6000;

function renderCalcInterface(container) {
  container.innerHTML = `
    <div class="calc__wrapper">
      <div class="calc__block">
        <fieldset class="name_result">
          <label for="name">Название/Номер груза (необязательно):</label>
          <input type="text" name="name" class="name__field" placeholder="Например номер кейкки или имя отправителя">
        </fieldset>

        <div class="dim__lines" id="dim_lines"></div>
  
        <div class="btn btn__calc_group">
          <button name=""id="add_line_btn">➕ Добавить место</button>
          <button name=""id="save_calc_btn">💾 Сохранить расчет</button>
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
        <div class="dimension-line" data-index="${index}" style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr auto; gap: 10px; align-items: end; margin-bottom: 10px; background: #fff; padding: 10px; border-radius: 4px; border: 1px solid #eee;">
            <div>
                <label style="font-size: 12px; color: #666;">Кол-во (Pcs)</label>
                <input type="number" class="input-pcs" value="${data.pcs}" min="1" style="width: 100%; padding: 6px; box-sizing: border-box;">
            </div>
            <div>
                <label style="font-size: 12px; color: #666;">Длина (Д, см)</label>
                <input type="number" class="input-l" value="${data.l}" min="0" placeholder="см" style="width: 100%; padding: 6px; box-sizing: border-box;">
            </div>
            <div>
                <label style="font-size: 12px; color: #666;">Ширина (Ш, см)</label>
                <input type="number" class="input-w" value="${data.w}" min="0" placeholder="см" style="width: 100%; padding: 6px; box-sizing: border-box;">
            </div>
            <div>
                <label style="font-size: 12px; color: #666;">Высота (В, см)</label>
                <input type="number" class="input-h" value="${data.h}" min="0" placeholder="см" style="width: 100%; padding: 6px; box-sizing: border-box;">
            </div>
            <div>
                <label style="font-size: 12px; color: #666;">Вес 1 места (кг)</label>
                <input type="number" class="input-weight" value="${data.weight}" min="0" placeholder="кг" style="width: 100%; padding: 6px; box-sizing: border-box;">
            </div>
            <div>
                <button class="delete-line-btn" style="background: none; border: none; color: #ff4d4d; cursor: pointer; font-size: 16px; padding-bottom: 5px;">❌</button>
            </div>
        </div>
    `;
}

export function initCalc() {
  const container = document.getElementById("calc__content");

  if (!container) return;

  // TODO: Отрисовать интерфейс
  renderCalcInterface(container);
}
