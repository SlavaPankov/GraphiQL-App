function tokenize(query: string): string[] {
  const pattern = /\s+|([,:{}()\\[\]])/g;
  return query
    .split(pattern)
    .filter((token) => token && token.trim() !== '' && token.trim() !== ',');
}

function formatTokens(tokens: string[], spaces: number): string {
  let indentationLevel = 0;
  let beautifiedQuery = '';
  let isInner = false;
  let isRound = false;

  tokens.forEach((token, index) => {
    if (token === '(') {
      isRound = true;
      beautifiedQuery += token;
    } else if (token === ')') {
      isRound = false;
      beautifiedQuery += token;
    } else if (token === '{' && !isRound) {
      beautifiedQuery += ` {\n${' '.repeat((indentationLevel + 1) * spaces)}`;
      indentationLevel += 1;
      isInner = true;
    } else if (token === '}' && !isRound) {
      indentationLevel -= 1;
      beautifiedQuery +=
        indentationLevel > 0
          ? `\n${' '.repeat(indentationLevel * spaces)}}\n${' '.repeat(
              indentationLevel * spaces
            )}`
          : `\n${' '.repeat(indentationLevel * spaces)}}`;
      isInner = false;
    } else if (token === ':') {
      beautifiedQuery += `${token} `;
    } else {
      beautifiedQuery += `${token}${
        isInner &&
        indentationLevel > 2 &&
        tokens[index + 1] &&
        tokens[index + 1] !== '}'
          ? `\n${' '.repeat(indentationLevel * spaces)}`
          : ''
      }`;
    }
  });

  return beautifiedQuery
    .split('\n')
    .filter((item) => item.trimEnd() !== '')
    .join('\n');
}

export const beautifyGraphQL = (query: string, spaces = 2): string => {
  const tokens = tokenize(query);
  return formatTokens(tokens, spaces);
};
