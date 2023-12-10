export interface HskWord {
  level: number;
  no: number;
  chinese: string;
  pinyin: string;
  english: string;
}

export interface HskLevel {
  level: number;
  words: HskWord[];
}

export enum Revision {
  OLD,
  NEW,
}

export async function getWordsTsv(revision: Revision): Promise<HskWord[]> {
  const prefix = revision === Revision.NEW ? "new" : "old";
  console.log(import.meta.url);
  const res = await fetch(`${prefix}_hsk.tsv`);
  return wordsTsvToJson(await res.text());
}

export function wordsTsvToJson(wordsTsv: string): HskWord[] {
  const dataLines = wordsTsv.split("\n").slice(1);
  return dataLines.map((line) => {
    const [level, no, chinese, pinyin, english] = line.split("\t");
    return { level: Number(level), no: Number(no), chinese, pinyin, english };
  });
}

export function groupWordsByLevel(words: HskWord[]): HskLevel[] {
  const levels = new Map<number, HskWord[]>();

  for (const word of words) {
    if (!levels.has(word.level)) {
      levels.set(word.level, []);
    }

    levels.get(word.level)?.push(word);
  }

  return Array.from(levels.entries()).map(([level, words]) => ({
    level,
    words,
  }));
}
