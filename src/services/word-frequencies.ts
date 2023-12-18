export interface WordFrequency {
  word: string;
  frequency: number;
}

// ==== Client ====

export async function getWordFrequencies(
  dataset: string,
): Promise<WordFrequency[]> {
  const res = await fetch(`word-frequencies/${dataset}.tsv`);
  return parseWordFrequenciesTsv(await res.text());
}

export function parseWordFrequenciesTsv(
  wordFrequenciesTsv: string,
): WordFrequency[] {
  return wordFrequenciesTsv.split("\n").map((line) => {
    const [word, frequency] = line.split("\t");
    return {
      word: word.trim(),
      frequency: Number(frequency),
    };
  });
}

// ==== Data Massaging ====

export interface WordFrequencyBucket {
  frequency: number; // cumulative
  words: string[];
}

// assumes words are sorted by descending frequency
export function bucketWordsByFrequency(
  wordFrequencies: WordFrequency[],
  buckets: number[],
): WordFrequencyBucket[] {
  let prevBucket = 0;
  return buckets.map((bucket) => {
    const words: string[] = wordFrequencies
      .slice(prevBucket, Math.min(wordFrequencies.length, bucket))
      .map((wf) => wf.word);
    prevBucket = bucket;
    return { frequency: bucket, words };
  });
}
