import { For, createSignal } from "solid-js";

enum CompareOption {
  HSK = "HSK",
  活着 = "活着",
}

const optionLevels = new Map<CompareOption, number[]>();
optionLevels.set(CompareOption.HSK, [1, 2, 3, 4, 5, 6]);
optionLevels.set(CompareOption.活着, [200, 500, 2000, 5000]);

function Compare() {
  const options = [CompareOption.HSK, CompareOption.活着];

  const [optionA, setOptionA] = createSignal<CompareOption>(CompareOption.HSK);
  const [optionB, setOptionB] = createSignal<CompareOption>(CompareOption.活着);

  return (
    <div class="px-16 py-4">
      <div class="flex items-center gap-4">
        Compare
        <select
          onChange={(e) => setOptionA(e.target.value as any)}
          value={optionA()}
        >
          <For each={options}>{(option) => <option>{option}</option>}</For>
        </select>
        To
        <select
          onChange={(e) => setOptionB(e.target.value as any)}
          value={optionB()}
        >
          <For each={options}>{(option) => <option>{option}</option>}</For>
        </select>
      </div>

      {/* table */}
      <table>
        <thead>
          <tr>
            <th></th>
            <For each={optionLevels.get(optionB())}>
              {(levelB) => <th>{levelB} </th>}
            </For>
          </tr>
        </thead>
        <tbody>
          <For each={optionLevels.get(optionA())}>
            {(levelA) => (
              <tr>
                <th>{levelA}</th>
                <For each={optionLevels.get(optionB())}>
                  {(levelB) => <td>-</td>}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}

export default Compare;
