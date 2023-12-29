import { sortBy } from "lodash";
import murmur from "murmurhash3js";
import { For, createMemo } from "solid-js";
import { fuzzyContainsWithScoring as fuzzyContainsScored } from "../../services/fuzzy";
import { HskLevel } from "../../services/hsk";
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
    const queryNormalized = removeAccents(query().trim()).toLowerCase();
    if (queryNormalized === "") {
      return wordsShuffled();
    }

    return wordsShuffled().filter(
      (word) =>
        fuzzyContainsScored(word.chinese.toLowerCase(), queryNormalized) >
          0.5 ||
        fuzzyContainsScored(word.english.toLowerCase(), queryNormalized) >
          0.5 ||
        fuzzyContainsScored(
          removeAccents(word.pinyin.toLowerCase()),
          queryNormalized,
        ) > 0.5,
    );
  };
  return (
    <div class="relative mb-8 mt-4 border border-stone-500">
      <h2 class="sticky top-11 z-10 border-b border-stone-500 bg-white p-4 font-nunito text-2xl font-light">
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
