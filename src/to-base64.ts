export const toBase64 = (input: string): string => {
  return btoa(
    new TextEncoder()
      .encode(input)
      .reduce((acc, c) => acc + String.fromCharCode(c), ""),
  );
};
