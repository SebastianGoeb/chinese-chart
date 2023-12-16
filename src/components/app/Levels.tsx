import { For, createMemo, createResource } from "solid-js";
import { getWordIntervals } from "../../hsk/anki";
import { getWordsTsv, groupWordsByLevel } from "../../hsk/hsk";
import { getFakeWordIntervals } from "../../hsk/pleco";
import { revision } from "../../state/config";
import Level from "./Level";

function mergeLevels(intervalMaps: Map<string, number>[]): Map<string, number> {
  const result = new Map<string, number>();
  intervalMaps.forEach((map) => {
    map.forEach((level, chinese) => {
      const current = result.get(chinese);
      if (current === undefined) {
        result.set(chinese, level);
      } else {
        result.set(chinese, Math.max(current, level));
      }
    });
  });
  return result;
}

function Levels() {
  const [words] = createResource(revision, getWordsTsv, { initialValue: [] });
  const [ankiIntervals] = createResource(revision, getWordIntervals, {
    initialValue: new Map(),
  });
  const [plecoIntervals] = createResource(revision, getFakeWordIntervals, {
    initialValue: new Map(),
  });
  const intervals = createMemo(() =>
    mergeLevels([ankiIntervals(), plecoIntervals()]),
  );

  const levels = createMemo(() => groupWordsByLevel(words()));

  return (
    <>
      <div class="mx-32">
        <For each={levels()}>
          {(level) => <Level level={level} intervals={intervals()}></Level>}
        </For>
      </div>
    </>
  );
}

export default Levels;
