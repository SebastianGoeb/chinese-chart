import { For, createMemo, createResource } from "solid-js";
import { getWordIntervals } from "../../services/anki";
import { getWordsTsv, groupWordsByLevel } from "../../services/hsk";
import { getFakeWordIntervals } from "../../services/pleco";
import { revision } from "../../state/config";
import Level from "./Level";
import LevelsSubnav from "./LevelsSubnav";

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
      <LevelsSubnav />
      <div class="px-4 md:px-16 lg:px-32 xl:px-64 2xl:px-64">
        <For each={levels()}>
          {(level) => <Level level={level} intervals={intervals()}></Level>}
        </For>
      </div>
    </>
  );
}

export default Levels;
