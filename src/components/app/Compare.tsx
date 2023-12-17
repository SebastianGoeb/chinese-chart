import { intersectionBy } from "lodash";
import { For, createMemo, createResource, createSignal } from "solid-js";
import {
  HskLevel,
  HskWord,
  Revision,
  getWordsTsv,
  groupWordsByLevel,
} from "../../hsk/hsk";

enum CompareOption {
  HSK = "HSK",
  活着 = "活着",
  Subtlex = "Subtlex",
}

const optionLevels = new Map<CompareOption, number[]>();
optionLevels.set(CompareOption.HSK, [1, 2, 3, 4, 5, 6]);
optionLevels.set(CompareOption.活着, [200, 500, 2000, 5000, Infinity]);
optionLevels.set(CompareOption.Subtlex, [200, 500, 2000, 5000, Infinity]);

function calculatePairings(levelsA: HskLevel[], levelsB: HskLevel[]) {
  const pairings = new Map<string, HskWord[]>();

  // init empty lists
  levelsA.forEach((a) => {
    levelsB.forEach((b) => {
      const commonWords = intersectionBy(
        a.words,
        b.words,
        (hskWord) => hskWord.chinese,
      );
      pairings.set(a.level + "-" + b.level, commonWords);
    });
  });

  return pairings;
}

function Compare() {
  const options = [
    CompareOption.HSK,
    CompareOption.活着,
    CompareOption.Subtlex,
  ];

  const [words] = createResource(Revision.NEW, getWordsTsv, {
    initialValue: [],
  });

  const [optionA, setOptionA] = createSignal<CompareOption>(CompareOption.HSK);
  const [optionB, setOptionB] = createSignal<CompareOption>(CompareOption.HSK);

  const pairings = createMemo(() => {
    const wordsA = groupWordsByLevel(words());
    const wordsB = groupWordsByLevel(words());
    return calculatePairings(wordsA, wordsB);
  });

  return (
    <div class="flex w-auto flex-col items-center px-16 py-4">
      {/* selector */}
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
      <table class="mt-4  border-spacing-2 border border-slate-500">
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
                  {(levelB) => (
                    <td class="border border-slate-700 px-4 py-1">
                      {pairings().get(levelA + "-" + levelB)?.length}
                    </td>
                  )}
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
