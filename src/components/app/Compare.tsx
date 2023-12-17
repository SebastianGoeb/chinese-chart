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

interface WordWithFrequency {
  word: string;
  frequency: number;
}

export async function getWordFrequenciesTsv(
  name: string,
): Promise<WordWithFrequency[]> {
  const res = await fetch(`segmentation/${name}_frequencies.tsv`);
  return wordFrequenciesTsvToJson(await res.text());
}

export function wordFrequenciesTsvToJson(
  wordsTsv: string,
): WordWithFrequency[] {
  const dataLines = wordsTsv.split("\n");
  return dataLines.map((line) => {
    const [word, frequency] = line.split("\t");
    return { word: word.trim(), frequency: Number(frequency) };
  });
}

function groupWordsByFrequencyBuckets(
  words: WordWithFrequency[],
  buckets: number[],
): HskLevel[] {
  const levels: HskLevel[] = [];

  let cumulativeBucket = 0;
  for (const bucket of buckets) {
    const prevCumulativeBucket = cumulativeBucket;
    cumulativeBucket = cumulativeBucket + bucket;

    const level: HskLevel = {
      level: bucket,
      words: [],
    };
    for (
      let i = prevCumulativeBucket;
      i < Math.min(words.length, cumulativeBucket);
      i++
    ) {
      const word = words[i];
      level.words.push({
        level: bucket,
        no: i - prevCumulativeBucket + 1, // 1-indexing for human readability
        chinese: word.word,
        english: "",
        pinyin: "",
      });
    }

    levels.push(level);
  }

  return levels;
}

function selectDataset(
  option: CompareOption,
  hskWords: () => HskLevel[],
  活着Words: () => HskLevel[],
  subtlexWords: () => HskLevel[],
): HskLevel[] {
  if (option == CompareOption.HSK) {
    return hskWords();
  } else if (option == CompareOption.活着) {
    return 活着Words();
  } else {
    return subtlexWords();
  }
}

function Compare() {
  const options = [
    CompareOption.HSK,
    CompareOption.活着,
    CompareOption.Subtlex,
  ];

  const [hskWords] = createResource(Revision.NEW, getWordsTsv, {
    initialValue: [],
  });
  const [活着Frequencies] = createResource(
    CompareOption.活着,
    getWordFrequenciesTsv,
    {
      initialValue: [],
    },
  );
  const 活着Words = () =>
    groupWordsByFrequencyBuckets(
      活着Frequencies(),
      optionLevels.get(CompareOption.活着)!,
    );
  const [subtlexFrequencies] = createResource(
    CompareOption.Subtlex,
    getWordFrequenciesTsv,
    {
      initialValue: [],
    },
  );
  const subtlexWords = () =>
    groupWordsByFrequencyBuckets(
      subtlexFrequencies(),
      optionLevels.get(CompareOption.Subtlex)!,
    );
  const [optionA, setOptionA] = createSignal<CompareOption>(CompareOption.HSK);
  const [optionB, setOptionB] = createSignal<CompareOption>(CompareOption.HSK);

  const pairings = createMemo(() => {
    const wordsA = selectDataset(
      optionA(),
      () => groupWordsByLevel(hskWords()),
      活着Words,
      subtlexWords,
    );
    const wordsB = selectDataset(
      optionB(),
      () => groupWordsByLevel(hskWords()),
      活着Words,
      subtlexWords,
    );
    console.log(wordsA);
    console.log(wordsB);
    const res = calculatePairings(wordsA, wordsB);
    console.log(res);
    return res;
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
