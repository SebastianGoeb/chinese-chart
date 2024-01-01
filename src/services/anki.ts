import { Revision } from "./hsk";

export async function getWordIntervals(
  _revision: Revision,
): Promise<Map<string, number>> {
  const res = await fetch("/chinese-chart/new_hsk_anki_notes.tsv");
  const text = await res.text();
  const map = new Map<string, number>();
  text.split("\n").forEach((line) => {
    const [fields, ivl, _lapses] = line.split("\t");
    const word = fields.split("\x1f")[0];
    map.set(word, Number(ivl));
  });
  return map;
}
