/**
 * Fuzzy substring match for use in fuzzy finding. E.g. "el" exists in "Berlin", but not in "bleach"
 *
 * @param pattern
 * @param text
 * @returns whether the text contains the pattern, possibly with other characters interleaved
 */
export function fuzzyContains(text: string, query: string): boolean {
  let previousMatchingIndex = 0;
  for (let i = 0; i < query.length; i++) {
    const queryChar = query[i];

    // find leftmost match in remaining text
    const matchingIndex = text.indexOf(queryChar, previousMatchingIndex);
    if (matchingIndex === -1) {
      return false;
    }

    // only consider remaining text for future characters
    previousMatchingIndex = matchingIndex;
  }

  return true;
}
