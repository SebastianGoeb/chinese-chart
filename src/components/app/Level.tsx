import { sortBy } from "lodash";
import murmur from "murmurhash3js";
import { For, createMemo } from "solid-js";
import { HskLevel } from "../../hsk/hsk";
import { query } from "../../state/search";
import Word from "./Word";

function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function Level(props: { level: HskLevel; intervals: Map<string, number> }) {
  const numWordsSeen = createMemo(
    () =>
      props.level.words.filter(
        (word) => (props.intervals.get(word.chinese) ?? 0) > 0,
      ).length,
  );
  const totalWords = createMemo(() => props.level.words.length);
  const wordsShuffled = createMemo(() =>
    sortBy(props.level.words, (w) => murmur.x64.hash128(w.chinese)),
  );
  const wordsFiltered = () => {
    const q = removeAccents(query().trim());
    if (q === "") {
      return wordsShuffled();
    }

    return wordsShuffled().filter(
      (word) =>
        word.chinese.includes(q) ||
        word.english.includes(q) ||
        removeAccents(word.pinyin).includes(q),
    );
  };
  return (
    <div class="mb-12 mt-4 rounded-xl bg-white shadow-xl">
      {/* w-fit rounded-ee-xl */}
      <h2 class="rounded-t-xl border-b-[1px] border-stone-300 bg-white px-6 py-4 font-nunito text-2xl font-light">
        Level {props.level.level} - {numWordsSeen()} / {totalWords()} -
        {((numWordsSeen() / totalWords()) * 100).toFixed(0)}%
      </h2>

      <div class="flex flex-wrap p-4">
        <For each={wordsFiltered()}>
          {(word) => <Word word={word} intervals={props.intervals}></Word>}
        </For>
      </div>
    </div>
  );
}

export default Level;
