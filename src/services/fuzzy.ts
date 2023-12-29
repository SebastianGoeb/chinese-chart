/**
 * Fuzzy substring match for use in fuzzy finding. E.g. "el" exists in "Berlin", but not in "bleach"
 *
 * @param pattern
 * @param text
 * @returns whether the text contains the pattern, possibly with other characters interleaved
 */
export function fuzzyContains(text: string, query: string): boolean {
  let previousMatchingIndex = -1;
  for (let i = 0; i < query.length; i++) {
    const queryChar = query[i];

    // find leftmost match in remaining text
    const matchingIndex = text.indexOf(queryChar, previousMatchingIndex + 1);
    if (matchingIndex === -1) {
      return false;
    }

    // only consider remaining text for future characters
    previousMatchingIndex = matchingIndex;
  }

  return true;
}

export function fuzzyContainsWithScoring(text: string, query: string): number {
  let firstMatchingIndex = 0;
  let lastMatchingIndex = 0;
  let previousMatchingIndex = -1;
  for (let i = 0; i < query.length; i++) {
    const queryChar = query[i];

    // find leftmost match in remaining text
    const matchingIndex = text.indexOf(queryChar, previousMatchingIndex + 1);
    if (matchingIndex === -1) {
      return 0;
    }

    console.log("matched", queryChar, matchingIndex);

    // only consider remaining text for future characters
    previousMatchingIndex = matchingIndex;

    // save matching range for later scoring
    if (i === 0) {
      firstMatchingIndex = matchingIndex;
    }
    if (i === query.length - 1) {
      lastMatchingIndex = matchingIndex;
    }
  }

  // exact substring match should be score 1
  // more unmatched interleaved chars mean a lower score
  const matchedChars = lastMatchingIndex - firstMatchingIndex + 1;
  console.log(matchedChars);
  return query.length / matchedChars;
}
