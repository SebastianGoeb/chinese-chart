import { Revision } from "./hsk";

export async function getFakeWordIntervals(
  _revision: Revision
): Promise<Map<string, number>> {
  const res = await fetch("src/assets/old_hsk.tsv");
  const text = await res.text();
  const map = new Map<string, number>();
  text
    .split("\n")
    .slice(1)
    .forEach((line) => {
      const [Level, _No, Chinese, _Pinyin, _English] = line.split("\t");
      if (Number(Level) <= 4) {
        map.set(Chinese, 1);
      }
    });
  return map;
}
