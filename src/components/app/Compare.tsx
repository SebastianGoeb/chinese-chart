import ArrowPath from "heroicons/24/outline/arrow-path.svg";
import { difference, intersection } from "lodash";
import { For, batch, createMemo, createResource, createSignal } from "solid-js";
import {
  HskLevel,
  Revision,
  getWordsTsv,
  groupWordsByLevel,
} from "../../services/hsk";
import {
  WordFrequencyBucket,
  bucketWordsByFrequency,
  getWordFrequencies,
} from "../../services/word-frequencies";

// adapts hsk levels, frequency buckets, etc. into a uniform interface
interface WordGroup {
  name: string;
  words: string[];
}

function hskLevelToWordGroup(hskLevel: HskLevel): WordGroup {
  return {
    name: String(hskLevel.level),
    words: hskLevel.words.map((w) => w.chinese),
  };
}

function wordFrequencyBucketToWordGroup(
  bucket: WordFrequencyBucket,
): WordGroup {
  return {
    name: String(bucket.frequency),
    words: bucket.words,
  };
}

interface DatasetDescriptor {
  name: string;
  displayName: string;
  type: "hsk" | "frequency";
}

const datasetDescriptors: DatasetDescriptor[] = [
  { name: "new_hsk", displayName: "New HSK", type: "hsk" },
  { name: "活着", displayName: "活着", type: "frequency" },
  { name: "subtlex", displayName: "Subtlex", type: "frequency" },
];

const frequencyBuckets = [300, 1000, 3000, 10000, 30000, 100000];

function outerJoinWordGroup(groupsA: WordGroup[], groupsB: WordGroup[]) {
  const pairings = new Map<string, string[]>();

  const allA = groupsA.flatMap((level) => level.words);
  const allB = groupsB.flatMap((level) => level.words);

  groupsA.forEach((a) => {
    groupsB.forEach((b) => {
      pairings.set(`${a.name}-${b.name}`, intersection(a.words, b.words));
    });
  });
  groupsA.forEach((a) => {
    pairings.set(`${a.name}-undefined`, difference(a.words, allB));
  });
  groupsB.forEach((b) => {
    pairings.set(`undefined-${b.name}`, difference(b.words, allA));
  });

  return pairings;
}

function Compare() {
  const datasets = new Map<string, () => WordGroup[]>();

  datasetDescriptors.map((dataset) => {
    if (dataset.type === "hsk") {
      const [hskWords] = createResource(Revision.NEW, getWordsTsv, {
        initialValue: [],
      });
      datasets.set(dataset.name, () => {
        const groupedWords = groupWordsByLevel(hskWords());
        return groupedWords.map(hskLevelToWordGroup);
      });
    } else {
      const [wordFrequencies] = createResource(
        dataset.name,
        getWordFrequencies,
        { initialValue: [] },
      );
      datasets.set(dataset.name, () => {
        const bucketedWords = bucketWordsByFrequency(
          wordFrequencies(),
          frequencyBuckets,
        );
        return bucketedWords.map(wordFrequencyBucketToWordGroup);
      });
    }
  });

  // selector
  const [optionA, setOptionA] = createSignal<string>(
    datasetDescriptors[0].name,
  );
  const [optionB, setOptionB] = createSignal<string>(
    datasetDescriptors[0].name,
  );

  // data
  const datasetA = createMemo<WordGroup[]>(
    () => datasets.get(optionA())?.() ?? [],
  );
  const datasetB = createMemo<WordGroup[]>(
    () => datasets.get(optionB())?.() ?? [],
  );
  const crossProduct = createMemo<Map<string, string[]>>(() => {
    return outerJoinWordGroup(datasetA(), datasetB());
  });

  const swapDatasets = () => {
    batch(() => {
      const a = optionA();
      setOptionA(optionB());
      setOptionB(a);
    });
  };

  return (
    <div class="m-4 text-[0.6rem] md:mx-16 md:text-base lg:mx-32 xl:mx-64 2xl:mx-96">
      {/* title */}
      <h1 class="mb-4 text-2xl">Compare</h1>

      {/* selector */}
      <div class="flex w-full items-center gap-4">
        <select
          class="grow"
          onChange={(e) => setOptionA(e.target.value as any)}
          value={optionA()}
        >
          <For each={datasetDescriptors}>
            {(dataset) => (
              <option value={dataset.name}>{dataset.displayName}</option>
            )}
          </For>
        </select>

        <button
          onClick={() => swapDatasets()}
          class="rounded-full bg-lime-300 p-3 shadow-md hover:bg-lime-200 active:shadow-xl"
        >
          <img src={ArrowPath} class="h-5 w-5"></img>
        </button>

        <select
          class="grow"
          onChange={(e) => setOptionB(e.target.value as any)}
          value={optionB()}
        >
          <For each={datasetDescriptors}>
            {(dataset) => (
              <option value={dataset.name}>{dataset.displayName}</option>
            )}
          </For>
        </select>
      </div>

      {/* table */}
      <table class="mt-4 w-full border border-stone-500 text-right">
        <thead>
          <tr>
            <th></th>
            <For each={[...datasetB().map((group) => group.name), undefined]}>
              {(aGroupName) => (
                <th class="p-2 lg:p-4 2xl:p-8">{aGroupName ?? "n/a"}</th>
              )}
            </For>
          </tr>
        </thead>
        <tbody>
          <For each={[...datasetA(), undefined]}>
            {(aGroup) => (
              <tr>
                <th class="p-2 lg:p-4 2xl:p-8">{aGroup?.name ?? "n/a"}</th>
                <For each={[...datasetB(), undefined]}>
                  {(bGroup) => (
                    <td class="border border-stone-500 p-2 lg:p-4 2xl:p-8">
                      {
                        crossProduct().get(aGroup?.name + "-" + bGroup?.name)
                          ?.length
                      }
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
